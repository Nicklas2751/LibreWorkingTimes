export interface Month {
    name: string;
    monthNumber: number;
    year: number;
    days: Day[];
}

export interface Day {
    weekday: string;
    day: string;
    date: Date;
    entry?: Entry;
}

export interface Entry {
    overtime?: Duration;
    worktime?: Duration;
    pausetime?: Duration;
    start: Date;
    end?: Date;
    fullDay: boolean;
    type: EntryType;
}

export enum EntryType {
    OVERTIME,
    WORK,
    VACATION,
    ILL,
}

export class Duration {
    hours: number;
    minutes: number;
    isNegative: boolean;


    constructor(hours: number, minutes: number, isNegative?: boolean) {
        this.hours = hours;
        this.minutes = minutes;
        this.isNegative = isNegative == undefined ? hours < 0 || minutes < 0 : isNegative;
    }

    public toString(): string {
        return (this.hours == 0 && this.isNegative ? "-" : "") + this.hours + ":" + ((this.minutes < 10 && this.minutes >= 0) ? "0" : "") + (this.minutes < 0 ? this.minutes * -1 : this.minutes);
    }

}

export enum OvertimeMode {
    ADD, REMOVE
}

export interface WorkDay {
    name: string;
    day: number;
}

export class WorkDayImpl implements WorkDay {
    private _name: string;
    private _day: number;

    constructor(name: string, day: number)
    {
        this._name = name;
        this._day = day;
    }

    public get name(): string {
        return this._name;
    }

    public get day(): number {
        return this._day;
    }

    public toString(): string {
        return this._name;
    }
}

export const WORK_DAYS: WorkDay[] = [ new WorkDayImpl("monday", 1),  new WorkDayImpl("tuesday", 2),  new WorkDayImpl("wednesday", 3),  new WorkDayImpl("thursday", 4),  new WorkDayImpl("friday", 5),  new WorkDayImpl("saturday", 6),  new WorkDayImpl("sunday", 0)];