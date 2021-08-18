<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Überstunden aktuelle Woche</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentWeekOvertime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Arbeitszeit aktuelle Woche</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentWeekWorktime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Arbeitszeit aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentMonthWorktime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Überstunden aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentMonthOvertime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Krankheitstage aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ currentMonthIllDays }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Urlaubstage aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ currentMonthVacationDays }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Krankheitstage aktuelles Jahr</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ currentYearIllDays }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Urlaubstage aktuelles Jahr</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ currentYearVacationDays }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Arbeitszeit Insgesamt</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentWorktimeComplete) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
                    <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Überstunden Insgesamt</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentOvertimeComplete) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Arbeitszeiten und Überstunden Entwicklung</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <LineChart :chartData="chartData" :options="chartOptions" /><br/>
                <b>Durchschnitt:</b><br/>
                Arbeitszeit: {{ calcAverageWorktime() }} Stunden im Monat <br/>
                Überstunden: {{ calcAverageOvertime() }} Stunden im Monat
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import TimeService from "@/servies/times.service";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import moment from "moment";
import { Duration } from "@/types";
import { LineChart } from 'vue-chart-3'
import { Chart, ChartOptions, registerables } from "chart.js";

function createLabelsForLastSixMonthsIncludingCurrent(): string[] {
  const monthNameLabels: string[] = [];
  for(let monthModifier = 5; monthModifier >= 0; monthModifier--) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - monthModifier);
    monthNameLabels.push(date.toLocaleDateString(navigator.language, {
        month: 'short',
        year: 'numeric'
      }));
  }
  return monthNameLabels;
}

function durationToHoursDecimal(duration: Duration): number {
  let hours = 0;
  hours += duration.hours;
  if(duration.minutes > 0)
  {
    hours += 60.0 / duration.minutes;
  }
  return hours;
}

function loadWorktimesForLastSixMonthsIncludingCurrent(): number[] {
  const worktimes: number[] = [];
  for(let monthModifier = 5; monthModifier >= 0; monthModifier--) {
    const monthBegin = new Date();
    monthBegin.setDate(1);
    monthBegin.setMonth(monthBegin.getMonth() - monthModifier);
    monthBegin.setHours(0, 0, 0, 0);

    const monthEnd = new Date();
    monthEnd.setMonth(monthEnd.getMonth() - monthModifier + 1);
    monthEnd.setDate(0);
    monthEnd.setHours(0, 0, 0, 0);

    worktimes.push(durationToHoursDecimal(TimeService.calculateWorktimeForTimeRange(monthBegin, monthEnd)));
  }
  return worktimes;
}

function loadOvertimesForLastSixMonthsIncludingCurrent(): number[] {
  const overimes: number[] = [];
  for(let monthModifier = 5; monthModifier >= 0; monthModifier--) {
    const monthBegin = new Date();
    monthBegin.setDate(1);
    monthBegin.setMonth(monthBegin.getMonth() - monthModifier);
    monthBegin.setHours(0, 0, 0, 0);

    const monthEnd = new Date();
    monthEnd.setDate(1);
    monthEnd.setMonth(monthEnd.getMonth() - monthModifier + 1);
    monthEnd.setDate(0);
    monthEnd.setHours(0, 0, 0, 0);
    overimes.push(durationToHoursDecimal(TimeService.calculateOvertimeForTimeRange(monthBegin, monthEnd)));
  }
  return overimes;
}

function averageOfArrayWholeNumber(data: number[]): number
{
  return Math.round(data.reduce((a,b) => a + b, 0) / data.length);
}

function clearTime(date: Date) {
  date.setHours(0, 0, 0, 0);
}

function startOfMonth(): Date
{
  const monthStart = moment().startOf("month").toDate();
  //Clear time
  clearTime(monthStart);
  return monthStart;
}

function endOfMonth(): Date
{
  const monthEnd = moment().endOf("month").toDate();
  //Clear time
  clearTime(monthEnd);
  return monthEnd;
}

function startOfWeek(): Date
{
  const weekStart = moment().startOf("week").toDate();
  //Clear time
  clearTime(weekStart);
  return weekStart;
}

function endOfWeek(): Date
{
  const weekEnd = moment().endOf("week").toDate();
  //Clear time
  clearTime(weekEnd);
  return weekEnd;
}

function startOfYear(): Date
{
  const yearStart = moment().startOf("year").toDate();
  //Clear time
  clearTime(yearStart);
  return yearStart;
}

function endOfYear(): Date
{
  const yearEnd = moment().endOf("year").toDate();
  //Clear time
  clearTime(yearEnd);
  return yearEnd;
}

export default defineComponent({
  name: "Auswertung",
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    LineChart,
  },
  setup() {
    Chart.register(...registerables);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    let chartOptions: any;
    
    if(prefersDark.matches)
    {
      chartOptions = ref<ChartOptions<'line'>>({
        responsive: true,
        color: 'rgba(255, 255, 255, 1)',
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)',
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)',
            }
          }
        }
      });
    } else {
      chartOptions = ref<ChartOptions<'line'>>({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      });
    }
    
    const chartData = {
      labels: createLabelsForLastSixMonthsIncludingCurrent(),
      datasets: [
        {
          label: 'Arbeitszeiten',
          data: loadWorktimesForLastSixMonthsIncludingCurrent(),
          backgroundColor: '#36a2eb',
          borderColor: '#36a2eb',
        },
        {
          label: 'Überstunden',
          data: loadOvertimesForLastSixMonthsIncludingCurrent(),
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
        }
      ],
    };

  return { chartData, chartOptions };
  },
  methods: {
    formatDuration(duration: Duration | undefined): string {
      if (duration) {
        return duration.toString();
      }
      return "0:00";
    },
    calcAverageWorktime(): number {
      return averageOfArrayWholeNumber(loadWorktimesForLastSixMonthsIncludingCurrent());
    },
    calcAverageOvertime(): number {
      return averageOfArrayWholeNumber(loadOvertimesForLastSixMonthsIncludingCurrent())
    }
  },
  computed: {
    currentMonthWorktime() {
      return TimeService.calculateWorktimeForTimeRange(startOfMonth(), endOfMonth());
    },
    currentWeekWorktime() {
      return TimeService.calculateWorktimeForTimeRange(startOfWeek(), endOfWeek());
    },
    currentMonthOvertime() {
      return TimeService.calculateOvertimeForTimeRange(startOfMonth(), endOfMonth());
    },
    currentWeekOvertime() {
      return TimeService.calculateOvertimeForTimeRange(startOfWeek(), endOfWeek());
    },
    currentOvertimeComplete() {
      return TimeService.calculateOvertimeComplete();
    },
    currentWorktimeComplete() {
      return TimeService.calculateWorktimeComplete();
    },
    currentMonthIllDays() {
       return TimeService.calculateIllDaysForTimeRange(startOfMonth(), endOfMonth());
    },
    currentMonthVacationDays() {
       return TimeService.calculateVacationDaysForTimeRange(startOfMonth(), endOfMonth());
    },
    currentYearIllDays() {
       return TimeService.calculateIllDaysForTimeRange(startOfYear(), endOfYear());
    },
    currentYearVacationDays() {
       return TimeService.calculateVacationDaysForTimeRange(startOfYear(), endOfYear());
    },
  },
});
</script>