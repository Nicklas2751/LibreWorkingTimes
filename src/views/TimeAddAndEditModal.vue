<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="dismiss()"> Abort </ion-button>
      </ion-buttons>

      <ion-title>{{ title }}</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="save()"> Save </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label>Start Time</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY HH:mm"
          picker-format="DD.MM.YYYY HH:mm"
          :value="getStartDateTime(day).toString()"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>End Time</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY HH:mm"
          picker-format="DD.MM.YYYY HH:mm"
          :value="getEndDateTime(day).toString()"
        ></ion-datetime>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { Day, Duration, Entry, EntryType } from "../types";
import { defineComponent, PropType } from "vue";
import TimeService from "@/servies/times.service";

export default defineComponent({
  name: "Modal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
  },
  props: {
    day: { type: Object as PropType<Day>, default: undefined },
    dismiss: { type: Function },
  },
  data() {
    return {
      content: "Content",
    };
  },
  methods: {
    getStartDateTime(day: Day): Date {
      if (day.entry) {
        return day.entry.start;
      }

      const dayDate = new Date(day.date);
      dayDate.setTime(new Date().getTime());
      return dayDate;
    },
    getEndDateTime(day: Day, pausetime?: Duration | undefined): Date {
      if (day.entry && day.entry.end) {
        return day.entry.end;
      }
      return TimeService.calculatePerfectEnd(this.getStartDateTime(day));
    },
  },
  computed: {
    title(): string {
      return this.day
        ? (this.day.entry ? "Edit" : "Add") +
            " " +
            this.day.date.toLocaleDateString(navigator.language)
        : "";
    },
    entry(): Entry {
      if (this.day.entry) {
        if (!this.day.entry.end) {
            this.day.entry.end = this.getEndDateTime(
            this.day,
            this.day.entry.pausetime
          );
        }
        return this.day.entry;
      }

      return {
        start: this.getStartDateTime(this.day),
        fullDay: false,
        type: EntryType.WORK,
        end: this.getEndDateTime(this.day),
      };
    },
  },
});
</script>