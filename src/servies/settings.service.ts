import { Duration } from "../types";
const STORAGE_KEY_DAILY_WORKTIME = "Settings.DailyWorktime";
const STORAGE_KEY_DAILY_PAUSETIME = "Settings.DailyPausetime";

const SettingsService = {

    setNeededDailyWorktime(dailyWorktime: Duration) {
        localStorage.setItem(STORAGE_KEY_DAILY_WORKTIME, JSON.stringify(dailyWorktime));
    },
    getNeededDailyWorktime(): Duration {
        const dailyWorktimeJson = localStorage.getItem(STORAGE_KEY_DAILY_WORKTIME);
        return dailyWorktimeJson && dailyWorktimeJson != null ? JSON.parse(dailyWorktimeJson) : {
            hours: 8,
            minutes: 0
        };
    },

    setDailyPausetime(dailyPausetime: Duration) {
        localStorage.setItem(STORAGE_KEY_DAILY_PAUSETIME, JSON.stringify(dailyPausetime));
    },
    getDailyPausetime(): Duration {
        const dailyPausetime = localStorage.getItem(STORAGE_KEY_DAILY_PAUSETIME);
        return dailyPausetime && dailyPausetime != null ? JSON.parse(dailyPausetime) : {
            hours: 0,
            minutes: 30
        };
    },

}

export default SettingsService;