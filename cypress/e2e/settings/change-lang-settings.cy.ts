import { IDENTITIES, ROUNDS } from './mocks';
import { API_SERVER, APP_URL, ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_TYPE } from '../constants/constants';

describe('Change language on intro page test', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      req.reply(200, IDENTITIES);
    });
    cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
      req.reply(200, ROUNDS);
    });
    cy.intercept('GET', `${API_SERVER}`, req => {
      req.reply(200, IDENTITIES);
    });
    cy.intercept('POST', `${API_SERVER}/auth/session`, req => {
      req.reply(res => {
        res.send({
          statusCode: 200,
          body: {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN,
            token_type: TOKEN_TYPE,
          },
          headers: { 'Content-Type': 'application/json' },
        });
      });
    });
    cy.setCookie('access_token', ACCESS_TOKEN);
    cy.setCookie('refresh_token', REFRESH_TOKEN);
    cy.setCookie('token_type', TOKEN_TYPE);
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
  });
  it('user successfully navigates to settings through avatar dropdown', () => {
    cy.visit(`${APP_URL}/home`);
    cy.get('[data-testid="avatar-icon"]').should('exist');
    cy.get('[data-testid="avatar-icon"]').click();

    cy.contains('Setting').scrollIntoView();
    cy.contains('Setting').should('be.visible');
    cy.contains('Setting').click();
    cy.contains('Settings').should('be.visible');
  });
  it('user navigates to settings and changes the language to Japanese', () => {
    cy.visit(`${APP_URL}/settings`);
    cy.contains('Settings').should('be.visible');
    cy.get('[data-testid="search-dropdown"]').should('be.visible');
    cy.get('[data-testid="search-dropdown"]').eq(1).click();

    cy.contains('Japanese').should('be.visible');
    cy.contains('Japanese').click();

    cy.contains('save').should('exist');
    cy.get('button').contains('save').click({ force: true });
  });
});
