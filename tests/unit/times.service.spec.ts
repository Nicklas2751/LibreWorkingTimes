import TimeService from "../../src/servies/times.service"
import * as times from "../../src/servies/times.service"
import { Duration, Entry, EntryType } from "../../src/types"

describe('times.service.ts', () => {
    it('calculate positive work entry worktime minutes', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 60);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject(new Duration(0, 30));
    }),
    it('calculate positive work entry worktime hours', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 90);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject(new Duration(1, 0));
    }),
    it('calculate positive work entry worktime minutes and hours', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 120);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(1, 30));
    }),
    it('calculate positive work entry worktime changed pausetime', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 120);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
            pausetime: new Duration(0, 15),
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(1, 45));
    }),

    it('calculate negative work entry worktime minutes', () => {

        //GIVEN
        const currentDateTime: Date = new Date();

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateTime,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(-0, 30, true));
    }),
    it('calculate negative work entry worktime hour', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() - 30);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(-1, 0, true));
    }),
    it('calculate negative work entry worktime minutes hours', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() - 120);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(-2, 30, true));
    }),

    it('calculate positive work entry worktime over date change', () => {

        //GIVEN
        const firstDate: Date = new Date(2021, 0, 1, 23, 0);
        const secondDate: Date = new Date(2021, 0, 2, 1, 15);


        const testEntry: Entry = {
            fullDay: false,
            start: firstDate,
            end: secondDate,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(1, 45));
    }),
    it('calculate negative work entry worktime over date change', () => {

        //GIVEN
        const firstDate: Date = new Date(2021, 0, 2, 1, 15);
        const secondDate: Date = new Date(2021, 0, 1, 23, 0);



        const testEntry: Entry = {
            fullDay: false,
            start: firstDate,
            end: secondDate,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.worktime).toMatchObject<Duration>(new Duration(-2, 45, true));
    }),

    it('calculate work entry zeroy overtime', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 510);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.overtime).toMatchObject<Duration>(new Duration(0, 0));
    }),
    it('calculate work entry positive overtime', () => {

        //GIVEN
        const currentDateTime: Date = new Date();
        const currentDateThirtyMinutesLater: Date = new Date(currentDateTime);
        currentDateThirtyMinutesLater.setMinutes(currentDateTime.getMinutes() + 600);

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateThirtyMinutesLater,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.overtime).toMatchObject<Duration>(new Duration(1, 30));
    }),
    it('calculate work entry negative overtime', () => {

        //GIVEN
        const currentDateTime: Date = new Date();

        const testEntry: Entry = {
            fullDay: false,
            start: currentDateTime,
            end: currentDateTime,
            type: EntryType.WORK,
        };


        //WHEN
        const calculated = TimeService.calculateEntry(testEntry);

        //THEN
        expect(calculated.overtime).toMatchObject<Duration>(new Duration(-8, 30, true));
    }),

    it('calculate overtime complete no entries', () => {

        //GIVEN
        localStorage.clear();


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeComplete();

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(0, 0));
    }),
    it('calculate overtime complete three entries no overtimes', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 18, 30)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 0, 2, 0, 0),
            fullDay: true,
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 0, 3, 0, 0),
            fullDay: true,
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeComplete();

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(0, 0));
    }),
    it('calculate overtime complete three entries positive sum', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(8, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(-0, 30, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeComplete();

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(8, 0));
    }),
    it('calculate overtime two overtime entries positive sum', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 4, 3, 2, 1),
            overtime: new Duration(2, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 1, 2, 3, 4),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3, 1, 2, 3, 4)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 2, 4, 3, 2, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeComplete();

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(-6, 0, true));
    }),
    it('calculate overtime complete three entries negative sum', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeComplete();

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(-7, 0, true));
    }),

    it('calculate overtime for time range three entries out of range sum zero', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "03/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 4, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeForTimeRange(new Date(2021, 1, 1), new Date(2021, 1, 26));

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(0, 0));
    }),
    it('calculate overtime for time range three entries out of range, two in range', () => {

        //GIVEN
        localStorage.clear();
        //Out of range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));

        //In range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/15/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 1, 15, 10, 0),
            end: new Date(2021, 1, 15, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 1, 16, 0, 0),
            overtime: new Duration(7, 30),
        } as Entry));

        //Out of range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "03/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 4, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));

        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 4, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const overtimeComplete: Duration = TimeService.calculateOvertimeForTimeRange(new Date(2021, 1, 1), new Date(2021, 1, 26));

        //THEN
        expect(overtimeComplete).toMatchObject<Duration>(new Duration(8, 0));
    }),

    it('calculate perfect end same day', () => {

        //GIVEN

        //WHEN
        const perfectEnd: Date = TimeService.calculatePerfectEnd(new Date(2021, 0, 1, 10, 0), new Duration(0, 15));

        //THEN
        expect(perfectEnd).toMatchObject<Date>(new Date(2021, 0, 1, 18, 15));
    }),
    it('calculate perfect end end on next day', () => {

        //GIVEN

        //WHEN
        const perfectEnd: Date = TimeService.calculatePerfectEnd(new Date(2021, 0, 1, 23, 0), new Duration(0, 45));

        //THEN
        expect(perfectEnd).toMatchObject<Date>(new Date(2021, 0, 2, 7, 45));
    }),

    it('delete entry for existing date', () => {

        //GIVEN
        localStorage.clear();
        const entryKey = times.STORAGE_KEY_ENTRY + "01/01/2021"
        localStorage.setItem(entryKey, JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0),
            pausetime: new Duration(1, 0),
        } as Entry));

        //WHEN
        TimeService.deleteEntryForDate(new Date(2021, 0, 1));

        //THEN
        expect(localStorage.getItem(entryKey)).toBeNull();
    }),
    it('delete entry for not existing date', () => {

        //GIVEN
        localStorage.clear();
        const entryKey = times.STORAGE_KEY_ENTRY + "01/01/2021"
        localStorage.setItem(entryKey, JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0),
            pausetime: new Duration(1, 0),
        } as Entry));

        //WHEN
        TimeService.deleteEntryForDate(new Date(2021, 0, 2));

        //THEN
        expect(localStorage.getItem(entryKey)).not.toBeNull();
    }),

    it('find new newest entry more entries exist', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        const currentNewestDate = new Date(2021, 0, 3)
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(currentNewestDate));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));

        //WHEN
        TimeService.findNewNewestDate(currentNewestDate);

        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_NEWEST_DATE)).toMatch(JSON.stringify(new Date(2021, 0, 2)));
    }),
    it('find new newest entry no more entries exist', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        const currentNewestDate = new Date(2021, 0, 1)
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(currentNewestDate));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));

        //WHEN
        TimeService.findNewNewestDate(currentNewestDate);

        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_NEWEST_DATE)).toBeNull();
    }),

    it('find new oldest entry more entries exist', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        const currentOldestDate = new Date(2021, 0, 1)
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(currentOldestDate));

        //WHEN
        TimeService.findNewOldestDate(currentOldestDate);

        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_OLDEST_DATE)).toMatch(JSON.stringify(new Date(2021, 0, 2)));
    }),
    it('find new oldest entry no more entries exist', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        const currentOldestDate = new Date(2021, 0, 3)
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(currentOldestDate));

        //WHEN
        TimeService.findNewOldestDate(currentOldestDate);

        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_OLDEST_DATE)).toBeNull();
    }),

    it('load existing entry for date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));

        //WHEN
        const loadedEntry: Entry | null = TimeService.loadEntryForDate(new Date(2021, 0, 1));

        //THEN
        expect(loadedEntry).not.toBeNull();
    }),
    it('load entry for date not existing', () => {

        //GIVEN
        localStorage.clear();

        //WHEN
        const loadedEntry: Entry | null = TimeService.loadEntryForDate(new Date(2021, 0, 1));

        //THEN
        expect(loadedEntry).toBeNull();
    }),
    it('load entry for date wrong date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));

        //WHEN
        const loadedEntry: Entry | null = TimeService.loadEntryForDate(new Date(2021, 0, 2));

        //THEN
        expect(loadedEntry).toBeNull();
    }),

    it('load entry from valid json', () => {

        //GIVEN
        const entry: Entry = {
            fullDay: false,
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        };
        const entryJson: string = JSON.stringify(entry);

        //WHEN
        const loadedEntry: Entry | null = TimeService.loadEntryFromJson(entryJson);

        //THEN
        expect(loadedEntry).toMatchObject<Entry>(entry);
    }),
    it('load entry from json null', () => {

        //GIVEN

        //WHEN
        const loadedEntry: Entry | null = TimeService.loadEntryFromJson(null);

        //THEN
        expect(loadedEntry).toBeNull();
    }),

    it('load oldest date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 3)));

        //WHEN
        const oldestDate: Date | null = TimeService.loadOldestDate();

        //THEN
        expect(oldestDate).toMatchObject<Date>(new Date(2021, 0, 3));
    }),
    it('load oldest date not exist', () => {

        //GIVEN
        localStorage.clear();

        //WHEN
        const oldestDate: Date | null = TimeService.loadOldestDate();

        //THEN
        expect(oldestDate).toBeNull();
    }),

    it('load newest date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 1)));

        //WHEN
        const newestDate: Date | null = TimeService.loadNewestDate();

        //THEN
        expect(newestDate).toMatchObject<Date>(new Date(2021, 0, 1));
    }),
    it('load newest date not exist', () => {

        //GIVEN
        localStorage.clear();

        //WHEN
        const newestDate: Date | null = TimeService.loadNewestDate();

        //THEN
        expect(newestDate).toBeNull();
    }),

    it('save entry for date', () => {

        //GIVEN
        localStorage.clear();
        const entry: Entry = {
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0),
            fullDay: false
        };

        //WHEN
        TimeService.saveEntryForDate(new Date(2021,0,1),entry);
        
        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_ENTRY + "01/01/2021")).toMatch(JSON.stringify(entry));
    }),
    it('save entry for divergent date', () => {

        //GIVEN
        localStorage.clear();
        const entry: Entry = {
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0),
            fullDay: false
        };

        //WHEN
        TimeService.saveEntryForDate(new Date(2021,0,15),entry);
        
        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_ENTRY + "01/15/2021")).toMatch(JSON.stringify(entry));
    }),

    it('save entry for date update newest date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));

        const entry: Entry = {
            type: EntryType.VACATION,
            start: new Date(2021, 0, 15, 0, 0),
            fullDay: true
        };

        //WHEN
        TimeService.saveEntryForDate(new Date(2021,0,15),entry);
        
        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_NEWEST_DATE)).toMatch(JSON.stringify(new Date(2021,0,15)));
    }),
    it('save entry for date update oldest date', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 2, 0, 0),
            overtime: new Duration(-8, 0, true),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 0, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));

        const entry: Entry = {
            type: EntryType.VACATION,
            start: new Date(2020, 0, 15, 0, 0),
            fullDay: true
        };

        //WHEN
        TimeService.saveEntryForDate(new Date(2020,0,15),entry);
        
        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_OLDEST_DATE)).toMatch(JSON.stringify(new Date(2020,0,15)));
    }),

    it('calculate worktime for time range three entries out of range sum zero', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 0, 2, 0, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "03/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 0, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 4, 3)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));


        //WHEN
        const worktimeComplete: Duration = TimeService.calculateWorktimeForTimeRange(new Date(2021, 1, 1), new Date(2021, 1, 26));

        //THEN
        expect(worktimeComplete).toMatchObject<Duration>(new Duration(0, 0));
    }),
    it('calculate worktime for time range three entries out of range, two in range', () => {

        //GIVEN
        localStorage.clear();
        //Out of range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 0, 2, 0, 0),
        } as Entry));

        //In range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/15/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 1, 15, 10, 0),
            end: new Date(2021, 1, 15, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 16, 10, 0),
            worktime: new Duration(8, 0),
        } as Entry));

        //In range but for overtime the worktime is 0
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 1, 17, 0, 0),
            overtime: new Duration(7, 30),
        } as Entry));

        //Out of range
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "03/03/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 4, 3, 0, 0),
            overtime: new Duration(0, 30),
        } as Entry));

        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 4, 3)));

        

        //WHEN
        const worktimeComplete: Duration = TimeService.calculateWorktimeForTimeRange(new Date(2021, 1, 1), new Date(2021, 1, 26));

        //THEN
        expect(worktimeComplete).toMatchObject<Duration>(new Duration(16, 30));
    }),

    it('calculate worktime over all time, all in range', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/01/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 0, 1, 10, 0),
            end: new Date(2021, 0, 1, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "01/02/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 0, 2, 0, 0),
            worktime: new Duration(8, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/15/2021", JSON.stringify({
            type: EntryType.WORK,
            start: new Date(2021, 1, 15, 10, 0),
            end: new Date(2021, 1, 15, 19, 0)
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 16, 10, 0),
            worktime: new Duration(8, 0),
        } as Entry));

        //In range but for overtime the worktime is 0
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.OVERTIME,
            start: new Date(2021, 1, 17, 0, 0),
            overtime: new Duration(7, 30),
        } as Entry));

        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 0, 1)));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 4, 3)));

        //WHEN
        const worktimeComplete: Duration = TimeService.calculateWorktimeComplete();

        //THEN
        expect(worktimeComplete).toMatchObject<Duration>(new Duration(33, 0));
    }),

    it('saveWorkStart save new workstart workstart points to right entry', () => {

        //GIVEN
        localStorage.clear();
        
        //WHEN
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveWorkStart(workStartEntry);

        //THEN
        expect(localStorage.getItem(times.STORAGE_KEY_CURRENT_WORKSTART)).toEqual(times.STORAGE_KEY_ENTRY+times.dateToDateForSaving(workStartTime));
    }),

    it('isWorkStartActive save workstart returns true', () => {

        //GIVEN
        localStorage.clear();
        
        //WHEN
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);
        const isWorkStartActive: boolean = TimeService.isWorkStartActive();

        //THEN
        expect(isWorkStartActive).toBeTruthy();
    }),

    it('isWorkStartActive save no workstart return false', () => {

        //GIVEN
        localStorage.clear();
        
        //WHEN
        const isWorkStartActive: boolean = TimeService.isWorkStartActive();

        //THEN
        expect(isWorkStartActive).toBeFalsy();
    }),

    it('isWorkStartActive save workstart with end return false', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            end: new Date(),
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        const isWorkStartActive: boolean = TimeService.isWorkStartActive();

        //THEN
        expect(isWorkStartActive).toBeFalsy();
    }),

    it('isWorkStartActive save workstart without saved entry return false', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            end: new Date(),
            type: EntryType.WORK
        };
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        const isWorkStartActive: boolean = TimeService.isWorkStartActive();

        //THEN
        expect(isWorkStartActive).toBeFalsy();
    }),

    it('stopWork isWorkStartActive returns false', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        TimeService.stopWork();

        //THEN
        const isWorkStartActive: boolean = TimeService.isWorkStartActive();
        expect(isWorkStartActive).toBeFalsy();
    }),

    it('stopWork work start entry has end date set', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        TimeService.stopWork();

        //THEN
        const updatedWorkStartEntry: Entry | null = TimeService.loadEntryForDate(workStartEntry.start);
        expect(updatedWorkStartEntry?.end).not.toBeNull();
    }),

    it('stopWork work start entry is calculated', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        TimeService.stopWork();

        //THEN
        const updatedWorkStartEntry: Entry | null = TimeService.loadEntryForDate(workStartEntry.start);
        expect(updatedWorkStartEntry?.worktime).not.toBeNull();
    }),

    it('loadActiveWorkEntry started work entry is loaded', () => {

        //GIVEN
        localStorage.clear();
        const workStartTime = new Date();
        const workStartEntry: Entry = {
            fullDay: false,
            start: workStartTime,
            type: EntryType.WORK
        };
        TimeService.saveEntryForDate(workStartEntry.start, workStartEntry);
        TimeService.saveWorkStart(workStartEntry);

        //WHEN
        const loadedActiveWorkEntry: Entry | null = TimeService.loadActiveWorkEntry();

        //THEN
        expect(loadedActiveWorkEntry).toMatchObject<Entry>(workStartEntry);
    }),

    it('calculateIllDaysForTimeRange - ill days in range - correct ill day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const illDayCount: number = TimeService.calculateIllDaysForTimeRange(new Date(2021, 1, 16), new Date(2021, 1, 18));

        //THEN
        expect(illDayCount).toEqual(3);

    }),
    it('calculateIllDaysForTimeRange - only last two ill days in range - correct ill day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const illDayCount: number = TimeService.calculateIllDaysForTimeRange(new Date(2021, 1, 17), new Date(2021, 1, 18));

        //THEN
        expect(illDayCount).toEqual(2);

    }),
    it('calculateIllDaysForTimeRange - only first two ill days in range - correct ill day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.ILL,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const illDayCount: number = TimeService.calculateIllDaysForTimeRange(new Date(2021, 1, 16), new Date(2021, 1, 17));

        //THEN
        expect(illDayCount).toEqual(2);

    }),

    it('calculateVacationDaysForTimeRange - vacation days in range - correct vacation day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const vacationDayCount: number = TimeService.calculateVacationDaysForTimeRange(new Date(2021, 1, 16), new Date(2021, 1, 18));

        //THEN
        expect(vacationDayCount).toEqual(3);

    }),
    it('calculateVacationDaysForTimeRange - only last two vacation days in range - correct vacation day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const vacationDayCount: number = TimeService.calculateVacationDaysForTimeRange(new Date(2021, 1, 17), new Date(2021, 1, 18));

        //THEN
        expect(vacationDayCount).toEqual(2);

    }),
    it('calculateVacationDaysForTimeRange - only first two vacation days in range - correct vacation day amount', () => {

        //GIVEN
        localStorage.clear();
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/16/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 16, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/17/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 17, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_ENTRY + "02/18/2021", JSON.stringify({
            type: EntryType.VACATION,
            start: new Date(2021, 1, 18, 10, 0),
        } as Entry));
        localStorage.setItem(times.STORAGE_KEY_NEWEST_DATE, JSON.stringify(new Date(2021, 1, 18)));
        localStorage.setItem(times.STORAGE_KEY_OLDEST_DATE, JSON.stringify(new Date(2021, 1, 16)));

        //WHEN
        const vacationDayCount: number = TimeService.calculateVacationDaysForTimeRange(new Date(2021, 1, 16), new Date(2021, 1, 17));

        //THEN
        expect(vacationDayCount).toEqual(2);

    })
    
})
