
import { Day, Entry, EntryType, Duration } from "../types";
import moment from "moment";
import SettingsService from "./settings.service";

const STORAGE_KEY_ENTRY = "WorkTimeEntry";

function calcDurationFromMinutes(completeMinutes: number): Duration {

    const hours = (completeMinutes < 0 ? -completeMinutes : completeMinutes)  / 60;
    const roundedHours = Math.floor(hours);

    const minutes = (hours - roundedHours) * 60;
    const roundedMinutes = Math.round(minutes);
    return new Duration(completeMinutes <0 ? -roundedHours : roundedHours, roundedMinutes);
}

const dateForSavingOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

function dateToDateForSaving(date: Date) {
    return date.toLocaleDateString(navigator.language, dateForSavingOptions);
}

function calculateOvertime(momentDuration: moment.Duration, duration: Duration): moment.Duration {
    const durationAsMomentDuration = moment.duration(duration.hours, "hours").add(duration.minutes, "minutes");
    return momentDuration.subtract(durationAsMomentDuration);
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
                entry.worktime = new Duration(entry.worktime.hours, entry.worktime.hours);
            }
            entry = TimeService.calculateEntry(entry);

            return entry;
        }
        return null;
    },

    saveEntryForDate(date: Date, entry: Entry) {
        localStorage.setItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date), JSON.stringify(entry));

        const currentBefore: Entry | null = this.loadEntryFromJson(localStorage.getItem(STORAGE_KEY_ENTRY + "Current"));
        if (currentBefore == null || currentBefore.start < date) {
            localStorage.setItem(STORAGE_KEY_ENTRY + "Current", JSON.stringify(entry));
        }
    },

    deleteEntryForDate(date: Date)
    {
        if(localStorage.getItem(STORAGE_KEY_ENTRY + "Current") === localStorage.getItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date)))
        {
            localStorage.removeItem(STORAGE_KEY_ENTRY + "Current");
        }
        localStorage.removeItem(STORAGE_KEY_ENTRY + dateToDateForSaving(date));
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

        if(!updatedEntry.end)
        {
            updatedEntry.end = new Date();
        }

        const dailyWorktime: Duration = SettingsService.getNeededDailyWorktime();
        const dailyPausetime: Duration = SettingsService.getDailyPausetime();

        if (updatedEntry.type === EntryType.WORK) {
            let worktimeDuration: moment.Duration;
            
            if(updatedEntry.start < updatedEntry.end)
            {
                worktimeDuration = moment.duration(moment(updatedEntry.end).diff(moment(updatedEntry.start)));
            }else {
                worktimeDuration = moment.duration(moment(updatedEntry.start).diff(moment(updatedEntry.end)));
            }

            worktimeDuration = calculateOvertime(worktimeDuration, dailyPausetime);
            

            updatedEntry.worktime = calcDurationFromMinutes(worktimeDuration.asMinutes());
            updatedEntry.overtime = calcDurationFromMinutes(calculateOvertime(worktimeDuration, dailyWorktime).asMinutes());
        } else if (updatedEntry.type === EntryType.OVERTIME) {
            entry.overtime = new Duration(-dailyWorktime.hours, dailyWorktime.minutes);
        } else if (updatedEntry.type === EntryType.ILL) {
            entry.worktime = new Duration(dailyWorktime.hours, dailyWorktime.minutes);
            entry.overtime = new Duration(0, 0);
        }
        else {
            entry.overtime = new Duration(0, 0);
        }

        if(!hadEndBefore)
        {
            updatedEntry.end = undefined;
        }

        return updatedEntry;
    },
    getCurrentOrTodayEntry(): Entry | null {
        const entryJson = localStorage.getItem(STORAGE_KEY_ENTRY + "Current");
        const entry = this.loadEntryFromJson(entryJson);
        return entry == null ? this.loadEntryForDate(new Date()) : entry;
    },

}


export default TimeService;
