<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md="6">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Arbeitszeit Aktueller Monat</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              Arbeitszeit übersicht des aktuellen Monats
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col size="12" size-md="6">
            <ion-card>
            <ion-card-header>
              <ion-card-title>Arbeitszeit Aktuelle Woche</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              Arbeitszeit übersicht der aktuellen Woche
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
        <ion-row>
        <ion-col size="12" size-md="6">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Überstunden Aktueller Monat</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              Überstunden übersicht des aktuellen Monats
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col size="12" size-md="6">
            <ion-card>
            <ion-card-header>
              <ion-card-title>Überstunden Aktuelle Woche</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              Überstunden übersicht der aktuellen Woche
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Auswertung",
  components: {
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  },
});
</script>