(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-421a6add"],{"2ca0":function(t,e,n){"use strict";var r=n("23e7"),o=n("06cf").f,a=n("50c4"),i=n("5a34"),c=n("1d80"),u=n("ab13"),l=n("c430"),s="".startsWith,d=Math.min,f=u("startsWith"),m=!l&&!f&&!!function(){var t=o(String.prototype,"startsWith");return t&&!t.writable}();r({target:"String",proto:!0,forced:!m&&!f},{startsWith:function(t){var e=String(c(this));i(t);var n=a(d(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return s?s.call(e,r,n):e.slice(n,n+r.length)===r}})},"4de4":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").filter,a=n("1dde"),i=a("filter");r({target:"Array",proto:!0,forced:!i},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"53a9":function(t,e,n){"use strict";n("8b07")},"5db7":function(t,e,n){"use strict";var r=n("23e7"),o=n("a2bf"),a=n("7b0b"),i=n("50c4"),c=n("1c0b"),u=n("65f0");r({target:"Array",proto:!0},{flatMap:function(t){var e,n=a(this),r=i(n.length);return c(t),e=u(n,0),e.length=o(e,n,n,r,0,1,t,arguments.length>1?arguments[1]:void 0),e}})},"73d9":function(t,e,n){var r=n("44d2");r("flatMap")},"7db0":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").find,a=n("44d2"),i="find",c=!0;i in[]&&Array(1)[i]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),a(i)},"7dc7":function(t,e,n){"use strict";n.r(e);n("b0c0"),n("d3b7"),n("25f0");var r=n("7a23"),o=Object(r["withScopeId"])("data-v-52da0c2e");Object(r["pushScopeId"])("data-v-52da0c2e");var a={class:"bold"},i={class:"bold"},c=Object(r["createVNode"])("br",null,null,-1),u={id:"times-item-day-weekday"},l={id:"times-item-day-day",class:"bigger"},s=Object(r["createVNode"])("br",null,null,-1);Object(r["popScopeId"])();var d=o((function(t,e,n,d,f,m){var y=Object(r["resolveComponent"])("ion-menu-button"),h=Object(r["resolveComponent"])("ion-buttons"),b=Object(r["resolveComponent"])("ion-col"),p=Object(r["resolveComponent"])("ion-text"),g=Object(r["resolveComponent"])("ion-row"),O=Object(r["resolveComponent"])("ion-grid"),v=Object(r["resolveComponent"])("ion-toolbar"),j=Object(r["resolveComponent"])("ion-header"),w=Object(r["resolveComponent"])("ion-item-divider"),D=Object(r["resolveComponent"])("ion-label"),C=Object(r["resolveComponent"])("ion-item"),V=Object(r["resolveComponent"])("ion-item-option"),N=Object(r["resolveComponent"])("ion-item-options"),E=Object(r["resolveComponent"])("ion-item-sliding"),k=Object(r["resolveComponent"])("ion-item-group"),x=Object(r["resolveComponent"])("ion-list"),S=Object(r["resolveComponent"])("ion-infinite-scroll-content"),I=Object(r["resolveComponent"])("ion-infinite-scroll"),T=Object(r["resolveComponent"])("ion-content"),M=Object(r["resolveComponent"])("ion-icon"),_=Object(r["resolveComponent"])("ion-fab-button"),L=Object(r["resolveComponent"])("ion-fab"),F=Object(r["resolveComponent"])("ion-page");return Object(r["openBlock"])(),Object(r["createBlock"])(F,null,{default:o((function(){return[Object(r["createVNode"])(j,{translucent:!0},{default:o((function(){return[Object(r["createVNode"])(v,null,{default:o((function(){return[Object(r["createVNode"])(h,{slot:"start"},{default:o((function(){return[Object(r["createVNode"])(y,{color:"primary"})]})),_:1}),Object(r["createVNode"])(O,null,{default:o((function(){return[Object(r["createVNode"])(g,null,{default:o((function(){return[Object(r["createVNode"])(b,{id:"complete-overtime",class:"ion-align-self-center",size:"6"},{default:o((function(){return[Object(r["createVNode"])("span",a,Object(r["toDisplayString"])(t.$t("times.overtimeLabel"))+":",1),Object(r["createTextVNode"])(" "+Object(r["toDisplayString"])(t.completeOvertime),1)]})),_:1}),Object(r["createVNode"])(b,{class:"ion-align-self-center",size:"3"},{default:o((function(){return[Object(r["createVNode"])("span",i,Object(r["toDisplayString"])(t.$t("times.todayLabel"))+":",1)]})),_:1}),Object(r["createVNode"])(b,{id:"today-stats",class:"ion-align-self-center",size:"3"},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.formatDuration(t.current.worktime)),1),c,Object(r["createVNode"])(p,{id:"today-overtime",color:t.switchOvertimeColor(t.current.overtime)},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.formatDuration(t.current.overtime)),1)]})),_:1},8,["color"])]})),_:1})]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(T,{fullscreen:!0},{default:o((function(){return[Object(r["createVNode"])(x,{id:"times-list",ref:"entryList"},{default:o((function(){return[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(t.months,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(k,{key:e.name},{default:o((function(){return[Object(r["createVNode"])(w,{id:"times-divider-"+e.name.toLowerCase()+"-"+e.year,color:"primary",sticky:""},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.name)+" "+Object(r["toDisplayString"])(e.year),1)]})),_:2},1032,["id"]),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(e.days,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(E,{key:e.day},{default:o((function(){return[Object(r["createVNode"])(C,{id:t.formatDateForId(e.date),onClick:function(n){return t.openAddEditModal(e)}},{default:o((function(){return[Object(r["createVNode"])(O,null,{default:o((function(){return[Object(r["createVNode"])(g,null,{default:o((function(){return[Object(r["createVNode"])(b,{size:"4"},{default:o((function(){return[Object(r["createVNode"])(D,{color:t.switchLabelColor(e)},{default:o((function(){return[Object(r["createVNode"])("div",u,Object(r["toDisplayString"])(e.weekday)+".",1),Object(r["createVNode"])("div",l,Object(r["toDisplayString"])(e.day),1)]})),_:2},1032,["color"])]})),_:2},1024),t.getDayEntry(e)?(Object(r["openBlock"])(),Object(r["createBlock"])(b,{key:0,size:"4"},{default:o((function(){return[t.isWork(t.getDayEntry(e).type)?(Object(r["openBlock"])(),Object(r["createBlock"])(p,{key:0,id:"times-item-start-end-time"},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.formatTime(t.getDayEntry(e).start))+" - "+Object(r["toDisplayString"])(t.formatTime(t.getDayEntry(e).end)),1)]})),_:2},1024)):Object(r["createCommentVNode"])("",!0)]})),_:2},1024)):Object(r["createCommentVNode"])("",!0),t.getDayEntry(e)?(Object(r["openBlock"])(),Object(r["createBlock"])(b,{key:1,id:"times-item-stats",size:"4",class:"ion-text-end"},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.formatDuration(t.getDayEntry(e).worktime)),1),s,Object(r["createVNode"])(p,{id:"times-item-overtime",color:t.switchOvertimeColor(t.getDayEntry(e).overtime)},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.getDayEntry(e).overtime.toString()),1)]})),_:2},1032,["color"])]})),_:2},1024)):Object(r["createCommentVNode"])("",!0)]})),_:2},1024)]})),_:2},1024)]})),_:2},1032,["id","onClick"]),Object(r["createVNode"])(N,{side:"end"},{default:o((function(){return[e.entry?(Object(r["openBlock"])(),Object(r["createBlock"])(V,{key:0,id:"times-item-delete-button","ion-item-option":"",color:"danger",expandable:"",onClick:function(n){return t.deleteEntryForDay(e)}},{default:o((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.deleteButton")),1)]})),_:2},1032,["onClick"])):Object(r["createCommentVNode"])("",!0)]})),_:2},1024)]})),_:2},1024)})),128))]})),_:2},1024)})),128))]})),_:1},512),Object(r["createVNode"])(I,{onIonInfinite:e[1]||(e[1]=function(e){return t.loadData(e)}),threshold:"100px",id:"infinite-scroll"},{default:o((function(){return[Object(r["createVNode"])(S,{"loading-spinner":"bubbles","loading-text":t.$t("times.loadingData")},null,8,["loading-text"])]})),_:1})]})),_:1}),Object(r["createVNode"])(L,{vertical:"bottom",horizontal:"end",slot:"fixed"},{default:o((function(){return[Object(r["createVNode"])(_,{id:"times-quick-add-button",onClick:e[2]||(e[2]=function(e){return t.presentQuickActionsSheet()})},{default:o((function(){return[Object(r["createVNode"])(M,{ios:t.addOutline,md:t.add},null,8,["ios","md"])]})),_:1})]})),_:1})]})),_:1})}));function f(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,o)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){f(a,r,o,i,c,"next",t)}function c(t){f(a,r,o,i,c,"throw",t)}i(void 0)}))}}n("96cf"),n("2ca0"),n("c740"),n("7db0"),n("5db7"),n("73d9"),n("4de4");var y=n("d867"),h=n("a76d"),b=n("0656");function p(t,e,n,o,a,i){var c=Object(r["resolveComponent"])("ion-button"),u=Object(r["resolveComponent"])("ion-buttons"),l=Object(r["resolveComponent"])("ion-title"),s=Object(r["resolveComponent"])("ion-toolbar"),d=Object(r["resolveComponent"])("ion-header"),f=Object(r["resolveComponent"])("ion-label"),m=Object(r["resolveComponent"])("ion-select-option"),y=Object(r["resolveComponent"])("ion-select"),h=Object(r["resolveComponent"])("ion-item"),b=Object(r["resolveComponent"])("ion-datetime"),p=Object(r["resolveComponent"])("ion-toggle"),g=Object(r["resolveComponent"])("ion-segment-button"),O=Object(r["resolveComponent"])("ion-segment"),v=Object(r["resolveComponent"])("ion-list"),j=Object(r["resolveComponent"])("ion-content");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["createVNode"])(d,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(u,{slot:"start"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(c,{id:"times-new-entry-abort",onClick:e[1]||(e[1]=function(e){return t.dismiss()})},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("abort")),1)]})),_:1})]})),_:1}),Object(r["createVNode"])(l,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.title),1)]})),_:1}),Object(r["createVNode"])(u,{slot:"end"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(c,{id:"times-new-entry-save",onClick:e[2]||(e[2]=function(e){return t.save()})},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("save")),1)]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(j,{class:"ion-padding"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(v,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(h,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.type")),1)]})),_:1}),Object(r["createVNode"])(y,{id:"times-new-entry-type-select",modelValue:t.entry.type,"onUpdate:modelValue":e[3]||(e[3]=function(e){return t.entry.type=e})},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{id:"times-new-entry-type-select-option-work",value:t.EntryType.WORK},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.types.work")),1)]})),_:1},8,["value"]),Object(r["createVNode"])(m,{id:"times-new-entry-type-select-option-overtime",value:t.EntryType.OVERTIME},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.types.overtime")),1)]})),_:1},8,["value"]),Object(r["createVNode"])(m,{id:"times-new-entry-type-select-option-vacation",value:t.EntryType.VACATION},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.types.vacation")),1)]})),_:1},8,["value"]),Object(r["createVNode"])(m,{id:"times-new-entry-type-select-option-illness",value:t.EntryType.ILL},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.types.illness")),1)]})),_:1},8,["value"])]})),_:1},8,["modelValue"])]})),_:1}),t.entry.type===t.EntryType.WORK?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:0},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.startTime")),1)]})),_:1}),Object(r["createVNode"])(b,{id:"times-new-entry-work-start","display-format":"DD.MM.YYYY HH:mm","picker-format":"DD.MM.YYYY HH:mm",value:t.entry.start.toString(),onIonChange:t.changeEntryStart},null,8,["value","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type===t.EntryType.WORK?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:1},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.endTime")),1)]})),_:1}),Object(r["createVNode"])(b,{id:"times-new-entry-work-end","display-format":"DD.MM.YYYY HH:mm","picker-format":"DD.MM.YYYY HH:mm",value:t.entry.end.toString(),onIonChange:t.changeEntryEnd},null,8,["value","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type===t.EntryType.OVERTIME?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:2},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.day")),1)]})),_:1}),Object(r["createVNode"])(b,{id:"times-new-entry-overtime-day","display-format":"DD.MM.YYYY","picker-format":"DD.MM.YYYY",value:t.entry.start.toString(),onIonChange:t.changeEntryStart},null,8,["value","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type!==t.EntryType.OVERTIME||t.entry.fullDay?Object(r["createCommentVNode"])("",!0):(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:3},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.overtimeAmount")),1)]})),_:1}),Object(r["createVNode"])(b,{id:"times-new-entry-overtime-amount","display-format":"HH:mm","picker-format":"HH:mm",value:t.getOvertimeForPicker(),onIonChange:t.changeOvertime},null,8,["value","onIonChange"])]})),_:1})),t.entry.type===t.EntryType.OVERTIME?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:4},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.fullDay")),1)]})),_:1}),Object(r["createVNode"])(p,{modelValue:t.entry.fullDay,"onUpdate:modelValue":e[4]||(e[4]=function(e){return t.entry.fullDay=e}),onIonChange:t.updateOvertimeForFullDay},null,8,["modelValue","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type===t.EntryType.OVERTIME?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:5},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(O,{modelValue:t.overtimeMode,"onUpdate:modelValue":e[5]||(e[5]=function(e){return t.overtimeMode=e})},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(g,{value:t.OvertimeMode.ADD},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.add")),1)]})),_:1})]})),_:1},8,["value"]),Object(r["createVNode"])(g,{value:t.OvertimeMode.REMOVE},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.remove")),1)]})),_:1})]})),_:1},8,["value"])]})),_:1},8,["modelValue"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type===t.EntryType.VACATION||t.entry.type===t.EntryType.ILL?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:6},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.startTime")),1)]})),_:1}),Object(r["createVNode"])(b,{"display-format":"DD.MM.YYYY","picker-format":"DD.MM.YYYY",value:t.entry.start.toString(),onIonChange:t.changeEntryStart},null,8,["value","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0),t.entry.type===t.EntryType.VACATION||t.entry.type===t.EntryType.ILL?(Object(r["openBlock"])(),Object(r["createBlock"])(h,{key:7},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(t.$t("times.modal.endTime")),1)]})),_:1}),Object(r["createVNode"])(b,{"display-format":"DD.MM.YYYY","picker-format":"DD.MM.YYYY",value:t.entry.end.toString(),onIonChange:t.changeEntryEnd},null,8,["value","onIonChange"])]})),_:1})):Object(r["createCommentVNode"])("",!0)]})),_:1})]})),_:1})],64)}function g(t,e){return t.toLocaleTimeString(navigator.language,{day:"2-digit",month:"2-digit",year:"numeric"})===e.toLocaleTimeString(navigator.language,{day:"2-digit",month:"2-digit",year:"numeric"})}var O=Object(r["defineComponent"])({name:"TimeAddAndEditModal",entryEndChangedOrLoaded:!1,overtimeMode:h["c"].ADD,components:{IonContent:y["i"],IonHeader:y["n"],IonTitle:y["O"],IonToolbar:y["Q"],IonButton:y["b"],IonButtons:y["c"],IonItem:y["s"],IonList:y["z"],IonLabel:y["y"],IonDatetime:y["j"],IonSelect:y["K"],IonSelectOption:y["L"],IonToggle:y["P"],IonSegment:y["I"],IonSegmentButton:y["J"]},props:{day:{type:Object,default:void 0},dismiss:{type:Function},saveDayEntry:{type:Function}},data:function(){return{entry:void 0,overtimeMode:h["c"].ADD,entryEndChangedOrLoaded:!1,EntryType:h["b"],OvertimeMode:h["c"]}},created:function(){this.entry=this.getEntry(),this.overtimeMode=this.entry.overtime&&this.entry.overtime.hours>0?h["c"].ADD:h["c"].REMOVE},methods:{getStartDateTime:function(t){if(t.entry)return t.entry.start;var e=new Date(t.date),n=new Date;return e.setHours(n.getHours()),e.setMinutes(n.getMinutes()),e.setSeconds(n.getSeconds()),e.setMilliseconds(n.getMilliseconds()),e},getEndDateTime:function(t,e){return t.entry&&t.entry.end?t.entry.end:b["a"].calculatePerfectEnd(this.getStartDateTime(t),e)},getEntry:function(){if(this.day.entry){var t=JSON.parse(JSON.stringify(this.day.entry));return t.start=new Date(t.start),t.end?(this.entryEndChangedOrLoaded=!0,t.end=new Date(t.end)):t.end=this.getEndDateTime(this.day,t.pausetime),t.worktime&&(t.worktime=new h["a"](t.worktime.hours,t.worktime.minutes)),t.overtime&&(t.overtime=new h["a"](t.overtime.hours,t.overtime.minutes)),t}return{start:this.getStartDateTime(this.day),fullDay:!1,type:h["b"].WORK,end:this.getEndDateTime(this.day)}},save:function(){var t=b["a"].calculateEntry(this.entry);this.entry.type==h["b"].OVERTIME&&(this.overtimeMode==h["c"].REMOVE&&t.overtime&&t.overtime.hours>0||this.overtimeMode==h["c"].ADD&&t.overtime&&t.overtime.hours<0)&&(t.overtime.hours=-1*t.overtime.hours),this.entry.type!=h["b"].OVERTIME&&this.entry.type!=h["b"].VACATION||(t.worktime=new h["a"](0,0)),this.entry.type==h["b"].VACATION&&(t.overtime=new h["a"](0,0)),this.entry.type!=h["b"].WORK&&(t.start.setHours(0,0,0,0),t.end&&t.end.setHours(0,0,0,0)),b["a"].saveEntryForDate(t.start,t),this.saveDayEntry&&this.saveDayEntry(t),this.dismiss&&this.dismiss()},changeEntryStart:function(t){this.entry.start=new Date(t.detail.value),this.entryEndChangedOrLoaded||(this.entry.end=b["a"].calculatePerfectEnd(this.entry.start,this.entry.pausetime),this.entryEndChangedOrLoaded=!1)},changeEntryEnd:function(t){this.entryEndChangedOrLoaded=!0,this.entry.end=new Date(t.detail.value)},getOvertimeForPicker:function(){var t=new Date;this.entry.fullDay&&(this.entry.overtime=new h["a"](8,0));var e=this.entry.overtime;return e?(t.setHours(e.hours<0?-1*e.hours:e.hours),t.setMinutes(e.minutes)):(t.setHours(0),t.setMinutes(0)),t.toString()},changeOvertime:function(t){var e=new Date(t.detail.value);this.entry.overtime=new h["a"](this.overtimeMode==h["c"].REMOVE?-1*e.getHours():e.getHours(),e.getMinutes(),this.overtimeMode==h["c"].REMOVE)},updateOvertimeForFullDay:function(){this.entry.fullDay&&this.entry.overtime&&(this.entry.overtime.hours=this.overtimeMode===h["c"].ADD?8:-8,this.entry.overtime.minutes=0)}},computed:{title:function(){return this.day?(this.day.entry&&g(this.day.entry.start,this.entry.start)?this.$t("times.modal.edit"):this.$t("times.modal.add"))+" "+this.entry.start.toLocaleDateString(navigator.language):""}}});O.render=p;var v=O,j=n("ff79");function w(t,e){return new Date(e,t+1,0).getDate()}function D(t){var e=t.toLocaleDateString(navigator.language,{day:"2-digit"}).toLowerCase(),n=t.toLocaleDateString(navigator.language,{month:"long"}).toLowerCase(),r=t.toLocaleDateString(navigator.language,{year:"numeric"}).toLowerCase();return e+"-"+n+"-"+r}function C(t,e){return t.toLocaleDateString(navigator.language,{day:"2-digit",month:"2-digit",year:"numeric"})===e.toLocaleDateString(navigator.language,{day:"2-digit",month:"2-digit",year:"numeric"})}var V=Object(r["defineComponent"])({interval:1e3,months:[],monthModifier:0,components:{IonButtons:y["c"],IonHeader:y["n"],IonMenuButton:y["C"],IonPage:y["F"],IonToolbar:y["Q"],IonGrid:y["m"],IonRow:y["H"],IonCol:y["h"],IonContent:y["i"],IonList:y["z"],IonItem:y["s"],IonLabel:y["y"],IonItemGroup:y["u"],IonItemDivider:y["t"],IonText:y["N"],IonInfiniteScroll:y["p"],IonInfiniteScrollContent:y["q"],IonItemOptions:y["w"],IonItemOption:y["v"],IonItemSliding:y["x"],IonFab:y["k"],IonFabButton:y["l"],IonIcon:y["o"]},data:function(){return{months:[],current:{},completeOvertime:"",interval:1e3,monthModifier:0,add:j["a"],addOutline:j["b"]}},created:function(){var t=b["a"].loadNewestDate();null!=t&&t>new Date&&(this.loadMonthsInFutureUntil(t),this.monthModifier=1),this.loadNextMonth(),this.loadNextMonth(),this.loadStatistics(),this.interval=setInterval(this.loadStatistics,1e3)},mounted:function(){this.scrollToDate(new Date)},methods:{formatDateForId:function(t){var e=t.toLocaleDateString(navigator.language,{day:"2-digit"}).toLowerCase(),n=t.toLocaleDateString(navigator.language,{month:"long"}).toLowerCase(),r=t.toLocaleDateString(navigator.language,{year:"numeric"}).toLowerCase();return"times-item-"+e+"-"+n+"-"+r},scrollToDate:function(t){var e=this.$el.querySelector("#"+this.formatDateForId(t));e&&window.scrollTo(0,e.offsetTop+20)},loadCompleteOvertime:function(){this.completeOvertime=this.formatDuration(b["a"].calculateOvertimeComplete())},isToday:function(t){return C(t.date,new Date)},getDayEntry:function(t){if(t.entry)return C(t.entry.start,this.current.start)?this.current:t.entry},loadStatistics:function(){this.loadTodayEntry(),this.loadCompleteOvertime()},loadTodayEntry:function(){var t=null;b["a"].isWorkStartActive()&&(t=b["a"].loadActiveWorkEntry()),null===t&&(t=b["a"].loadEntryForDate(new Date)),this.current=null===t?{start:new Date,fullDay:!1,type:h["b"].WORK,overtime:new h["a"](0,0),worktime:new h["a"](0,0)}:b["a"].calculateEntry(t)},switchLabelColor:function(t){return t.entry?t.entry.type===h["b"].OVERTIME?"warning":t.entry.type===h["b"].VACATION?"secondary":t.entry.type===h["b"].ILL?"tertiary":"primary":"medium"},switchOvertimeColor:function(t){return t&&t.toString().startsWith("-")?"danger":"success"},formatTime:function(t){return(t||new Date).toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"})},formatDuration:function(t){return t?t.toString():"0:00"},isWork:function(t){return t===h["b"].WORK},loadData:function(t){var e=this;setTimeout((function(){if(e.loadNextMonth(),t.target){var n=t.target;n.complete()}}),500)},getDayForDate:function(t){var e={weekday:"short"},n={day:"numeric"},r={weekday:t.toLocaleDateString(navigator.language,e),day:t.toLocaleDateString(navigator.language,n),date:t},o=b["a"].loadEntryForDate(t);return null!=o&&(r.entry=o),r},loadMonth:function(t,e,n){var r=this;return m(regeneratorRuntime.mark((function o(){var a,i,c,u,l,s,d,f;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:for(a=new Date,a.setDate(1),a.setMonth(t),i={month:"long"},c={name:new Date(e,t).toLocaleDateString(navigator.language,i),monthNumber:t,year:a.getFullYear(),days:[]},u=n||(0===r.months.length?(new Date).getDate():w(t,e)),l=u;l>0;l--)s=new Date(e,t,l),d=r.getDayForDate(s),c.days.push(d);f=r.months.findIndex((function(n){return n.year==e&&n.monthNumber==t})),f>=0?r.months[f]=c:r.months[0]&&(e>r.months[0].year||t>r.months[0].monthNumber)?r.months.unshift(c):r.months.push(c);case 9:case"end":return o.stop()}}),o)})))()},loadNextMonth:function(){var t=this;return m(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.loadMonth((new Date).getMonth()-t.monthModifier,(new Date).getFullYear()),t.monthModifier++;case 2:case"end":return e.stop()}}),e)})))()},deleteEntryForDay:function(t){var e=this;return m(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.entry&&(b["a"].deleteEntryForDate(t.entry.start),t.entry=void 0),e.$refs.entryList.$el.closeSlidingItems();case 2:case"end":return n.stop()}}),n)})))()},findDayForDate:function(t){var e=this.months.find((function(e){return e.monthNumber===t.getMonth()}));if(e)return e.days.find((function(e){return e.date.toDateString()==t.toDateString()}))},updateTimeRange:function(t,e){for(var n=new Date(t);n<=e;n.setDate(n.getDate()+1)){var r=this.findDayForDate(n),o=b["a"].loadEntryForDate(n);r&&null!=o&&(r.entry=o)}},openAddEditModal:function(t){var e=this;return m(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,y["T"].create({id:"times-new-entry-"+D(t.date),component:v,componentProps:{day:t,dismiss:function(){r.dismiss()},saveDayEntry:function(n){var r=t;if(!C(n.start,t.date)){var o=e.findDayForDate(n.start);o&&(r=o)}n.start>new Date&&e.loadMonthsInFutureUntil(n.start),r.entry=n,n.end&&n.start.toDateString()!==n.end.toDateString()&&e.updateTimeRange(n.start,n.end),e.loadStatistics()}}});case 2:return r=n.sent,n.abrupt("return",r.present());case 4:case"end":return n.stop()}}),n)})))()},loadMonthsInFutureUntil:function(t){var e=new Date;e.setHours(0,0,0,0),e.setDate(1);for(var n=e;n<t;n.setMonth(n.getMonth()+1))n.getFullYear()==t.getFullYear()&&n.getMonth()==t.getMonth()?this.loadMonth(n.getMonth(),n.getFullYear(),t.getDate()):this.loadMonth(n.getMonth(),n.getFullYear())},getWorktimeForDate:function(t){var e=this.getDayEntry(this.getDayForDate(t));if(e)return e.worktime},getOvertimeForDate:function(t){var e=this.getDayEntry(this.getDayForDate(t));if(e)return e.overtime},presentQuickActionsSheet:function(){var t=this;return m(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new Date,r=t.months.filter((function(t){return t.year==n.getFullYear()&&t.monthNumber==n.getMonth()})).flatMap((function(t){return t.days})).find((function(t){return C(t.date,n)})),r||(r=t.getDayForDate(n)),e.next=5,y["S"].create({header:t.$t("times.quickActions.header"),buttons:[{text:b["a"].isWorkStartActive()?t.$t("times.quickActions.stopWork"):t.$t("times.quickActions.startWork"),icon:j["a"],handler:function(){b["a"].isWorkStartActive()?b["a"].stopWork():r&&(r.entry={start:new Date,fullDay:!1,type:h["b"].WORK},b["a"].saveEntryForDate(new Date,r.entry),b["a"].saveWorkStart(r.entry),t.loadStatistics())}},{text:t.$t("times.quickActions.newEntry"),icon:j["a"],handler:function(){r&&t.openAddEditModal(r)}},{text:t.$t("cancel"),icon:j["j"],role:"cancel"}]});case 5:return o=e.sent,e.next=8,o.present();case 8:case"end":return e.stop()}}),e)})))()}}});n("53a9");V.render=d,V.__scopeId="data-v-52da0c2e";e["default"]=V},"8b07":function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(T){u=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof b?e:b,a=Object.create(o.prototype),i=new x(r||[]);return a._invoke=V(t,n,i),a}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(T){return{type:"throw",arg:T}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",m="executing",y="completed",h={};function b(){}function p(){}function g(){}var O={};O[a]=function(){return this};var v=Object.getPrototypeOf,j=v&&v(v(S([])));j&&j!==n&&r.call(j,a)&&(O=j);var w=g.prototype=b.prototype=Object.create(O);function D(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){function n(o,a,i,c){var u=s(t[o],t,a);if("throw"!==u.type){var l=u.arg,d=l.value;return d&&"object"===typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(d).then((function(t){l.value=t,i(l)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}var o;function a(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function V(t,e,n){var r=d;return function(o,a){if(r===m)throw new Error("Generator is already running");if(r===y){if("throw"===o)throw a;return I()}n.method=o,n.arg=a;while(1){var i=n.delegate;if(i){var c=N(i,n);if(c){if(c===h)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=m;var u=s(t,e,n);if("normal"===u.type){if(r=n.done?y:f,u.arg===h)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=y,n.method="throw",n.arg=u.arg)}}}function N(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,N(t,n),"throw"===n.method))return h;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var o=s(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,h;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,h):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function S(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){while(++o<t.length)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:I}}function I(){return{value:e,done:!0}}return p.prototype=w.constructor=g,g.constructor=p,p.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},D(C.prototype),C.prototype[i]=function(){return this},t.AsyncIterator=C,t.async=function(e,n,r,o,a){void 0===a&&(a=Promise);var i=new C(l(e,n,r,o),a);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},D(w),u(w,c,"Generator"),w[a]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=S,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),l=r.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:S(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),h}},t}(t.exports);try{regeneratorRuntime=r}catch(o){Function("r","regeneratorRuntime = r")(r)}},a2bf:function(t,e,n){"use strict";var r=n("e8b5"),o=n("50c4"),a=n("0366"),i=function(t,e,n,c,u,l,s,d){var f,m=u,y=0,h=!!s&&a(s,d,3);while(y<c){if(y in n){if(f=h?h(n[y],y,e):n[y],l>0&&r(f))m=i(t,e,f,o(f.length),m,l-1)-1;else{if(m>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[m]=f}m++}y++}return m};t.exports=i},c740:function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").findIndex,a=n("44d2"),i="findIndex",c=!0;i in[]&&Array(1)[i]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),a(i)}}]);
//# sourceMappingURL=chunk-421a6add.dbc46a2a.js.map