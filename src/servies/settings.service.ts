import { Duration } from "../types";
import { Ref, ref } from 'vue'
const STORAGE_KEY_WORKTIME = "Settings.WorkTime";
const STORAGE_KEY_BREAKTIME = "Settings.BreakTime";
const STORAGE_KEY_DESCRIPTION = "Settings.Description";
const STORAGE_KEY_WORKDAYS = "Settings.WorkDays";


class SettingsServiceClass {
    private _description: Ref<string>;
    private _workdays: Ref<string[]>;
    private _worktime: Ref<Duration>;
    private _breaktime: Ref<Duration>;

    constructor() {
        this._description = ref(this.loadConfigProperty<string>(STORAGE_KEY_DESCRIPTION, "John Doe @ Example Corp"));
        this._workdays = ref(this.loadConfigProperty<string[]>(STORAGE_KEY_WORKDAYS, ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag']));
        this._worktime = ref(this.loadConfigProperty<Duration>(STORAGE_KEY_WORKTIME, new Duration(8, 0)));
        this._breaktime = ref(this.loadConfigProperty<Duration>(STORAGE_KEY_BREAKTIME, new Duration(0, 30)));
    }

    private saveConfigProperty(key: string, value: any)
    {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private loadConfigProperty<T>(key: string, defaultValue: T): T {
        const loadedPropertyJson: string | null = localStorage.getItem(key);
        return loadedPropertyJson && loadedPropertyJson != null ? JSON.parse(loadedPropertyJson) : defaultValue;
    }

    public setDescription(description: string) {
        this.saveConfigProperty(STORAGE_KEY_DESCRIPTION, description);
        this._description.value = description;
    }

    public get description(): Ref<string> {
        return this._description;
    }

    public setWorkDays(workdays: string[]) {
        this.saveConfigProperty(STORAGE_KEY_WORKDAYS, workdays);
        this._workdays.value = workdays;
    }

    public get workdays(): Ref<string[]> {
        return this._workdays;
    }

    public setWorkTime(worktime: Duration) {
        this.saveConfigProperty(STORAGE_KEY_WORKTIME, worktime);
        this._worktime.value = worktime;
    }

    public get worktime(): Ref<Duration> {
        return this._worktime;
    }

    public setBreakTime(breaktime: Duration) {
        this.saveConfigProperty(STORAGE_KEY_BREAKTIME, breaktime);
        this._breaktime.value = breaktime;
    }

    public get breaktime(): Ref<Duration> {
        return this._breaktime;
    }

}

const SettingsService = new SettingsServiceClass();

export default SettingsService;