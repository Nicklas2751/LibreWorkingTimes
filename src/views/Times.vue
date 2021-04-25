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
            <ion-col class="ion-align-self-center" size="6">
              <span class="bold">Heute:</span> {{ calcToday() }}
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
                    day.entry.overtime
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
import { Month, Day, Entry, EntryType } from "../types";

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
    calcToday() {
      return 7;
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
    switchOvertimeColor(overtime: string) {
      return overtime.startsWith("-") ? "danger" : "success";
    },
    formatTime(date: Date) {
      return date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatWorkTime(worktime: string) {
      if (worktime) {
        return worktime;
      }
      return "0:00";
    },
    isWork(entryType: EntryType) {
      return entryType === EntryType.WORK;
    },
    loadMonths(): Month[] {
      const months: Month[] = [];
      const mockDataEntries: Entry[] = [
        {
          overtime: "1:45",
          start: new Date(2021, 3, 23, 7, 45),
          end: new Date(2021, 3, 23, 18),
          worktime: "9:45",
          fullDay: false,
          type: EntryType.WORK,
        },
        {
          overtime: "1:30",
          start: new Date(2021, 3, 22, 6),
          end: new Date(2021, 3, 22, 16),
          worktime: "9:30",
          fullDay: false,
          type: EntryType.WORK,
        },
        {
          overtime: "-8:00",
          start: new Date(2021, 3, 9, 0),
          end: new Date(2021, 3, 9, 24),
          fullDay: true,
          type: EntryType.OVERTIME,
        },
        {
          overtime: "0:00",
          start: new Date(2021, 2, 26, 0),
          end: new Date(2021, 2, 26, 24),
          fullDay: true,
          type: EntryType.ILL,
        },
        {
          overtime: "0:00",
          start: new Date(2021, 2, 14, 0),
          end: new Date(2021, 2, 14, 24),
          fullDay: true,
          type: EntryType.VACATION,
        },
      ];

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
            hasEntry: mockDataEntries.some((entry) =>
              isDateEqualsTimeIgnoring(entry.start, date)
            ),
            entry: mockDataEntries.find((entry) =>
              isDateEqualsTimeIgnoring(entry.start, date)
            ),
          };

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