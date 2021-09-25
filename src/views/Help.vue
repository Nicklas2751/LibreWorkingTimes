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
        <ion-button expand="block" href="https://docs.libreworkingtimes.wiegandt.eu" target="_tab">{{ $t("help.userDocs") }}</ion-button>
        <h2>FAQ</h2>
        <ion-text>
            <h3>{{ $t("help.faq.1.question") }}</h3>
            {{ $t("help.faq.1.answer") }}
        </ion-text>
        <ion-text>
            <h3>{{ $t("help.faq.2.question") }}</h3>
            {{ $t("help.faq.2.answer") }}
        </ion-text>
        <ion-text>
            <h3>{{ $t("help.faq.3.question") }}</h3>
            {{ $t("help.faq.3.answer") }}
        </ion-text>

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