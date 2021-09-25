import "cypress-localstorage-commands";
import { WorkDayImpl } from "../../../src/types"


describe("Settings", () => {
  before(() => {
    cy.visit("/settings");
    cy.clearLocalStorage();
    cy.clearLocalStorageSnapshot();
  }),
  beforeEach(() => {
    cy.restoreLocalStorage();
  }),
  afterEach(() => {
    cy.saveLocalStorage();
  }),

  it("Check description default value", () => {
    cy.get("#settings-description").should('have.value', 'John Doe @ Example Corp');
  }),

  it("Check work time default value", () => {
    cy.get("#settings-dailyWorktime").should('have.value', new Date(0, 0, 0, 8, 0).toISOString());
  }),

  it("Check break time default value", () => {
    cy.get("#settings-breakTime").should('have.value', new Date(0, 0, 0, 0, 30).toISOString());
  }),

  it("Check work times default value", () => {
    cy.get("#settings-worktimes").invoke('val').should('deep.equal', [new WorkDayImpl("monday", 1),  new WorkDayImpl("tuesday", 2),  new WorkDayImpl("wednesday", 3),  new WorkDayImpl("thursday", 4),  new WorkDayImpl("friday", 5)]);
  }),

  it("Change description", () => {
    const newDescription = "End2End Test @ Cypress";
    cy.get("#settings-description").type("{selectall}{backspace}"+newDescription);
    cy.get("#settings-description").should('have.value', newDescription)
    .and(() =>
      assert.equal(JSON.parse(localStorage.getItem("Settings.Description")), newDescription)
    );
  })

})