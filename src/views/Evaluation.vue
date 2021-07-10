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
                <ion-card-title>Überstunden Aktuelle Woche</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentWeekOvertime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Arbeitszeit Aktuelle Woche</ion-card-title>
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
                <ion-card-title>Arbeitszeit Aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentMonthWorktime) }}
              </ion-card-content>
            </ion-card>
          </ion-col>
                    <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Überstunden Aktueller Monat</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ formatDuration(currentMonthOvertime) }}
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
import { defineComponent } from "vue";
import moment from "moment";
import { Duration } from "@/types";

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
  },
  methods: {
    formatDuration(duration: Duration | undefined): string {
      if (duration) {
        return duration.toString();
      }
      return "0:00";
    },
  },
  computed: {
    currentMonthWorktime() {
      const monthStart = moment().startOf("month").toDate();
      const monthEnd = moment().endOf("month").toDate();
      //Clear time
      monthStart.setHours(0, 0, 0, 0);
      monthEnd.setHours(0, 0, 0, 0);

      return TimeService.calculateWorktimeForTimeRange(monthStart, monthEnd);
    },
    currentWeekWorktime() {
      const weekStart = moment().startOf("week").toDate();
      const weekEnd = moment().endOf("week").toDate();
      //Clear time
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(0, 0, 0, 0);

      return TimeService.calculateWorktimeForTimeRange(weekStart, weekEnd);
    },
    currentMonthOvertime() {
      const monthStart = moment().startOf("month").toDate();
      const monthEnd = moment().endOf("month").toDate();
      //Clear time
      monthStart.setHours(0, 0, 0, 0);
      monthEnd.setHours(0, 0, 0, 0);

      return TimeService.calculateOvertimeForTimeRange(monthStart, monthEnd);
    },
    currentWeekOvertime() {
      const weekStart = moment().startOf("week").toDate();
      const weekEnd = moment().endOf("week").toDate();
      //Clear time
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(0, 0, 0, 0);

      return TimeService.calculateOvertimeForTimeRange(weekStart, weekEnd);
    },
    currentOvertimeComplete() {
      return TimeService.calculateOvertimeComplete();
    },
    currentWorktimeComplete() {
      return TimeService.calculateWorktimeComplete();
    },
  },
});
</script>