<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-grid>
          <ion-row>
            <ion-col
              id="complete-overtime"
              class="ion-align-self-center"
              size="6"
            >
              <span class="bold">{{ $t("times.overtimeLabel") }}:</span> {{ completeOvertime }}
            </ion-col>
            <ion-col class="ion-align-self-center" size="3">
              <span class="bold">{{ $t("times.todayLabel") }}:</span>
            </ion-col>
            <ion-col id="today-stats" class="ion-align-self-center" size="3">
              {{ formatDuration(current.worktime) }}<br />
              <ion-text
                id="today-overtime"
                :color="switchOvertimeColor(current.overtime)"
                >{{ formatDuration(current.overtime) }}</ion-text
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list id="times-list" ref="entryList">
        <ion-item-group v-bind:key="month.name" v-for="month in months">
          <ion-item-divider
            :id="'times-divider-'+month.name.toLowerCase()+'-'+month.year"
            color="primary"
            sticky
            >{{ month.name }} {{ month.year }}</ion-item-divider
          >
          <ion-item-sliding v-for="day in month.days" v-bind:key="day.day">
            <ion-item
              :id="formatDateForId(day.date)"
              @click="openAddEditModal(day)"
            >
              <ion-grid>
                <ion-row>
                  <ion-col size="4">
                    <ion-label :color="switchLabelColor(day)">
                      <div id="times-item-day-weekday">{{ day.weekday }}.</div>
                      <div id="times-item-day-day" class="bigger">
                        {{ day.day }}
                      </div>
                    </ion-label>
                  </ion-col>

                  <ion-col size="4" v-if="getDayEntry(day)">
                    <ion-text
                      id="times-item-start-end-time"
                      v-if="isWork(getDayEntry(day).type)"
                    >
                      {{ formatTime(getDayEntry(day).start) }} -
                      {{ formatTime(getDayEntry(day).end) }}
                    </ion-text>
                  </ion-col>

                  <ion-col
                    id="times-item-stats"
                    size="4"
                    class="ion-text-end"
                    v-if="getDayEntry(day)"
                  >
                    {{ formatDuration(getDayEntry(day).worktime) }}<br />
                    <ion-text
                      id="times-item-overtime"
                      :color="switchOvertimeColor(getDayEntry(day).overtime)"
                      >{{ getDayEntry(day).overtime.toString() }}</ion-text
                    >
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                id="times-item-delete-button"
                v-if="day.entry"
                ion-item-option
                color="danger"
                expandable
                @click="deleteEntryForDay(day)"
                >{{ $t("times.deleteButton") }}</ion-item-option
              >
            </ion-item-options>
          </ion-item-sliding>
        </ion-item-group>
      </ion-list>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        threshold="100px"
        id="infinite-scroll"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          v-bind:loading-text="$t('times.loadingData')"
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button
        id="times-quick-add-button"
        @click="presentQuickActionsSheet()"
      >
        <ion-icon :ios="addOutline" :md="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonItemDivider,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
  actionSheetController,
} from "@ionic/vue";
import { Month, Day, Entry, EntryType, Duration } from "../types";
import TimeService from "@/servies/times.service";
import { defineComponent } from "vue";
import TimeAddAndEditModalVue from "./TimeAddAndEditModal.vue";
import { add, addOutline, close } from "ionicons/icons";
import SettingsService from "@/servies/settings.service";

function daysInMonth(month: number, year: number): number {
  return new Date(year, month+1, 0).getDate();
}

function createItemSelectorTextForDate(date: Date): string {
  const day = date.toLocaleDateString(navigator.language, {
    day: "2-digit"
  }).toLowerCase();
  const month = date.toLocaleDateString(navigator.language, {
    month: "long"
  }).toLowerCase();
  const year = date.toLocaleDateString(navigator.language, {
    year: "numeric"
  }).toLowerCase();

  return day+"-"+month+"-"+year;
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



export default defineComponent({
  interval: 1000,
  months: [],
  monthModifier: 0,
  components: {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonItemDivider,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      months: [] as Month[],
      current: {} as Entry,
      completeOvertime: "",
      interval: 1000,
      monthModifier: 0,
      add,
      addOutline,
    };
  },
  created() {
    const newestDate: Date | null = TimeService.loadNewestDate();
    if(newestDate != null && newestDate > new Date())
    {
      this.loadMonthsInFutureUntil(newestDate);
      this.monthModifier = 1;
    }
    this.loadNextMonth();
    this.loadNextMonth();
    this.loadStatistics();
    this.interval = setInterval(this.loadStatistics, 1000);
  },
  methods: {
    formatDateForId(date: Date) {
      const day = date.toLocaleDateString(navigator.language, {
        day: "2-digit"
      }).toLowerCase();
      const month = date.toLocaleDateString(navigator.language, {
        month: "long"
      }).toLowerCase();
      const year = date.toLocaleDateString(navigator.language, {
        year: "numeric"
      }).toLowerCase();

      return "times-item-"+day+"-"+month+"-"+year;
    },
    loadCompleteOvertime() {
      this.completeOvertime = this.formatDuration(
        TimeService.calculateOvertimeComplete()
      );
    },
    isToday(day: Day): boolean {
      return isSameDate(day.date, new Date());
    },
    getDayEntry(day: Day): Entry | undefined {
      if (day.entry) {
        if (isSameDate(day.entry.start, this.current.start)) {
          return this.current;
        }
        return day.entry;
      }
    },
    loadStatistics() {
      this.loadTodayEntry();
      this.loadCompleteOvertime();
    },
    loadTodayEntry() {
      let current: Entry | null = null;
      if(TimeService.isWorkStartActive())
      {
        current = TimeService.loadActiveWorkEntry();
      }

      if(current === null)
      {
        current = TimeService.loadEntryForDate(new Date());
      }

      if (current === null) {
        this.current = {
          start: new Date(),
          fullDay: false,
          type: EntryType.WORK,
          overtime: new Duration(0, 0),
          worktime: new Duration(0, 0),
        };
      } else {
        this.current = TimeService.calculateEntry(current);
      }
    },
    switchLabelColor(day: Day) {
      if(day.entry)
      {

        if(day.entry.type === EntryType.OVERTIME)
        {
          return "warning";
        }

        if(day.entry.type === EntryType.VACATION)
        {
          return "secondary";
        }

        if(day.entry.type === EntryType.ILL)
        {
          return "tertiary";
        }

        return "primary";

      }

      if(SettingsService.workdays.value.find(workday => workday.day === day.date.getDay()))
      {
        return "dark";
      }

      return "medium";
    },
    switchOvertimeColor(overtime: Duration | undefined) {
      if (!overtime) {
        return "success";
      }
      return overtime.toString().startsWith("-") ? "danger" : "success";
    },
    formatTime(date: Date | undefined) {
      return (date ? date : new Date()).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatDuration(duration: Duration | undefined): string {
      if (duration) {
        return duration.toString();
      }
      return "0:00";
    },
    isWork(entryType: EntryType) {
      return entryType === EntryType.WORK;
    },
    loadData(event: CustomEvent) {
      setTimeout(() => {
        this.loadNextMonth();
        if (event.target) {
          const test: typeof IonInfiniteScroll = (event.target as unknown) as typeof IonInfiniteScroll;
          test.complete();
        }
      }, 500);
    },
    getDayForDate(date: Date): Day {
      const onlyWeekDayOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
      };
      const onlyDayOptions: Intl.DateTimeFormatOptions = { day: "numeric" };
      const newDay: Day = {
        weekday: date.toLocaleDateString(
          navigator.language,
          onlyWeekDayOptions
        ),
        day: date.toLocaleDateString(navigator.language, onlyDayOptions),
        date: date,
      };
      const dayEntry = TimeService.loadEntryForDate(date);

      if (dayEntry != null) {
        newDay.entry = dayEntry;
      }
      return newDay;
    },
    async loadMonth(month: number, year: number, date?: number) {
      const baseDate = new Date();
      baseDate.setDate(1);
      baseDate.setMonth(month);

      const onlyMonthNameOptions: Intl.DateTimeFormatOptions = {
        month: "long",
      };
      const newMonth: Month = {
        name: new Date(year, month).toLocaleDateString(
          navigator.language,
          onlyMonthNameOptions
        ),
        monthNumber: month,
        year: baseDate.getFullYear(),
        days: [],
      };

      let latestDay: number;
      if(date)
      {
        latestDay = date;
      } else if(this.months.length === 0) {
        latestDay = new Date().getDate();
      } else {
        latestDay = daysInMonth(month, year)
      }

      for (let day = latestDay; day > 0; day--) {
        const dayDate = new Date(year, month, day);
        const newDay: Day = this.getDayForDate(dayDate);

        newMonth.days.push(newDay);
      }
      
      const foundMonthIndex = this.months.findIndex(searchMonth => searchMonth.year == year && searchMonth.monthNumber == month);

      if(foundMonthIndex >= 0)
      {
        this.months[foundMonthIndex] = newMonth;
      } else if(this.months[0] && (year > this.months[0].year || month > this.months[0].monthNumber))
      {
        this.months.unshift(newMonth);
      } else {
        this.months.push(newMonth);
      }
    },
    async loadNextMonth() {
      this.loadMonth((new Date().getMonth() - this.monthModifier), new Date().getFullYear());
      this.monthModifier++;
    },
    async deleteEntryForDay(day: Day) {
      if (day.entry) {
        TimeService.deleteEntryForDate(day.entry.start);
        day.entry = undefined;
      }

      (this.$refs.entryList as typeof IonList).$el.closeSlidingItems();
    },
    findDayForDate(date: Date): Day | undefined
    {
      const foundMonth = this.months.find(month => month.monthNumber === date.getMonth());
      if(foundMonth)
      {
        return foundMonth.days.find(day => day.date.toDateString() == date.toDateString());       
      }
    },
    updateTimeRange(start: Date, end: Date)
    {
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const foundDay = this.findDayForDate(date);
        const loadedEntry = TimeService.loadEntryForDate(date);
        if(foundDay && loadedEntry != null)
        {
          foundDay.entry = loadedEntry;
        }
      }
    },
    async openAddEditModal(day: Day) {
      const addEditModal = await modalController.create({
        id: "times-new-entry-"+createItemSelectorTextForDate(day.date),
        component: TimeAddAndEditModalVue,
        componentProps: {
          day: day,
          dismiss: () => {
            addEditModal.dismiss();
          },
          saveDayEntry: (entry: Entry) => {
            let dayToSaveEntryTo: Day = day;
            if(!isSameDate(entry.start, day.date))
            {
              const foundDay = this.findDayForDate(entry.start);
              if(foundDay)
              {
                dayToSaveEntryTo = foundDay;
              }
            }

            if(entry.start > new Date())
            {
              this.loadMonthsInFutureUntil(entry.start);
            }

            dayToSaveEntryTo.entry = entry;

            if(entry.end && entry.start.toDateString() !== entry.end.toDateString())
            {

              this.updateTimeRange(entry.start, entry.end);
            }

            this.loadStatistics();
          },
        },
      });
      return addEditModal.present();
    },
    loadMonthsInFutureUntil(date: Date){
      const newestMonth = new Date();
      newestMonth.setHours(0, 0, 0, 0);
      newestMonth.setDate(1);

      for(const monthToLoad: Date = newestMonth; monthToLoad < date; monthToLoad.setMonth(monthToLoad.getMonth()+1))
      {
        if(monthToLoad.getFullYear() == date.getFullYear() && monthToLoad.getMonth() == date.getMonth())
        {
          this.loadMonth(monthToLoad.getMonth(), monthToLoad.getFullYear(), date.getDate());  
        } else {
          this.loadMonth(monthToLoad.getMonth(), monthToLoad.getFullYear());
        }
      }
    },
    getWorktimeForDate(date: Date) {
      const dateEntry: Entry | undefined = this.getDayEntry(
        this.getDayForDate(date)
      );
      if (dateEntry) {
        return dateEntry.worktime;
      }
      return undefined;
    },
    getOvertimeForDate(date: Date) {
      const dateEntry: Entry | undefined = this.getDayEntry(
        this.getDayForDate(date)
      );
      if (dateEntry) {
        return dateEntry.overtime;
      }
      return undefined;
    },
    async presentQuickActionsSheet() {
      const today = new Date();
      let todayDayElement: Day | undefined = this.months
        .filter(
          (month) =>
            month.year == today.getFullYear() &&
            month.monthNumber == today.getMonth()
        )
        .flatMap((month) => month.days)
        .find((day) => isSameDate(day.date, today));

      if (!todayDayElement) {
        todayDayElement = this.getDayForDate(today);
      }

      const quickActionsSheet = await actionSheetController.create({
        header: this.$t("times.quickActions.header"),
        buttons: [
          {
            text: TimeService.isWorkStartActive() ? this.$t("times.quickActions.stopWork") : this.$t("times.quickActions.startWork"),
            icon: add,
            handler: () => {
              if(TimeService.isWorkStartActive())
              {
                TimeService.stopWork();
              } else {
                if (todayDayElement) {
                  todayDayElement.entry = {
                    start: new Date(),
                    fullDay: false,
                    type: EntryType.WORK,
                  };

                  TimeService.saveEntryForDate(new Date(), todayDayElement.entry);
                  TimeService.saveWorkStart(todayDayElement.entry);
                  this.loadStatistics();
                }
              }
            },
          },
          {
            text: this.$t("times.quickActions.newEntry"),
            icon: add,
            handler: () => {
              if (todayDayElement) {
                this.openAddEditModal(todayDayElement);
              }
            },
          },
          {
            text: this.$t("cancel"),
            icon: close,
            role: "cancel",
          },
        ],
      });
      await quickActionsSheet.present();
    },
  },
});
</script>

<style scoped>
.bold {
  font-weight: bold;
}
.bigger {
  font-size: 1.25em;
}
</style>