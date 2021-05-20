<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button id="times-new-entry-abort" @click="dismiss()"> Abort </ion-button>
      </ion-buttons>

      <ion-title>{{ title }}</ion-title>

      <ion-buttons slot="end">
        <ion-button id="times-new-entry-save" @click="save()"> Save </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label>Type</ion-label>
        <ion-select id="times-new-entry-type-select" v-model="entry.type">
          <ion-select-option id="times-new-entry-type-select-option-work" :value="EntryType.WORK">Work</ion-select-option>
          <ion-select-option  id="times-new-entry-type-select-option-overtime" :value="EntryType.OVERTIME"
            >Overtime</ion-select-option
          >
          <ion-select-option id="times-new-entry-type-select-option-vacation" :value="EntryType.VACATION"
            >Vacation</ion-select-option
          >
          <ion-select-option id="times-new-entry-type-select-option-illness" :value="EntryType.ILL">Illness</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Work -->
      <ion-item v-if="entry.type === EntryType.WORK">
        <ion-label>Start Time</ion-label>
        <ion-datetime
          id="times-new-entry-work-start"
          display-format="DD.MM.YYYY HH:mm"
          picker-format="DD.MM.YYYY HH:mm"
          :value="entry.start.toString()"
          @ionChange="changeEntryStart"
        ></ion-datetime>
      </ion-item>
      <ion-item v-if="entry.type === EntryType.WORK">
        <ion-label>End Time</ion-label>
        <ion-datetime
          id="times-new-entry-work-end"
          display-format="DD.MM.YYYY HH:mm"
          picker-format="DD.MM.YYYY HH:mm"
          :value="entry.end.toString()"
          @ionChange="changeEntryEnd"
        ></ion-datetime>
      </ion-item>

      <!-- Overtime -->
      <ion-item v-if="entry.type === EntryType.OVERTIME">
        <ion-label>Day</ion-label>
        <ion-datetime
          id="times-new-entry-overtime-day"
          display-format="DD.MM.YYYY"
          picker-format="DD.MM.YYYY"
          :value="entry.start.toString()"
          @ionChange="changeEntryStart"
        ></ion-datetime>
      </ion-item>
      <ion-item v-if="entry.type === EntryType.OVERTIME && !entry.fullDay">
        <ion-label>Overtime amount</ion-label>

        <ion-datetime
          id="times-new-entry-overtime-amount"
          display-format="HH:mm"
          picker-format="HH:mm"
          :value="getOvertimeForPicker()"
          @ionChange="changeOvertime"
        ></ion-datetime>
      </ion-item>
      <ion-item v-if="entry.type === EntryType.OVERTIME">
        <ion-label>Full day?</ion-label>
        <ion-toggle
          v-model="entry.fullDay"
          @ionChange="updateOvertimeForFullDay"
        />
      </ion-item>
      <ion-item v-if="entry.type === EntryType.OVERTIME">
        <ion-segment v-model="overtimeMode">
          <ion-segment-button :value="OvertimeMode.ADD">
            <ion-label>Add</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="OvertimeMode.REMOVE">
            <ion-label>Remove</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-item>

      <!-- Vacation and Ill -->
      <ion-item
        v-if="entry.type === EntryType.VACATION || entry.type === EntryType.ILL"
      >
        <ion-label>Start Time</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY"
          picker-format="DD.MM.YYYY"
          :value="entry.start.toString()"
          @ionChange="changeEntryStart"
        ></ion-datetime>
      </ion-item>
      <ion-item
        v-if="entry.type === EntryType.VACATION || entry.type === EntryType.ILL"
      >
        <ion-label>End Time</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY"
          picker-format="DD.MM.YYYY"
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
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { Day, Duration, Entry, EntryType, OvertimeMode } from "../types";
import { defineComponent, PropType } from "vue";
import TimeService from "@/servies/times.service";

function isSameDate(first: Date, second: Date) {
  return (
    first.toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) ===
    second.toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
}

export default defineComponent({
  name: "TimeAddAndEditModal",
  overtimeMode: OvertimeMode.ADD,
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
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonSegment,
    IonSegmentButton,
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
      overtimeMode: OvertimeMode.ADD,
      EntryType,
      OvertimeMode,
    };
  },
  created() {
    this.entry = this.getEntry();
    this.overtimeMode =
      this.entry.overtime && this.entry.overtime.hours > 0
        ? OvertimeMode.ADD
        : OvertimeMode.REMOVE;
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
        const entry: Entry = JSON.parse(JSON.stringify(this.day.entry));
        entry.start = new Date(entry.start);
        if (entry.end) {
          entry.end = new Date(entry.end);
        } else {
          entry.end = this.getEndDateTime(this.day, entry.pausetime);
        }

        if (entry.worktime) {
          entry.worktime = new Duration(
            entry.worktime.hours,
            entry.worktime.minutes
          );
        }
        if (entry.overtime) {
          entry.overtime = new Duration(
            entry.overtime.hours,
            entry.overtime.minutes
          );
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

      if (
        (this.overtimeMode == OvertimeMode.REMOVE &&
          calculatedEntry.overtime &&
          calculatedEntry.overtime.hours > 0) ||
        (this.overtimeMode == OvertimeMode.ADD &&
          calculatedEntry.overtime &&
          calculatedEntry.overtime.hours < 0)
      ) {
        //Change sign if it don't matches to the mode
        calculatedEntry.overtime.hours = calculatedEntry.overtime.hours * -1;
      }

      //Set worktime to 0 for overtime and vacation
      if (
        this.entry.type == EntryType.OVERTIME ||
        this.entry.type == EntryType.VACATION
      ) {
        this.entry.worktime = new Duration(0, 0);
      }

      //Set overtime for vacation to 0
      if (this.entry.type == EntryType.VACATION) {
        this.entry.overtime = new Duration(0, 0);
      }

      //If not type work set start and end time to 0:00
      if(this.entry.type != EntryType.WORK)
      {
        this.entry.start.setHours(0,0,0,0);

        if(this.entry.end)
        {
          this.entry.end.setHours(0,0,0,0);
        }
      }

      //Save to local storage
      TimeService.saveEntryForDate(this.entry.start, calculatedEntry);

      //Update entry in list
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
    getOvertimeForPicker() {
      const proxyDateForOvertime = new Date();

      if (this.entry.fullDay) {
        this.entry.overtime = new Duration(8, 0);
      }

      const entryOvertime = this.entry.overtime;
      if (entryOvertime) {
        proxyDateForOvertime.setHours(
          entryOvertime.hours < 0
            ? entryOvertime.hours * -1
            : entryOvertime.hours
        );
        proxyDateForOvertime.setMinutes(entryOvertime.minutes);
      } else {
        proxyDateForOvertime.setHours(0);
        proxyDateForOvertime.setMinutes(0);
      }

      return proxyDateForOvertime.toString();
    },
    changeOvertime(event: CustomEvent) {
      const proxyDateForOvertime = new Date(event.detail.value);

      this.entry.overtime = new Duration(
        this.overtimeMode == OvertimeMode.REMOVE
          ? proxyDateForOvertime.getHours() * -1
          : proxyDateForOvertime.getHours(),
        proxyDateForOvertime.getMinutes(),
         this.overtimeMode == OvertimeMode.REMOVE
      );
    },
    updateOvertimeForFullDay() {
      if (this.entry.fullDay && this.entry.overtime) {
        this.entry.overtime.hours =
          this.overtimeMode === OvertimeMode.ADD ? 8 : -8;
        this.entry.overtime.minutes = 0;
      }
    },
  },
  computed: {
    title(): string {
      return this.day
        ? (this.day.entry && isSameDate(this.day.entry.start, this.entry.start)
            ? "Edit"
            : "Add") +
            " " +
            this.entry.start.toLocaleDateString(navigator.language)
        : "";
    },
  },
});
</script>