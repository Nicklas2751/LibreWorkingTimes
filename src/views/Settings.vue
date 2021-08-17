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
        <ion-label position="floating">Benutzername</ion-label>
        <ion-input id="settings-username" :value="username" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Bezeichnung</ion-label>
        <ion-input id="settings-description" :value="description" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Tägliche Arbeitszeit</ion-label>
        <ion-datetime id="settings-dailyWorktime" display-format="HH:mm" picker-format="HH:mm" :value="dailyWorktime"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Typische Pausendauer</ion-label>
        <ion-datetime id="settings-breakTime" display-format="HH:mm" picker-format="HH:mm" :value="breakTime"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Arbeitstage</ion-label>
        <ion-select multiple="true" cancel-text="Abbrechen" ok-text="Ok" :value="workDays" required>
          <ion-select-option v-bind:key="dayName" v-for="dayName in ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']" :value="dayName.toLowerCase()">{{ dayName }}</ion-select-option>
      </ion-select>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Einstellungen",
  username: "John Doe",
  description: "John Doe @ Example Corp",
  dailyWorktime: new Date( 0, 0, 0, 8, 0),
  breakTime: new Date( 0, 0, 0, 0, 30),
  workDays: ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'],
  components: {
    IonPage,
    IonContent
  },
});
</script>