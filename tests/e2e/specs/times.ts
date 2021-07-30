import "cypress-localstorage-commands";

function createItemSelectorTextForDate(date: Date): string {
  const day = date.toLocaleDateString(navigator.language, {
    day: "2-digit"
  }).toLowerCase();
  const month = date.toLocaleDateString(navigator.language, {
    month: "long"
  }).toLowerCase();
  const year = date.toLocaleDateString(navigator.language, {
    year: "numeric"
  }).toLowerCase();

  return day+"-"+month+"-"+year;
}

describe("Times overview", () => {
  before(() => {
    cy.visit("/times");
    cy.clearLocalStorage();
    cy.clearLocalStorageSnapshot();
  }),
  beforeEach(() => {
    cy.restoreLocalStorage();
  }),
  afterEach(() => {
    cy.saveLocalStorage();
  }),

  it("Complete overtime zero", () => {
    cy.get("#complete-overtime")
    .contains("Überstunden: 0:00");
  }),

  it("Today stats zero", () => {
    cy.get("#today-stats")
    .contains("0:00");
  }),

  it("Add entry dialog opens by click on empty row", () => {
    //GIVEN
    const today = new Date();
    const todayDayString: string = createItemSelectorTextForDate(today);

    //WHEN
    cy.get("#times-item-"+todayDayString).click({force: true});

    //THEN
    cy.get("ion-title")
    .contains(today.toLocaleDateString(navigator.language));

    cy.get("#times-new-entry-"+todayDayString+" #times-new-entry-type-select").should("have.value",1);

    //CLEAN
    cy.get("#times-new-entry-"+todayDayString+" #times-new-entry-abort").click();
  }),

  it("Add ill entry with dialog for yesterday", () => {
    //GIVEN
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate()-2);
    const dateDayString: string = createItemSelectorTextForDate(date);
    cy.get("#times-item-"+dateDayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dateDayString+" #times-new-entry-type-select").should('be.visible').click({force: true});
    //Check type
    cy.get(".alert-radio-group > :nth-child(4)").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    
    //Save
    cy.get("#times-new-entry-"+dateDayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dateDayString+" #times-item-stats").should("have.text","8:000:00");
  }),

  it("Add work entry with dialog for today", () => {
    //GIVEN
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate()-1);
    const dateDayString: string = createItemSelectorTextForDate(date);
    cy.get("#times-item-"+dateDayString).click({force: true});

    //WHEN
    cy.get("#times-new-entry-"+dateDayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dateDayString+" #times-item-stats").should("have.text","8:000:00")
  }),

  it("Add vacation entry with dialog", () => {
    //GIVEN
    const today = new Date();
    const day = new Date(today);
    day.setDate(today.getDate()-3);
    const dayString: string = createItemSelectorTextForDate(day);
    cy.get("#times-item-"+dayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-type-select").should('be.visible').click({force: true});
    //Check type
    cy.get(".alert-radio-group > :nth-child(3)").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    
    //Save
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dayString+" #times-item-stats").should("have.text","0:000:00");
  }),

  it("Add overtime default entry with dialog", () => {
    //GIVEN
    const today = new Date();
    const day = new Date(today);
    day.setDate(today.getDate()-4);
    const dayString: string = createItemSelectorTextForDate(day);
    cy.get("#times-item-"+dayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-type-select").should('be.visible').click({force: true});
    //Check type
    cy.get(".alert-radio-group > :nth-child(2)").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    
    //Save
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dayString+" #times-item-stats").should("have.text","0:00-8:00");
    cy.get("#complete-overtime").should("have.text","Überstunden: -8:00");
  }),

  it("Add overtime adding entry with dialog", () => {
    //GIVEN
    const today = new Date();
    const day = new Date(today);
    day.setDate(today.getDate()-5);
    const dayString: string = createItemSelectorTextForDate(day);
    cy.get("#times-item-"+dayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-type-select").should('be.visible').click({force: true});
    //Check type
    cy.get(".alert-radio-group > :nth-child(2)").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    //Change mode to add
    cy.get("#times-new-entry-"+dayString+" ion-segment-button:nth-child(1)").click();

    //Change amount
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-overtime-amount").click();
    //Set amount to 2 hours
    cy.get("#ion-overlay-11 ion-picker-column.sc-ion-picker-md.md.picker-col.picker-opts-right.hydrated button:nth-child(3)").click();
    //Accept overlay
    cy.get("#ion-overlay-11 div:nth-child(2) > button").click();
    
    
    //Save
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dayString+" #times-item-stats").should("have.text","0:002:00");
    cy.get("#complete-overtime").should("have.text","Überstunden: -6:00");
  })
  //cy.get("#today-stats").should("have.text","8:000:00")
})