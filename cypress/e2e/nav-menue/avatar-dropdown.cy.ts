import { IDENTITIES, PROJECTS, ROUNDS, VERIFIED_ORG_IDENTITY } from './mocks';
import { API_SERVER, APP_URL } from '../constants/constants';

let isOrgAccount = false;

describe('switching between organization and user accouns', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
      req.reply(200, ROUNDS);
    });
    cy.intercept('GET', `${API_SERVER}/projects?t=*&page=1&limit=10`, req => {
      req.reply(200, PROJECTS);
    }).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      if (isOrgAccount) {
        req.reply(200, VERIFIED_ORG_IDENTITY);
      } else {
        req.reply(200, IDENTITIES);
      }
    }).as('getIdentities');
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
    Cypress.on('uncaught:exception', err => {
      if (err.message.includes('rateUsd')) {
        return false;
      }
    });
  });

  it('user navigates to the home page and switches to organization account', () => {
    cy.visit(`${APP_URL}/home`);
    cy.get('[data-testid="avatar-icon"]').should('exist');
    cy.get('[data-testid="avatar-icon"]').click();

    isOrgAccount = true;

    cy.get('[data-testid="avatar-label-group"]').should('be.visible');
    cy.get('[data-testid="avatar-label-group"]').eq(1).click();
  });
  it('organization navigates to home page and switches to user account', () => {
    isOrgAccount = true;

    cy.visit(`${APP_URL}/home`);
    cy.get('[data-testid="avatar-icon"]').should('exist');
    cy.get('[data-testid="avatar-icon"]').click();

    isOrgAccount = false;

    cy.get('[data-testid="avatar-label-group"]').should('be.visible');
    cy.get('[data-testid="avatar-label-group"]').eq(1).click();
  });
});
