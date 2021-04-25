export interface Month {
    name: string;
    year: number;
    days: Day[];
}

export interface Day {
    weekday: string;
    date: string;
    hasEntry: boolean;
    entry?: Entry;
}

export interface Entry {
    overtime: string;
    worktime?: string;
    start: Date;
    end: Date;
    fullDay: boolean;
    type: EntryType;
}

export enum EntryType {
    OVERTIME,
    WORK,
    VACATION,
    ILL,
}