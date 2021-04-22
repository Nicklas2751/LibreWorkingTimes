<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-grid>
          <ion-row>
            <ion-col class="ion-align-self-center" size="6">
              <span class="bold">Überstunden:</span> {{ calcOvertime() }}
            </ion-col>
            <ion-col class="ion-align-self-center" size="6">
              <span class="bold">Heute:</span> {{ calcToday() }}
            </ion-col>
          </ion-row>
        </ion-grid>
        
      </ion-toolbar>
    </ion-header>
    
  <ion-content :fullscreen="true">
    <!--  
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-grid>
          <ion-row>
            <ion-col class="ion-align-self-center" size="6">
              Überstunden: 
            </ion-col>
            <ion-col class="ion-align-self-center" size="6">
              Heute: 
            </ion-col>
          </ion-row>
        </ion-grid>
        </ion-toolbar>
      </ion-header> -->
      <ion-list>
        <ion-item-group v-bind:key="month.name" v-for="month in loadMonths()">
          <ion-item-divider color="light" sticky>{{month.name}} {{month.year}}</ion-item-divider>
          <ion-item v-for="day in month.days" v-bind:key="day.date">
            <ion-label>{{day.weekday}} {{day.date}}</ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonHeader, IonMenuButton, IonPage, IonToolbar, IonGrid, IonRow, IonCol, IonContent, IonList, IonItem } from '@ionic/vue';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

function daysInMonth (month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

interface Month {
  name: string;
  year: number;
  days: Record<string, any>[];
}

export default {
  name: 'Zeiten',
  components: {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonToolbar,
    IonGrid, IonRow, IonCol, IonContent, IonList, IonItem
  },
  data() {
    return {
      title: 'Zeiten'
    }
  },
  methods: {
    calcOvertime() {
      return 0;
    },
    calcToday() {
      return 0;
    },
    loadMonths(): Month[] {
      const months: Month[] = [];

      for(let monthModifier = 0; monthModifier < 12; monthModifier++)
      {
        const baseDate = new Date();
        baseDate.setMonth(new Date().getMonth()-monthModifier)
        const month = baseDate.getMonth();
        const year = baseDate.getFullYear();
        const currentMonth: Month = 
        {
          name: monthNames[month],
          year: baseDate.getFullYear(),
          days: []
        };
        for(let day = 1; day < daysInMonth(month, year); day++)
        {
          const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long', day: 'numeric' };
          const newDay =  {
              weekday: new Date(year,month, day).toLocaleDateString('de-DE', options),
              date: ""
            };

          currentMonth.days.push(newDay);
        }
        months.push(currentMonth);
      }

      return months;
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>