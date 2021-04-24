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
          <ion-item-divider color="light" sticky
            >{{ month.name }} {{ month.year }}</ion-item-divider
          >
          <ion-item v-for="day in month.days" v-bind:key="day.date">
            <ion-label color="medium">
              <div>{{ day.weekday }}.</div>
              <div class="bigger">
                {{ day.date }}
              </div>
            </ion-label>
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
} from "@ionic/vue";

import * as moment from 'moment';

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

interface Month {
  name: string;
  year: number;
  days: Day[];
}

interface Day {
  weekday: string;
  date: string;
  hasEntry: boolean;
}

interface Entry {
  overtime: moment.Duration;
  start: Date;
  end: Date;
  fullDay: boolean;
  type: EntryType;
}

enum EntryType {
  OVERTIME, WORK, VACATION
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
  },
  data() {
    return {
      title: "Zeiten",
    };
  },
  methods: {
    calcOvertime() {
      return 0;
    },
    calcToday() {
      return 0;
    },
    loadMonths(): Month[] {
      const months: Month[] = [];
      const mockDataEntries: Entry[] = [
        {
          overtime: moment.Duration()
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
        for (let day = 1; day < daysInMonth(month, year); day++) {
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