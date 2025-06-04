import {
  ROUNDS,
  VERIFIED_ORG,
  SUBMITABLE_ROUNDS,
  MEDIA,
  POST_PROJECTS,
  NEW_PROJECT_DETAIL,
  LOCATIONS,
  NOT_VERIFIED_ORG,
} from './mocks';
import { API_SERVER, APP_URL } from '../constants/constants';

let mockRoundsResponse = SUBMITABLE_ROUNDS;
let org = VERIFIED_ORG;

describe('Organization creates project', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
      req.reply(200, mockRoundsResponse);
    });
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      req.reply(200, org);
    });
    cy.intercept('POST', `${API_SERVER}/media`, req => {
      req.reply(200, MEDIA);
    });
    cy.intercept('POST', `${API_SERVER}/projects`, req => {
      req.reply(200, POST_PROJECTS);
    });
    cy.intercept('GET', `${API_SERVER}/projects/*?t=*`, req => {
      req.reply(200, NEW_PROJECT_DETAIL);
    });
    cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`, req => {
      req.reply(200, { limit: 5, page: 1, results: [], total: 0 });
    });
    cy.intercept('GET', `${APP_URL}/geo/locations?search=*&limit=20&page=1&t=*`, req => {
      req.reply(200, LOCATIONS);
    }).as('getLocation');
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
  });

  it('Submition vote period', () => {
    mockRoundsResponse = ROUNDS;

    cy.visit(`${APP_URL}/home`);
    cy.contains('Your organization has been successfully verified').should('be.visible');
    cy.contains('Make your impact').should('be.visible');

    cy.contains('Create a Project').should('exist').click();
    cy.contains('Submission Closed').should('be.visible');

    cy.contains('Close').click({ force: true });
  });

  it('verified organization creates Project', () => {
    mockRoundsResponse = SUBMITABLE_ROUNDS;

    cy.visit(`${APP_URL}/home`);
    cy.contains('Create a Project').click();

    // Step 1
    cy.contains('Start a project').should('be.visible');
    cy.contains('Start a project').click();

    cy.contains(`Let's begin your fundraising journey`);

    cy.contains('Worldwide').click();
    cy.get('#social-causes').focus();
    cy.get('#social-causes').type('Social');
    cy.get('[data-testid="chip"]').should('exist');
    cy.get('[data-testid="chip"]').click();

    cy.contains('Continue').should('be.enabled');
    cy.contains('Continue').click();

    // Step 2
    cy.contains(`Tell donors why you're fundraising`).should('be.visible');

    cy.get('[name=title]').focus();
    cy.get('[name=title]').type('Test project');
    cy.get('[name=website]').focus();
    cy.get('[name=website]').type('http://test.com');
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this is a test paragraph {enter}');

    cy.contains('button', 'B').click();
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this test is bold {enter}');

    cy.contains('button', 'i').click();
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this text is itallic and bold {enter}');

    cy.contains('button', 'B').click();
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this text is only itallic {enter}');

    cy.contains('button', 'i').click();
    cy.contains('button', 'u').click();
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this text has underline {enter}');

    cy.contains('button', 'i').click();
    cy.contains('button', 'B').click();
    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this text has all at the same time {enter}');

    cy.get('.tiptap.ProseMirror')
      .invoke('html')
      .then(html => {
        expect(html).to.include('<p>this is a test paragraph </p>');
        expect(html).to.include('<strong class="font-bold">this test is bold </strong>');
        expect(html).to.include(
          '<strong class="font-bold"><em class="italic">this text is itallic and bold </em></strong>',
        );
        expect(html).to.include('<em class="italic">this text is only itallic </em>');
        expect(html).to.include('<u class="underline">this text has underline </u>');
        expect(html).to.include(
          '<strong class="font-bold"><em class="italic"><u class="underline">this text has all at the same time </u></em></strong>',
        );
      });

    cy.contains('Continue').should('be.enabled').click();

    //step 3
    cy.contains('Add a cover photo').should('be.visible');
    cy.contains('Continue').should('be.disabled');

    cy.get('input[type="file"]').attachFile('test.jpg');
    cy.contains('Edit Image').should('be.visible');

    cy.contains('Save').click();
    cy.get('[data-testid="image-preview"]').should('exist');
    cy.contains('Continue').should('be.enabled').click();

    //step 4
    cy.contains('Connect a wallet').should('be.visible');
    cy.contains('Preview').should('be.enabled').click();

    //step 5
    cy.get('[alt=banner]').should('exist');
    cy.contains('Test project').should('exist');
    cy.contains('Social Issues').should('exist');
    cy.contains('http://test.com').should('exist');
    cy.contains('this text has all at the same time').should('exist');

    cy.contains('Publish').should('be.enabled').click();
    cy.contains('Congrats!').should('be.visible');

    cy.get('[data-testid="home-icon"]').eq(1).click();

    //step 6 project details
    cy.contains('Project Details').should('be.visible');
  });

  it('user selects location', () => {
    mockRoundsResponse = SUBMITABLE_ROUNDS;

    cy.visit(`${APP_URL}/home`);
    cy.contains('Create a Project').click();

    cy.contains('Start a project').should('be.visible');
    cy.contains('Start a project').click();

    cy.contains(`Let's begin your fundraising journey`);

    cy.contains('City / Country').click();
    cy.get('[data-testid="search-dropdown"]').click();
    cy.get('[data-testid="search-dropdown"]').type('tokyo');
    cy.contains('Japan, Tokyo').should('be.visible');
    cy.wait('@getLocation');
  });

  it('not verified organization tries to submit a project', () => {
    org = NOT_VERIFIED_ORG;
    mockRoundsResponse = SUBMITABLE_ROUNDS;

    cy.visit(`${APP_URL}/home`);
    cy.contains('Make your impact').should('be.visible');

    cy.contains('Create a Project').should('exist').click();
    cy.contains('Verify your organization').should('be.visible');
  });
});
