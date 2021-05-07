
import { Entry, EntryType, Duration } from "../types";
import moment from "moment";
import SettingsService from "./settings.service";

const STORAGE_KEY_ENTRY = "WorkTimeEntry";
const STORAGE_KEY_NEWEST_DATE = "NewestTimesEntryDate";
const STORAGE_KEY_OLDEST_DATE = "OldestTimesEntryDate";

function calcDurationFromMinutes(completeMinutes: number): Duration {

    const hours = (completeMinutes < 0 ? -completeMinutes : completeMinutes) / 60;
    const roundedHours = Math.floor(hours);

    const minutes = (hours - roundedHours) * 60;
    const roundedMinutes = Math.round(minutes);
    return new Duration(completeMinutes < 0 ? -roundedHours : roundedHours, roundedMinutes);
}
//TODO save oldest and newest date for statistics and to show things in future always
// also scroll to today

const dateForSavingOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

function dateToDateForSaving(date: Date) {
    return date.toLocaleDateString(navigator.language, dateForSavingOptions);
}

function durationToMomentJSDuration(duration: Duration) {
    return moment.duration(duration.hours, "hours").add(duration.minutes, "minutes");
}


function calculateOvertime(momentDuration: moment.Duration, duration: Duration): moment.Duration {
    const durationAsMomentDuration = durationToMomentJSDuration(duration);
    return momentDuration.subtract(durationAsMomentDuration);
}

function parseDate(dateText: string | null): Date | null {
    if (dateText == null) {
        return null;
    }
    return new Date(JSON.parse(dateText));
}

function isSameDate(first: Date, second: Date) {
    return (
        first.toLocaleTimeString(navigator.language, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }) ===
        second.toLocaleTimeString(navigator.language, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    );
}

function saveNewestDate(date: Date) {
    localStorage.setItem(STORAGE_KEY_NEWEST_DATE, JSON.stringify(date));
}

function saveOldestDate(date: Date) {
    localStorage.setItem(STORAGE_KEY_OLDEST_DATE, JSON.stringify(date));
}



const TimeService = {

    //TODO multiple entries for one day
    loadEntryForDate(date: Date): Entry | null {
        const entryJson = localStorage.getItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date));
        return this.loadEntryFromJson(entryJson);
    },
    loadEntryFromJson(entryJson: string | null): Entry | null {
        if (entryJson && entryJson != null) {
            let entry: Entry = JSON.parse(entryJson);

            //Needed to fix a bug when calling toLocaleTimeString on start and end
            entry.start = new Date(entry.start);
            if (entry.end) {
                entry.end = new Date(entry.end);
            }
            if (entry.worktime) {
                entry.worktime = new Duration(entry.worktime.hours, entry.worktime.minutes);
            }
            if (entry.overtime) {
                entry.overtime = new Duration(entry.overtime.hours, entry.overtime.minutes)
            }
            entry = TimeService.calculateEntry(entry);

            return entry;
        }
        return null;
    },

    saveEntryForDate(date: Date, entry: Entry) {
        localStorage.setItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date), JSON.stringify(entry));

        //Update oldest entry
        const oldestBefore: Date | null = this.loadOldestDate();
        if (oldestBefore == null || date < oldestBefore) {
            saveOldestDate(date);
        }

        //Update newest entry
        const newestBefore: Date | null = this.loadNewestDate();
        if (newestBefore == null || date > newestBefore) {
            saveNewestDate(date);
        }
    },
    loadOldestDate(): Date | null {
        return parseDate(localStorage.getItem(STORAGE_KEY_OLDEST_DATE));
    },
    loadNewestDate(): Date | null {
        return parseDate(localStorage.getItem(STORAGE_KEY_NEWEST_DATE));
    },

    deleteEntryForDate(date: Date) {
        localStorage.removeItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date));

        const oldestDate: Date | null = this.loadOldestDate();
        if (oldestDate != null && isSameDate(date, oldestDate)) {
            this.findNewOldestDate(date);
        }

        const newestDate: Date | null = this.loadNewestDate();
        if (newestDate != null && isSameDate(date, newestDate)) {
            this.findNewNewestDate(date);
        }
    },
    findNewOldestDate(oldestDateBefore: Date) {

        const newestDate: Date | null = this.loadNewestDate();

        let newOldestDate: Date | null = null;
        if (newestDate != null) {
            for (let date = new Date(oldestDateBefore); newOldestDate == null && date < newestDate; date.setDate(date.getDate() + 1)) {
                const entry: Entry | null = this.loadEntryForDate(date);
                if (entry != null) {
                    newOldestDate = new Date(date);
                }
            }
        }

        if (newOldestDate == null) {
            localStorage.removeItem(STORAGE_KEY_OLDEST_DATE);
        } else {
            saveOldestDate(newOldestDate);
        }
    },
    findNewNewestDate(newestDateBefore: Date) {

        const oldestDate: Date | null = this.loadOldestDate();

        let newNewestDate: Date | null = null;
        if (oldestDate != null) {
            for (let date = new Date(newestDateBefore); newNewestDate == null && date > oldestDate; date.setDate(date.getDate() - 1)) {
                const entry: Entry | null = this.loadEntryForDate(date);
                if (entry != null) {
                    newNewestDate = new Date(date);
                }
            }
        }

        if (newNewestDate == null) {
            localStorage.removeItem(STORAGE_KEY_NEWEST_DATE);
        } else {
            saveNewestDate(newNewestDate);
        }
    },

    /**
     * Calculates the calculated fileds of entry based on the entry contained in the given day.
     * @param day The day with an "unfinished" entry on which to calculate.
     * @returns The day with calculated entry.
     */
    calculateEntry(entry: Entry): Entry {
        const hadEndBefore = entry.end ? true : false;

        //Make an copy of the day to don't edit the given day directly
        const updatedEntry: Entry = Object.assign(entry);

        if (!updatedEntry.end) {
            updatedEntry.end = new Date();
        }

        const dailyWorktime: Duration = SettingsService.getNeededDailyWorktime();
        const dailyPausetime: Duration = SettingsService.getDailyPausetime();

        if (updatedEntry.type === EntryType.WORK) {
            let worktimeDuration: moment.Duration;

            if (updatedEntry.start < updatedEntry.end) {
                worktimeDuration = moment.duration(moment(updatedEntry.end).diff(moment(updatedEntry.start)));
            } else {
                worktimeDuration = moment.duration(moment(updatedEntry.start).diff(moment(updatedEntry.end)));
            }

            worktimeDuration = calculateOvertime(worktimeDuration, dailyPausetime);


            updatedEntry.worktime = calcDurationFromMinutes(worktimeDuration.asMinutes());
            updatedEntry.overtime = calcDurationFromMinutes(calculateOvertime(worktimeDuration, dailyWorktime).asMinutes());
        } else if (updatedEntry.type === EntryType.OVERTIME) {
            if (!entry.overtime) {
                entry.overtime = new Duration(-dailyWorktime.hours, dailyWorktime.minutes);
            }
        } else if (updatedEntry.type === EntryType.ILL) {
            entry.worktime = new Duration(dailyWorktime.hours, dailyWorktime.minutes);
            entry.overtime = new Duration(0, 0);
        }
        else {
            entry.overtime = new Duration(0, 0);
        }

        if (!hadEndBefore) {
            updatedEntry.end = undefined;
        }

        return updatedEntry;
    },
    calculatePerfectEnd(start: Date, pausetime?: Duration | undefined): Date {
        const dailyWorktime: Duration = SettingsService.getNeededDailyWorktime();
        const dailyPausetime: Duration = pausetime ? pausetime : SettingsService.getDailyPausetime();

        const totalDailyDuration: moment.Duration = durationToMomentJSDuration(dailyWorktime).add(durationToMomentJSDuration(dailyPausetime));
        return moment(start).add(totalDailyDuration).toDate();
    },
    calculateOvertimeForTimeRange(start: Date, end: Date): Duration {
        const overtime = moment.duration(0);
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const entry: Entry | null = this.loadEntryForDate(date);
            if (entry != null && entry.overtime) {
                overtime.add(entry.overtime);
            }
        }
        return calcDurationFromMinutes(overtime.asMinutes());
    },
    calculateOvertimeComplete(): Duration {
        const oldestDate = this.loadOldestDate();
        const newestDate = this.loadNewestDate();
        if(oldestDate == null || newestDate == null)
        {
            return new Duration(0,0);
        }

        return this.calculateOvertimeForTimeRange(oldestDate,newestDate);
    },

}


export default TimeService;
