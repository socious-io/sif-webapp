import {
  ROUNDS,
  SUBMITABLE_ROUNDS,
  EDIT_PROJECT_DETAIL,
  IDENTITIES,
  VERIFIED_ORG_IDENTITY,
  OTHER_PROJECT_DETAILS,
  NOT_VOTED_PROJECT,
} from './mocks';
import { API_SERVER, APP_URL } from '../constants/constants';

let mockRoundsResponse = SUBMITABLE_ROUNDS;
const org = VERIFIED_ORG_IDENTITY;
let isOrgAccount = false;
let isMyProject = true;
let switchProjectDetail = 1;

describe('Organization creates project', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
      req.reply(200, mockRoundsResponse);
    });
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      if (isOrgAccount) {
        req.reply(200, org);
      } else {
        req.reply(200, IDENTITIES);
      }
    }).as('getIdentities');
    cy.intercept('GET', `${API_SERVER}/projects/*?t=*`, req => {
      switch (switchProjectDetail) {
        case 1:
          req.reply(200, EDIT_PROJECT_DETAIL);
          break;
        case 2:
          req.reply(200, OTHER_PROJECT_DETAILS);
          break;
        case 3:
          req.reply(200, NOT_VOTED_PROJECT);
          break;
        default:
          req.reply(200, EDIT_PROJECT_DETAIL);
          break;
      }
    }).as('getProject');
    cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`, req => {
      req.reply(200, { limit: 5, page: 1, results: [], total: 0 });
    });

    cy.intercept('DELETE', `${API_SERVER}/projects/*?t=*`, req => {
      req.reply(200, { message: 'success' });
    }).as('deleteProject');
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
  });

  it('organization navigates to project detail and deletes their own project successfully', () => {
    isOrgAccount = true;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');

    cy.contains('Remove').should('be.visible');
    cy.contains('Remove').click();

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('Delete Project?').should('be.visible');
    cy.contains('Are you sure you want to delete this project?').should('be.visible');
    cy.contains('button', 'Delete Project').should('be.visible').click();

    cy.wait('@deleteProject').its('response.statusCode').should('eq', 200);
    cy.url().should('contain', '/projects');

    cy.contains('New Round').should('be.visible');
  });
  it('organization navigates to project detail and deletes their own project successfully with not submitable round', () => {
    isOrgAccount = true;
    mockRoundsResponse = ROUNDS;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');

    cy.contains('Remove').should('be.visible');
    cy.contains('Remove').click();

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('Delete Project?').should('be.visible');
    cy.contains('Are you sure you want to delete this project?').should('be.visible');
    cy.contains('button', 'Delete Project').should('be.visible').click();

    cy.wait('@deleteProject').its('response.statusCode').should('eq', 200);
    cy.url().should('contain', '/projects');

    cy.contains('New Round').should('be.visible');
  });
  it('organization navigates to an already voted another project details and fails to delete', () => {
    isOrgAccount = true;
    isMyProject = false;
    switchProjectDetail = 2;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');

    cy.contains('Remove').should('not.exist');
    cy.contains('Donate').should('be.disabled');
  });
  it('organization navigates to another project details and fails to delete', () => {
    isOrgAccount = true;
    isMyProject = false;
    switchProjectDetail = 3;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');

    cy.contains('Remove').should('not.exist');
    cy.contains('Vote now').should('be.visible').should('be.disabled');
    cy.contains('Please switch to your personal Socious account to vote.').should('be.visible');
  });
  it('user navigates to project details and should not see the remove button', () => {
    isOrgAccount = false;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');

    cy.contains('Remove').should('not.exist');
  });
});
