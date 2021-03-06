
import { Entry, EntryType, Duration } from "../types";
import moment from "moment";
import SettingsService from "./settings.service";

export const STORAGE_KEY_ENTRY = "WorkTimeEntry";
export const STORAGE_KEY_NEWEST_DATE = "NewestTimesEntryDate";
export const STORAGE_KEY_OLDEST_DATE = "OldestTimesEntryDate";
export const STORAGE_KEY_CURRENT_WORKSTART = "CurrentWorkStartEntry";

function calcDurationFromMinutes(completeMinutes: number): Duration {

    const hours = (completeMinutes < 0 ? -completeMinutes : completeMinutes) / 60;
    const roundedHours = Math.floor(hours);

    const minutes = (hours - roundedHours) * 60;
    const roundedMinutes = Math.round(minutes);
    return new Duration(completeMinutes < 0 ? -roundedHours : roundedHours, roundedMinutes, completeMinutes < 0);
}

const dateForSavingOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

export function dateToDateForSaving(date: Date): string {
    return date.toLocaleDateString(navigator.language, dateForSavingOptions);
}

function durationToMomentJSDuration(duration: Duration) {
    return moment.duration(duration.hours, "hours").add(duration.minutes, "minutes");
}


function calculateOvertime(workTimeDuration: moment.Duration, paueTimeDuration: Duration): moment.Duration {
    const paueTimeDurationAsMomentDuration = durationToMomentJSDuration(paueTimeDuration);
    return workTimeDuration.subtract(paueTimeDurationAsMomentDuration);
}

function parseDate(dateText: string | null): Date | null {
    if (dateText == null) {
        return null;
    }
    return new Date(JSON.parse(dateText));
}

function isSameDate(first: Date, second: Date) {
    return (
        first.toLocaleDateString(navigator.language, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }) ===
        second.toLocaleDateString(navigator.language, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    );
}

function saveNewestDate(date: Date) {
    //Clear time
    const clearedDate = new Date(date);
    clearedDate.setHours(0,0,0,0);
    localStorage.setItem(STORAGE_KEY_NEWEST_DATE, JSON.stringify(clearedDate));
}

function saveOldestDate(date: Date) {
    //Clear time
    const clearedDate = new Date(date);
    clearedDate.setHours(0,0,0,0);
    localStorage.setItem(STORAGE_KEY_OLDEST_DATE, JSON.stringify(clearedDate));
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
                entry.worktime = new Duration(entry.worktime.hours, entry.worktime.minutes, entry.worktime.isNegative);
            }
            if (entry.overtime) {
                entry.overtime = new Duration(entry.overtime.hours, entry.overtime.minutes, entry.overtime.isNegative)
            }
            entry = TimeService.calculateEntry(entry);

            return entry;
        }
        return null;
    },

    generateEntriesForDays(entry: Entry): void
    {
        if(!entry.end)
        {
            return;
        }

        for (let date = new Date(entry.start); date <= entry.end; date.setDate(date.getDate() + 1)) {
            const workDaysDays: number[] = SettingsService.workdays.value.map(workDay => workDay.day);
            if(workDaysDays.includes(date.getDay()))
            {
                //Clear time
                date.setHours(0, 0, 0, 0);

                const generatedEntry: Entry = {
                    type: entry.type,
                    fullDay: true,
                    start: date,
                    end: date,
                };
                this.calculateEntry(generatedEntry);
                this.saveEntryForDate(date, generatedEntry);
            }
        }
    },

    saveEntryForDate(date: Date, entry: Entry): void {
        //Vacation and Ill entries which end is on an other day should be converted to multiple entries instead
        //This is needed to view it correctly on the overview and to count it right for the evaluation
        if((EntryType.VACATION === entry.type || 
            EntryType.ILL === entry.type) && 
            entry.end && 
            entry.start.toDateString() !== entry.end.toDateString()
        )
        {
            this.generateEntriesForDays(entry);
            return;
        }

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

    deleteEntryForDate(date: Date): void {
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

    findNewOldestDate(oldestDateBefore: Date): void {

        const newestDate: Date | null = this.loadNewestDate();

        let newOldestDate: Date | null = null;
        if (newestDate != null) {
            const startDate = new Date(oldestDateBefore);
            startDate.setDate(startDate.getDate() + 1);
            
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

    findNewNewestDate(newestDateBefore: Date): void {

        const oldestDate: Date | null = this.loadOldestDate();

        let newNewestDate: Date | null = null;
        if (oldestDate != null) {
            const startDate = new Date(newestDateBefore);
            startDate.setDate(startDate.getDate() - 1);

            for (let date = startDate; newNewestDate == null && date > oldestDate; date.setDate(date.getDate() - 1)) {
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

        const dailyWorktime: Duration = SettingsService.worktime.value;

        if (updatedEntry.type === EntryType.WORK) {

            if (!entry.pausetime) {
                entry.pausetime = SettingsService.breaktime.value;
            }

            let worktimeDuration: moment.Duration;

            worktimeDuration = moment.duration(moment(updatedEntry.end).diff(moment(updatedEntry.start)));
            //Substract pause time from worktime
            worktimeDuration = calculateOvertime(worktimeDuration, entry.pausetime);


            updatedEntry.worktime = calcDurationFromMinutes(worktimeDuration.asMinutes());
            //Calculate overtime
            updatedEntry.overtime = calcDurationFromMinutes(calculateOvertime(worktimeDuration, dailyWorktime).asMinutes());
        } else if (updatedEntry.type === EntryType.OVERTIME) {
            if (!entry.overtime) {
                entry.overtime = new Duration(-dailyWorktime.hours, dailyWorktime.minutes, true);
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
        const dailyWorktime: Duration = SettingsService.worktime.value;
        const dailyPausetime: Duration = pausetime ? pausetime : SettingsService.breaktime.value;

        const totalDailyDuration: moment.Duration = durationToMomentJSDuration(dailyWorktime).add(durationToMomentJSDuration(dailyPausetime));
        return moment(start).add(totalDailyDuration).toDate();
    },

    calculateOvertimeForTimeRange(start: Date, end: Date): Duration {
        //Clear time
        start.setHours(0,0,0,0);
        end.setHours(0,0,0,0);

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
        if (oldestDate == null || newestDate == null) {
            return new Duration(0, 0);
        }
        //Clear time
        oldestDate.setHours(0,0,0,0);
        newestDate.setHours(0,0,0,0);

        return this.calculateOvertimeForTimeRange(oldestDate, newestDate);
    },

    calculateWorktimeForTimeRange(start: Date, end: Date): Duration {
        //Clear time
        start.setHours(0,0,0,0);
        end.setHours(0,0,0,0);

        const worktime = moment.duration(0);
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const entry: Entry | null = this.loadEntryForDate(date);
            if (entry != null && entry.worktime) {
                worktime.add(entry.worktime);
            }
        }
        return calcDurationFromMinutes(worktime.asMinutes());
    },

    calculateWorktimeComplete(): Duration {
        const oldestDate = this.loadOldestDate();
        const newestDate = this.loadNewestDate();
        if (oldestDate == null || newestDate == null) {
            return new Duration(0, 0);
        }
        //Clear time
        oldestDate.setHours(0,0,0,0);
        newestDate.setHours(0,0,0,0);

        return this.calculateWorktimeForTimeRange(oldestDate, newestDate);
    },

    saveWorkStart(workstartEntry: Entry): void {
        localStorage.setItem(STORAGE_KEY_CURRENT_WORKSTART,STORAGE_KEY_ENTRY + dateToDateForSaving(workstartEntry.start));
    },

    isWorkStartActive(): boolean {
        const currentWorkStartKey: string | null = localStorage.getItem(STORAGE_KEY_CURRENT_WORKSTART);
        
        if(currentWorkStartKey === null) {
            return false;
        }

        const workstartEntry = this.loadEntryFromJson(localStorage.getItem(currentWorkStartKey));

        if(workstartEntry === null) {
            return false;
        }

        if(workstartEntry.end)
        {
            return false;
        }

        return true;
    },

    loadActiveWorkEntry(): Entry | null {
        const currentWorkStartKey: string | null = localStorage.getItem(STORAGE_KEY_CURRENT_WORKSTART);
        
        if(currentWorkStartKey === null) {
            return null;
        } 

        return this.loadEntryFromJson(localStorage.getItem(currentWorkStartKey));
    },

    stopWork(): void {
        const currentWorkStartKey: string | null = localStorage.getItem(STORAGE_KEY_CURRENT_WORKSTART);
        localStorage.removeItem(STORAGE_KEY_CURRENT_WORKSTART);

        if(currentWorkStartKey === null) {
            return; //Nothing to do
        }        

        const workstartEntry = this.loadEntryFromJson(localStorage.getItem(currentWorkStartKey));

        if(workstartEntry === null) {
            return; // Entry unkown
        }

       workstartEntry.end = new Date();
       this.saveEntryForDate(workstartEntry.start, this.calculateEntry(workstartEntry));
    },

    countEntriesForTypeInTimeRange(type: EntryType, start: Date, end: Date): number
    {
        //Clear time
        start.setHours(0,0,0,0);
        end.setHours(0,0,0,0);

        let entryCount = 0;
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const entry: Entry | null = this.loadEntryForDate(date);
            if (entry != null && entry.type === type) {
                entryCount++;
            }
        }
        return entryCount;
    },
    calculateIllDaysForTimeRange(start: Date, end: Date): number {
        return this.countEntriesForTypeInTimeRange(EntryType.ILL, start, end);
    },
    calculateVacationDaysForTimeRange(start: Date, end: Date): number {
        return this.countEntriesForTypeInTimeRange(EntryType.VACATION, start, end);
    },

}


export default TimeService;
