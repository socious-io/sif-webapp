import { COMMENTS, IDENTITIES, PROJECT_DETAIL, PROJECTS, ROUNDS, VOTE } from './mocks';
import { API_SERVER, APP_URL } from '../constants/constants';

describe('vote to a project test', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/projects/*?t=*`, req => {
      req.reply(200, PROJECTS);
    }).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/projects/*?t=*`, req => {
      req.reply(200, PROJECT_DETAIL);
    }).as('getProjectDetails');
    cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
      req.reply(200, ROUNDS);
    });
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      req.reply(200, IDENTITIES);
    });
    cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`, req => {
      req.reply(200, COMMENTS);
    });
    cy.intercept('POST', `${API_SERVER}/projects/*/votes`, req => {
      req.reply(200, VOTE);
    }).as('vote');
    cy.intercept('GET', `${API_SERVER}/projects?t=*&page=1&limit=10`, req => {
      req.reply(200, PROJECTS);
    }).as('getProjects');
    cy.intercept('GET', `${APP_URL}/projects/*/undefined`, req => {
      req.reply(200);
    });
    cy.intercept('POST', `https://r.stripe.com/b`, req => {
      req.reply(200);
    });
    cy.intercept('POST', `https://m.stripe.com/b`, req => {
      req.reply(200);
    });
    cy.intercept('POST', `https://m.stripe.com/6`, req => {
      req.reply(200, {
        muid: 'ce2326f1-5df5-4afd-99ae-2bbc9b40d9d7c1811d',
        guid: '401c6cd5-ebf1-4b64-97a7-73d39bcbcea631def9',
        sid: 'a9d488cf-b602-4331-acbb-bd011344b609a069e6',
      });
    }).as('postStripe');
    cy.intercept('GET', `https://js.stripe.com/v3/.deploy_status_henson.json`, req => {
      req.reply(200);
    });
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('rateUsd')) {
        return false;
      }
    });
  });
  it('user votes to a project with vote with a donation in USDM with invalid amount', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('Overview').should('be.visible');

    cy.contains('Vote now').should('exist').should('be.enabled');
    cy.contains('Vote now').click();

    cy.contains('Vote with a donation').should('exist');
    Cypress.once('uncaught:exception', () => false);
    cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });
    cy.contains('Donate to amplify your impact').should('be.visible');

    cy.contains('Crypto').should('be.visible').click();

    cy.contains('Donate now').should('exist').should('be.disabled');
    cy.get('#donate').should('exist');

    cy.get('input#donate').focus();
    cy.contains('ADA').should('be.visible');
    cy.get('[data-testid="currency"]').contains('ADA').should('be.visible');
    cy.get('[data-testid="currency"]').contains('ADA').click({ force: true });

    cy.contains('USDM').should('be.visible').click();
    cy.get('[data-testid="currency"]').contains('USDM').should('exist');

    cy.get('input#donate').focus();
    cy.contains('USDM').should('exist');
    cy.get('[data-testid="currency"]').contains('USDM').should('exist');

    cy.get('input#donate').type('0');
    cy.contains('Please enter a whole number without decimals.').should('be.visible');
  });
  it('user votes to a project with vote with a donation in ADA', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('Overview').should('be.visible');

    cy.contains('Vote now').should('exist').should('be.enabled');
    cy.contains('Vote now').click();

    cy.contains('Vote with a donation').should('exist');
    Cypress.once('uncaught:exception', () => false);
    cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });
    cy.contains('Donate to amplify your impact').should('be.visible');

    cy.contains('Crypto').should('be.visible').click();

    cy.contains('Donate now').should('exist').should('be.disabled');
    cy.get('#donate').should('exist');

    cy.get('input#donate').focus();
    cy.contains('ADA').should('be.visible');
    cy.get('[data-testid="currency"]').contains('ADA').should('be.visible');

    cy.get('input#donate').type('20');
    cy.contains('20 ADA').should('be.visible');
  });
  it('user votes to a project with vote with a donation in USDM', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('Overview').should('be.visible');

    cy.contains('Vote now').should('exist').should('be.enabled');
    cy.contains('Vote now').click();

    cy.contains('Vote with a donation').should('exist');
    Cypress.once('uncaught:exception', () => false);
    cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });
    cy.contains('Donate to amplify your impact').should('be.visible');

    cy.contains('Crypto').should('be.visible').click();

    cy.contains('Donate now').should('exist').should('be.disabled');
    cy.get('#donate').should('exist');

    cy.get('input#donate').focus();
    cy.contains('ADA').should('be.visible');
    cy.get('[data-testid="currency"]').contains('ADA').should('be.visible');
    cy.get('[data-testid="currency"]').contains('ADA').click({ force: true });

    cy.contains('USDM').should('be.visible').click();
    cy.get('[data-testid="currency"]').contains('USDM').should('exist');

    cy.get('input#donate').type('20');
    cy.contains('20 USDM').should('be.visible');
  });
  it('user votes to a project with fiat payment', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('Overview').should('be.visible');

    cy.contains('Vote now').should('exist').should('be.enabled');
    cy.contains('Vote now').click();

    cy.contains('Vote with a donation').should('exist');
    Cypress.once('uncaught:exception', () => false);
    cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });
    cy.contains('Donate to amplify your impact').should('be.visible');

    cy.contains('Donate now').should('exist').should('be.disabled');
    cy.get('#donate').should('exist');

    cy.contains('Fiat').should('be.visible');
    cy.contains('Fiat').click();

    cy.get('input#donate').focus();
    cy.get('input#donate').type('20');
    cy.contains('Add Card').should('be.enabled').click();

    cy.contains('Add a credit card').should('be.visible');
    cy.contains('Add').should('be.enabled').click({ force: true });
  });
  it('user uses the share project to copy the url', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('Overview').should('be.visible');

    cy.contains('Share').should('exist');
    cy.contains('Share').click({ force: true });
  });
});
