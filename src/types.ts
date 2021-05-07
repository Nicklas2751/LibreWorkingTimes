export interface Month {
    name: string;
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

    constructor(hours: number, minutes: number) {
        this.hours = hours;
        this.minutes = minutes;
    }

    public toString(): string {
        return this.hours + ":" + ((this.minutes < 10 && this.minutes >= 0) ? "0" : "") + (this.minutes < 0 ? this.minutes*-1 : this.minutes);
    }

}

export enum OvertimeMode {
    ADD, REMOVE
}