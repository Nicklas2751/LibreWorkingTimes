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
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()-1);
    const yesterdayDayString: string = createItemSelectorTextForDate(yesterday);
    cy.get("#times-item-"+yesterdayDayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+yesterdayDayString+" #times-new-entry-type-select").click({force: true});
    //Check type
    cy.get("#alert-input-3-3").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    
    //Save
    cy.get("#times-new-entry-"+yesterdayDayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+yesterdayDayString+" #times-item-stats").should("have.text","8:000:00");
  }),

  it("Add work entry with dialog for today", () => {
    //GIVEN
    const today = new Date();
    const todayDayString: string = createItemSelectorTextForDate(today);
    cy.get("#times-item-"+todayDayString).click({force: true});

    //WHEN
    cy.get("#times-new-entry-"+todayDayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+todayDayString+" #times-item-stats").should("have.text","8:000:00")
    cy.get("#today-stats").should("have.text","8:000:00")
  }),

  it("Add vacation entry with dialog", () => {
    //GIVEN
    const today = new Date();
    const day = new Date(today);
    day.setDate(today.getDate()-2);
    const dayString: string = createItemSelectorTextForDate(day);
    cy.get("#times-item-"+dayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-type-select").click({force: true});
    //Check type
    cy.get("#alert-input-6-2").click();
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
    day.setDate(today.getDate()-3);
    const dayString: string = createItemSelectorTextForDate(day);
    cy.get("#times-item-"+dayString).click({force: true});

    //WHEN
    //Open type dialog
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-type-select").click({force: true});
    //Check type
    cy.get("#alert-input-8-1").click();
    //Set type
    cy.get(".alert-button-group > :nth-child(2) > .alert-button-inner").click();
    
    //Save
    cy.get("#times-new-entry-"+dayString+" #times-new-entry-save").click();

    //THEN
    cy.get("#times-item-"+dayString+" #times-item-stats").should("have.text","0:00-8:00");
  })
  
})