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
          :value="entry.start.toString()"
          @ionChange="changeEntryStart"
        ></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>End Time</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY HH:mm"
          picker-format="DD.MM.YYYY HH:mm"
          :value="entry.end.toString()"
          @ionChange="changeEntryEnd"
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
  IonItem,
  IonList,
  IonLabel,
  IonDatetime,
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
    IonItem,
    IonList,
    IonLabel,
    IonDatetime,
  },
  props: {
    day: { type: Object as PropType<Day>, default: undefined },
    dismiss: { type: Function },
    saveDayEntry: { type: Function },
  },
  data() {
    return {
      content: "Content",
      entry: (undefined as unknown) as Entry,
    };
  },
  created() {
    this.entry = this.getEntry();
  },
  methods: {
    getStartDateTime(day: Day): Date {
      if (day.entry) {
        return day.entry.start;
      }

      const dayDate = new Date(day.date);
      const current = new Date();

      dayDate.setHours(current.getHours());
      dayDate.setMinutes(current.getMinutes());
      dayDate.setSeconds(current.getSeconds());
      dayDate.setMilliseconds(current.getMilliseconds());

      return dayDate;
    },
    getEndDateTime(day: Day, pausetime?: Duration | undefined): Date {
      if (day.entry && day.entry.end) {
        return day.entry.end;
      }

      return TimeService.calculatePerfectEnd(
        this.getStartDateTime(day),
        pausetime
      );
    },
    getEntry(): Entry {
      if (this.day.entry) {
        //Deep clone to avoid changing dates when not saving
        const entry = JSON.parse(JSON.stringify(this.day.entry));
        if (!entry.end) {
          entry.end = this.getEndDateTime(this.day, entry.pausetime);
        }
        return entry;
      }
      return {
        start: this.getStartDateTime(this.day),
        fullDay: false,
        type: EntryType.WORK,
        end: this.getEndDateTime(this.day),
      };
    },
    save() {
      const calculatedEntry = TimeService.calculateEntry(this.entry);
      TimeService.saveEntryForDate(this.entry.start, calculatedEntry);

      if (this.saveDayEntry) {
        this.saveDayEntry(calculatedEntry);
      }
      if (this.dismiss) {
        this.dismiss();
      }
    },
    changeEntryStart(event: CustomEvent) {
      this.entry.start = new Date(event.detail.value);
      this.entry.end = TimeService.calculatePerfectEnd(
        this.entry.start,
        this.entry.pausetime
      );
    },
    changeEntryEnd(event: CustomEvent) {
      this.entry.end = new Date(event.detail.value);
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
  },
});
</script>