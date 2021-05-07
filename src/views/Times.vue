<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-grid>
          <ion-row>
            <ion-col class="ion-align-self-center" size="6">
              <span class="bold">Überstunden:</span> {{ calcOvertime() }}
            </ion-col>
            <ion-col class="ion-align-self-center" size="3">
              <span class="bold">Heute:</span>
            </ion-col>
            <ion-col class="ion-align-self-center" size="3">
              {{ formatDuration(current.worktime) }}<br />
              <ion-text
                :color="switchOvertimeColor(current.overtime)"
                >{{ formatDuration(current.overtime) }}</ion-text
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list ref="entryList">
        <ion-item-group v-bind:key="month.name" v-for="month in months">
          <ion-item-divider color="primary" sticky
            >{{ month.name }} {{ month.year }}</ion-item-divider
          >
          <ion-item-sliding v-for="day in month.days" v-bind:key="day.day">
            <ion-item @click="openAddEditModal(day)">
              <ion-grid>
                <ion-row>
                  <ion-col size="4">
                    <ion-label :color="switchLabelColor(day)">
                      <div>{{ day.weekday }}.</div>
                      <div class="bigger">
                        {{ day.day }}
                      </div>
                    </ion-label>
                  </ion-col>

                  <ion-col size="4" v-if="getDayEntry(day)">
                    <ion-text v-if="isWork(getDayEntry(day).type)">
                      {{ formatTime(getDayEntry(day).start) }} -
                      {{ formatTime(getDayEntry(day).end) }}
                    </ion-text>
                  </ion-col>

                  <ion-col
                    size="4"
                    class="ion-text-end"
                    v-if="getDayEntry(day)"
                  >
                    {{ formatDuration(getDayEntry(day).worktime) }}<br />
                    <ion-text
                      :color="switchOvertimeColor(getDayEntry(day).overtime)"
                      >{{ getDayEntry(day).overtime.toString() }}</ion-text
                    >
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option
                v-if="day.entry"
                ion-item-option
                color="danger"
                expandable
                @click="deleteEntryForDay(day)"
                >Delete</ion-item-option
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
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
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
  modalController,
} from "@ionic/vue";
import { Month, Day, Entry, EntryType, Duration } from "../types";
import TimeService from "@/servies/times.service";
import { defineComponent } from "vue";
import TimeAddAndEditModalVue from "./TimeAddAndEditModal.vue";

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

function setupMockData() {
  const mockDataEntries: Entry[] = [
    /*{
      start: new Date(2021, 4, 1, 6, 0),
      fullDay: false,
      type: EntryType.WORK,
    },*/
    {
      start: new Date(2021, 3, 26, 19, 0),
      end: new Date(2021, 3, 26, 20, 0),
      fullDay: false,
      type: EntryType.WORK,
    },
    {
      start: new Date(2021, 3, 23, 7, 45),
      end: new Date(2021, 3, 23, 18),
      fullDay: false,
      type: EntryType.WORK,
    },
    {
      start: new Date(2021, 3, 22, 6),
      end: new Date(2021, 3, 22, 16),
      fullDay: false,
      type: EntryType.WORK,
    },
    {
      start: new Date(2021, 3, 21, 20, 0),
      end: new Date(2021, 3, 25, 20, 0),
      fullDay: false,
      type: EntryType.WORK,
    },
    {
      start: new Date(2021, 3, 9, 0),
      end: new Date(2021, 3, 9, 24),
      fullDay: true,
      type: EntryType.OVERTIME,
    },
    {
      start: new Date(2021, 2, 26, 0),
      end: new Date(2021, 2, 26, 24),
      fullDay: true,
      type: EntryType.ILL,
    },
    {
      start: new Date(2021, 2, 14, 0),
      end: new Date(2021, 2, 14, 24),
      fullDay: true,
      type: EntryType.VACATION,
    },
  ];
  mockDataEntries.forEach((entry) =>
    TimeService.saveEntryForDate(entry.start, TimeService.calculateEntry(entry))
  );
}

function isSameDate(first: Date, second: Date) {
  return (
    first.toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) ===
    second.toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
}

export default defineComponent({
  name: "Zeiten",
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
  },
  data() {
    return {
      title: "Zeiten",
      months: [] as Month[],
      current: {} as Entry,
      interval: 1000,
      monthModifier: 0,
    };
  },
  created() {
    setupMockData();
    this.loadNextMonth();
    this.loadNextMonth();
    this.getTodayEntry();
    this.interval = setInterval(this.getTodayEntry, 1000);
  },
  methods: {
    calcOvertime() {
      return 40;
    },
    getDayEntry(day: Day): Entry | undefined {
      if (day.entry) {
        if (isSameDate(day.entry.start, this.current.start)) {
          return this.current;
        }
        return day.entry;
      }
      return;
    },
    getTodayEntry() {
      const current = TimeService.loadEntryForDate(new Date());
      if (current == null) {
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
      return day.entry
        ? day.entry.type === EntryType.OVERTIME
          ? "warning"
          : day.entry.type === EntryType.VACATION
          ? "secondary"
          : day.entry.type === EntryType.ILL
          ? "tertiary"
          : "primary"
        : "medium";
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
    async loadNextMonth() {
      const baseDate = new Date();
      baseDate.setMonth(new Date().getMonth() - this.monthModifier);
      const month = baseDate.getMonth();
      const year = baseDate.getFullYear();

      const onlyMonthNameOptions: Intl.DateTimeFormatOptions = {
        month: "long",
      };
      const currentMonth: Month = {
        name: new Date(year, month).toLocaleDateString(
          navigator.language,
          onlyMonthNameOptions
        ),
        year: baseDate.getFullYear(),
        days: [],
      };

      const latestDay =
        year === new Date().getFullYear() && month === new Date().getMonth()
          ? new Date().getDate()
          : daysInMonth(month, year) - 1;

      for (let day = latestDay; day > 0; day--) {
        const date = new Date(year, month, day);
        const newDay: Day = this.getDayForDate(date);

        currentMonth.days.push(newDay);
      }
      this.months.push(currentMonth);

      this.monthModifier++;
    },
    async deleteEntryForDay(day: Day) {
      if (day.entry) {
        TimeService.deleteEntryForDate(day.entry.start);
        day.entry = undefined;
      }

      (this.$refs.entryList as typeof IonList).$el.closeSlidingItems();
    },
    async openAddEditModal(day: Day) {
      const addEditModal = await modalController.create({
        component: TimeAddAndEditModalVue,
        componentProps: {
          day: day,
          dismiss: () => {
            addEditModal.dismiss();
          },
          saveDayEntry: (entry: Entry) => {
            if(day.entry){
            day.entry.overtime = entry.overtime;}
            day.entry = entry;
            
            this.getTodayEntry();
          },
        },
      });
      return addEditModal.present();
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