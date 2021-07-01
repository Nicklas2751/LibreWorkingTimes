<template>
  <ion-page>
    <ion-content :fullscreen="true">
        Einstellungen
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
  components: {
    IonPage,
    IonContent
  },
});
</script>