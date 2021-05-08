import TimeService from "@/servies/times.service"
import * as times from "@/servies/times.service"
import { Duration, Entry, EntryType } from "@/types"

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
                pausetime: new Duration(0,15),
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
            const perfectEnd: Date = TimeService.calculatePerfectEnd(new Date(2021,0,1,10,0),new Duration(0,15));

            //THEN
            expect(perfectEnd).toMatchObject<Date>(new Date(2021,0,1,18,15));
        }),
        it('calculate perfect end end on next day', () => {

            //GIVEN

            //WHEN
            const perfectEnd: Date = TimeService.calculatePerfectEnd(new Date(2021,0,1,23,0),new Duration(0,45));

            //THEN
            expect(perfectEnd).toMatchObject<Date>(new Date(2021,0,2,7,45));
        })
})
