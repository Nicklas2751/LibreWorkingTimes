
import { Month, Day, Entry, EntryType } from "../types";
import moment from "moment";

const STORAGE_KEY_ENTRY = "WorkTimeEntry";

function formatDurationFromMinutes(completeMinutes: number): string {

    const hours = completeMinutes / 60;
    const roundedHours = Math.floor(hours);

    const minutes = (hours-roundedHours)*60;
    const roundedMinutes = Math.round(minutes);
    return roundedHours+":"+ (roundedMinutes < 10) ? "0" : "" + roundedMinutes;
}


const TimeService = {

    //TODO multiple entries for one day
    loadEntryForDay(day: Day): Entry | null {
        let entryJson = localStorage.getItem(STORAGE_KEY_ENTRY + day.date);
        return entryJson && entryJson != null ? JSON.parse(entryJson) : null;
    },

    saveEntryForDay(day: Day) {
        localStorage.setItem(STORAGE_KEY_ENTRY + day.date, JSON.stringify(day.entry));
    },

    /**
     * Calculates the calculated fileds of entry based on the entry contained in the given day.
     * @param day The day with an "unfinished" entry on which to calculate.
     * @returns The day with calculated entry.
     */
    calculateEntry(day: Day): Day {
        //Make an copy of the day to don't edit the given day directly
        let updatedDay: Day = Object.assign(day);

        const dailyWorktime = settings.getNeededDailyWorktime();

        
        if (updatedDay.hasEntry && updatedDay.entry) {
            const entry = updatedDay.entry;    
            if (entry.type === EntryType.WORK) {
                const duration: moment.Duration = moment.duration(moment(entry.end).diff(moment(entry.start)));
                entry.overtime = formatDurationFromMinutes(duration.asMinutes());
            } else if (entry.type === EntryType.OVERTIME) {
                entry.overtime = dailyWorktime.hours+":"+ (dailyWorktime.minutes < 10) ? "0" : "" + dailyWorktime.minutes;
            } else {
                entry.overtime = "0:00";
            }
        }

        return updatedDay;
    },

}

export default TimeService;