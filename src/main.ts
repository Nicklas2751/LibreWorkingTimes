import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './registerServiceWorker';

import { IonicVue } from '@ionic/vue';
import { createI18n } from 'vue-i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

let locale: string = navigator.language;
const localeSplitted = navigator.language.split("-");
if(localeSplitted.length > 0)
{
  locale = localeSplitted[0];
}

const messages = {
  en: {
      appTitle: "LibreWorkingTimes",
      cancel: "Cancel",
      abort: "Abort",
      save: "Save",
      pages: {
        times: "Times",
        evaluation: "Evaluation",
        settings: "Settings",
        about: "About",
        help: "Help"
      },
      times: {
          overtimeLabel: "Overtime",
          todayLabel: "Today",
          deleteButton: "Delete",
          loadingData: "Loading more data...",
          quickActions: {
            header: "Quick actions",
            stopWork: "Stop work",
            startWork: "Start work",
            newEntry: "New entry"
          },
          modal: {
            type: "Type",
            types: {
              work: "Work",
              overtime: "Overtime",
              vacation: "Vacation",
              illness: "Illness"
            },
            startTime: "Start time",
            endTime: "End time",
            day: "Day",
            overtimeAmount: "Overtime amount",
            fullDay: "Full day?",
            add: "Add",
            edit: "Edit",
            remove: "Remove"
          }
      },
      settings: {
        description: "Designation",
        dailyWorktime: "Daily working time",
        breakTime: "Typical break duration",
        worktimes: "Working days",
        cancel: "Cancel",
        ok: "Ok",
        days: {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday"
        }
      },
      evaluation: {
        overtime: "Overtime",
        workingtime: "Working time",
        overtimeCurrentWeek: "Overtime current week",
        worktimeCurrentWeek: "Working time current week",
        overtimeCurrentMonth: "Overtime current month",
        worktimeCurrentMonth: "Working time current month",
        illDaysCurrentMonth: "Sick days current month",
        vacationDaysCurrentMonth: "Vacation days current month",
        illDaysCurrentYear: "Sick days current year",
        vacationDaysCurrentYear: "Vacation days current year",
        worktimeComplete: "Total working time",
        overtimeComplete: "Total overtime",
        workingHoursAndOvertimeDevelopment: "Working hours and overtime development",
        average: "Average",
        averageWorktimeHoursPerMonth: "Working hours: {averageWorktime} hours per month",
        averageOvertimeHoursPerMonth: "Overtime: {averageOvertime} hours in month"
      },
      about: {
        textFirstHalf: "LibreWorkingTimes is a ",
        textSecondHalf: " progressive web app (PWA) to easily mange working times, overtime, sick days and holidays for free.",
        license: "License",
        legal: "Legal",
        privacy: "Privacy"
      },
      help: {
        userDocs: "User documentation",
        faq: {
          1: {
            question: "Q: Where is my data safed?",
            answer: "A: All data is safed on your device."
          },
          2: {
            question: "Q: Where is my data?",
            answer: "A: Your data is safed in the used webbrowser on your device. If you can't see your data, make sure you use the right device and the right webbrowser."
          },
          3: {
            question: "Q: How can I synchronise/export my data?",
            answer: "A: This feature is planned but not implemented yet."
          }
        }
      }
  },
  de: {
      appTitle: "LibreWorkingTimes",
      cancel: "Abbrechen",
      abort: "Abbrechen",
      save: "Speichern",
      pages: {
        times: "Zeiten",
        evaluation: "Auswertung",
        settings: "Einstellungen",
        about: "??ber",
        help: "Hilfe"
      },
      times: {
          overtimeLabel: "??berstunden",
          todayLabel: "Heute",
          deleteButton: "L??schen",
          loadingData: "Lade ...",
          quickActions: {
            header: "Schnelle Aktionen",
            stopWork: "Arbeit beenden",
            startWork: "Arbeit beginnen",
            newEntry: "Neuer Eintrag"
          },
          modal: {
            type: "Typ",
            types: {
              work: "Arbeit",
              overtime: "??berstunden",
              vacation: "Urlaub",
              illness: "Krankheit"
            },
            startTime: "Startzeitpunkt",
            endTime: "Endzeitpunkt",
            day: "Tag",
            overtimeAmount: "??berstundenmenge",
            fullDay: "Ganzt??gig?",
            add: "Hinzuf??gen",
            edit: "??ndern",
            remove: "Entfernen"
          }
      },
      settings: {
        description: "Bezeichnung",
        dailyWorktime: "T??gliche Arbeitszeit",
        breakTime: "Typische Pausendauer",
        worktimes: "Arbeitstage",
        cancel: "Abbrechen",
        ok: "Ok",
        days: {
          monday: "Montag",
          tuesday: "Dienstag",
          wednesday: "Mittwoch",
          thursday: "Donnerstag",
          friday: "Freitag",
          saturday: "Samstag",
          sunday: "Sonntag"
        }
      },
      evaluation: {
        overtime: "??berstunden",
        workingtime: "Arbeitszeit",
        overtimeCurrentWeek: "??berstunden aktuelle Woche",
        worktimeCurrentWeek: "Arbeitszeit aktuelle Woche",
        overtimeCurrentMonth: "??berstunden aktueller Monat",
        worktimeCurrentMonth: "Arbeitszeit aktueller Monat",
        illDaysCurrentMonth: "Krankheitstage aktueller Monat",
        vacationDaysCurrentMonth: "Urlaubstage aktueller Monat",
        illDaysCurrentYear: "Krankheitstage aktuelles Jahr",
        vacationDaysCurrentYear: "Urlaubstage aktuelles Jahr",
        worktimeComplete: "Arbeitszeit Insgesamt",
        overtimeComplete: "??berstunden Insgesamt",
        workingHoursAndOvertimeDevelopment: "Arbeitszeiten und ??berstunden Entwicklung",
        average: "Durchschnitt",
        averageWorktimeHoursPerMonth: "Arbeitszeit: {averageWorktime} Stunden im Monat",
        averageOvertimeHoursPerMonth: "??berstunden: {averageOvertime} Stunden im Monat"
      },
      about: {
        textFirstHalf: "LibreWorkingTimes ist eine ",
        textSecondHalf: " progressive web app (PWA) zum einfachen, kostenlosen Verwalten von Arbeitszeiten, ??berstunden, Krankheitstagen und Urlaubstagen.",
        license: "Lizenz",
        legal: "Impressum",
        privacy: "Datenschutzerkl??rung"
      },
      help: {
        userDocs: "Benutzerdokumentation",
        faq: {
          1: {
            question: "F: Wo werden meine Daten gespeichert?",
            answer: "A: Alle Daten werden direkt auf deinem Ger??t gespeichert."
          },
          2: {
            question: "F: Wo sind meine Daten?",
            answer: "A: Deine Daten werden direkt in den von dir verwendeten Webbrowser auf deinem Ger??t gespeichert. Wenn du deine Daten nicht sehen kannst gehe sicher, dass du das richtige Ger??t und den richtigen Webbrowser verwendest."
          },
          3: {
            question: "F: Wie kann ich meine Daten synchronisieren/exportieren?",
            answer: "A: Dieses Feature ist geplant aber wurde bisher noch nicht umgesetzt."
          }
        }
      }
  }
}
const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
  .use(IonicVue)
  .use(i18n)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});