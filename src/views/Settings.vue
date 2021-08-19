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
      <ion-item>
        <ion-label position="floating">Bezeichnung</ion-label>
        <ion-input id="settings-description" v-model="description" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Tägliche Arbeitszeit</ion-label>
        <ion-datetime id="settings-dailyWorktime" display-format="HH:mm" picker-format="HH:mm" v-model="workTime"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Typische Pausendauer</ion-label>
        <ion-datetime id="settings-breakTime" display-format="HH:mm" picker-format="HH:mm" v-model="breakTime"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Arbeitstage</ion-label>
        <ion-select id="settings-worktimes" multiple="true" cancel-text="Abbrechen" ok-text="Ok"  v-model="workDays" required>
          <ion-select-option v-bind:key="workDay.day" v-for="workDay in allWorkDays" :value="workDay">{{ workDay.name }}</ion-select-option>
      </ion-select>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import SettingsService from "@/servies/settings.service";
import { Duration, WorkDay, WORK_DAYS } from "@/types";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import { defineComponent } from "vue";

function durationToFakeDate(duration: Duration): Date {
  return new Date(0, 0, 0, duration.isNegative ? duration.hours * -1 : duration.hours, duration.minutes);
}

function fakeDateToDuration(date: Date): Duration {
  return new Duration(date.getHours(),date.getMinutes(), date.getHours() < 0 || date.getMinutes() < 0);
}

export default defineComponent({
  name: "Einstellungen",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonSelect,
    IonSelectOption
  },
  data() {
    return { 
      allWorkDays: WORK_DAYS,
      description: SettingsService.description,
      workTime: durationToFakeDate(SettingsService.worktime.value).toISOString(),
      breakTime: durationToFakeDate(SettingsService.breaktime.value).toISOString(),
      workDays: SettingsService.workdays
    }
  },
  watch: {
    description: function (newVal: string) {
      SettingsService.setDescription(newVal);
    },
    workTime: function (newVal: string) {
      SettingsService.setWorkTime(fakeDateToDuration(new Date(newVal)));
    },
    breakTime: function (newVal: string) {
      SettingsService.setBreakTime(fakeDateToDuration(new Date(newVal)));
    },
    workDays: function (newVal: WorkDay[]) {
      SettingsService.setWorkDays(newVal);
    },
  },
});
</script>