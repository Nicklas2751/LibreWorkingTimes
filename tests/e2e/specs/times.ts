// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress
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
    const day = today.toLocaleDateString(navigator.language, {
      day: "2-digit"
    }).toLowerCase();
    const month = today.toLocaleDateString(navigator.language, {
      month: "long"
    }).toLowerCase();
    const year = today.toLocaleDateString(navigator.language, {
      year: "numeric"
    }).toLowerCase();

    const todayDayString: string = day+'-'+month+'-'+year;

    //WHEN
    cy.get('#times-item-'+todayDayString).click({force: true});

    //THEN
  })
})
