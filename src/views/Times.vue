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
              {{ formatWorkTime(getCurrentOrTodayEntry().worktime) }}<br />
              <ion-text
                :color="switchOvertimeColor(getCurrentOrTodayEntry().overtime)"
                >{{ getCurrentOrTodayEntry().overtime.toString() }}</ion-text
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!--  
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-grid>
          <ion-row>
            <ion-col class="ion-align-self-center" size="6">
              Überstunden: 
            </ion-col>
            <ion-col class="ion-align-self-center" size="6">
              Heute: 
            </ion-col>
          </ion-row>
        </ion-grid>
        </ion-toolbar>
      </ion-header> -->
      <ion-list>
        <ion-item-group v-bind:key="month.name" v-for="month in loadMonths()">
          <ion-item-divider color="primary" sticky
            >{{ month.name }} {{ month.year }}</ion-item-divider
          >
          <ion-item v-for="day in month.days" v-bind:key="day.date">
            <ion-grid>
              <ion-row>
                <ion-col size="4">
                  <ion-label :color="switchLabelColor(day)">
                    <div>{{ day.weekday }}.</div>
                    <div class="bigger">
                      {{ day.date }}
                    </div>
                  </ion-label>
                </ion-col>

                <ion-col size="4" v-if="day.hasEntry && day.entry">
                  <ion-text v-if="isWork(day.entry.type)">
                    {{ formatTime(day.entry.start) }} -
                    {{ formatTime(day.entry.end) }}
                  </ion-text>
                </ion-col>

                <ion-col
                  size="4"
                  class="ion-text-end"
                  v-if="day.hasEntry && day.entry"
                >
                  {{ formatWorkTime(day.entry.worktime) }}<br />
                  <ion-text :color="switchOvertimeColor(day.entry.overtime)">{{
                    day.entry.overtime.toString()
                  }}</ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-item-group>
      </ion-list>
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
} from "@ionic/vue";
import { Month, Day, Entry, EntryType, Duration } from "../types";
import TimeService from "@/servies/times.service";

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

function isDateEqualsTimeIgnoring(firstDate: Date, secondDate: Date): boolean {
  const dateEqualsOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return (
    firstDate.toLocaleDateString(navigator.language, dateEqualsOptions) ===
    secondDate.toLocaleDateString(navigator.language, dateEqualsOptions)
  );
}

function setupMockData() {
  const mockDataEntries: Entry[] = [
    {
      start: new Date(),
      end: new Date(2021, 3, 27, 4,0),
      fullDay: false,
      type: EntryType.WORK,
    },
    {
      start: new Date(2021,3,26, 19,0),
      end: new Date(2021, 3, 26, 20,0),
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
      start: new Date(2021,3,21, 20,0),
      end: new Date(2021, 3, 25, 20,0),
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

export default {
  name: "Zeiten",
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
  },
  data() {
    return {
      title: "Zeiten",
    };
  },
  methods: {
    calcOvertime() {
      return 40;
    },
    getCurrentOrTodayEntry(): Entry {
      const current = TimeService.getCurrentOrTodayEntry();
      if (current == null) {
        return {
          start: new Date(),
          fullDay: false,
          type: EntryType.WORK,
          overtime: new Duration(0, 0),
          worktime: new Duration(0, 0),
        };
      }

      return TimeService.calculateEntry(current);
    },
    switchLabelColor(day: Day) {
      return day.hasEntry && day.entry
        ? day.entry.type === EntryType.OVERTIME
          ? "warning"
          : day.entry.type === EntryType.VACATION
          ? "secondary"
          : day.entry.type === EntryType.ILL
          ? "tertiary"
          : "primary"
        : "medium";
    },
    switchOvertimeColor(overtime: Duration) {
      return overtime.toString().startsWith("-") ? "danger" : "success";
    },
    formatTime(date: Date) {
      return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatWorkTime(worktime: string) {
      if (worktime) {
        return worktime.toString();
      }
      return "0:00";
    },
    isWork(entryType: EntryType) {
      return entryType === EntryType.WORK;
    },
    loadMonths(): Month[] {
      const months: Month[] = [];
      setupMockData();

      for (let monthModifier = 0; monthModifier < 12; monthModifier++) {
        const baseDate = new Date();
        baseDate.setMonth(new Date().getMonth() - monthModifier);
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
          const onlyWeekDayOptions: Intl.DateTimeFormatOptions = {
            weekday: "short",
          };
          const onlyDayOptions: Intl.DateTimeFormatOptions = { day: "numeric" };

          const newDay: Day = {
            weekday: date.toLocaleDateString(
              navigator.language,
              onlyWeekDayOptions
            ),
            date: date.toLocaleDateString(navigator.language, onlyDayOptions),
            hasEntry: false,
          };
          const dayEntry = TimeService.loadEntryForDate(date);

          newDay.hasEntry = dayEntry != null;
          if (newDay.hasEntry) {
            newDay.entry = dayEntry!;
          }

          currentMonth.days.push(newDay);
        }
        months.push(currentMonth);
      }

      return months;
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
.bigger {
  font-size: 1.25em;
}
</style>