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
  })
})
