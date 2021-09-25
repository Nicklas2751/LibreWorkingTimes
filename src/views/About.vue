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
        <br/>
        <ion-text style="text-align: justify">
        {{ $t("about.textFirstHalf") }}<a href="https://github.com/nicklas2751/libreworkingtimes/" target="_tab">open source</a>{{ $t("about.textSecondHalf") }}
        </ion-text>
        <br/>
        <ion-button expand="block" href="https://github.com/nicklas2751/libreworkingtimes/tree/main/LICENSE" target="_tab">{{ $t("about.license") }}</ion-button>
        <ion-button expand="block" href="https://libreworkingtimes.wiegandt.eu/impressum" target="_tab">{{ $t("about.legal") }}</ion-button>
        <ion-button expand="block" href="https://libreworkingtimes.wiegandt.eu/datenschutzerklaerung" target="_tab">{{ $t("about.privacy") }}</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton
  },
  setup() {
    

  return { };
  }
});
</script>