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

  return day+'-'+month+'-'+year;
}

describe('Times overview', () => {
  before(() => {
    cy.visit('/times');
    cy.clearLocalStorage();
  }),

  it('Complete overtime zero', () => {
    cy.get('#complete-overtime')
    .contains('Überstunden: 0:00');
  }),

  it('Today stats zero', () => {
    cy.get('#today-stats')
    .contains('0:00');
  }),

  it('Add entry dialog opens by click on empty row', () => {
    //GIVEN
    const today = new Date();
    const todayDayString: string = createItemSelectorTextForDate(today);

    //WHEN
    cy.get('#times-item-'+todayDayString).click({force: true});

    //THEN
    cy.get("ion-title")
    .contains(today.toLocaleDateString(navigator.language));

    cy.get(".item-select > .in-item").should("have.value",1);

    //CLEAN
    cy.get(".toolbar-title-default > .buttons-first-slot").click();
  }),

  it('Add work enty with dialog for today', () => {
    //GIVEN
    const today = new Date();
    const todayDayString: string = createItemSelectorTextForDate(today);
    cy.get('#times-item-'+todayDayString).click({force: true});

    //WHEN
    cy.get("#ion-overlay-2 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > div > ion-header > ion-toolbar > ion-buttons.buttons-last-slot.sc-ion-buttons-md-h.sc-ion-buttons-md-s.md.hydrated > ion-button").click();

    //THEN
    cy.get("#times-item-stats").should("have.text","8:000:00")
  })
})