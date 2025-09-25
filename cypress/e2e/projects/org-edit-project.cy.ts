import { ROUNDS, VERIFIED_ORG, SUBMITABLE_ROUNDS, MEDIA, POST_PROJECTS, LOCATIONS, EDIT_PROJECT_DETAIL } from './mocks';
import { API_SERVER, APP_URL } from '../constants/constants';

let mockRoundsResponse = SUBMITABLE_ROUNDS;
const org = VERIFIED_ORG;

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
    cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`, req => {
      req.reply(200, { limit: 5, page: 1, results: [], total: 0 });
    });
    cy.intercept('GET', `${APP_URL}/geo/locations?search=*&limit=20&page=1&t=*`, req => {
      req.reply(200, LOCATIONS);
    }).as('getLocation');
    cy.intercept('GET', `${API_SERVER}/projects/*?t=*`, req => {
      req.reply(200, EDIT_PROJECT_DETAIL);
    }).as('getLocation');
    cy.intercept('PATCH', `${API_SERVER}/projects/*`, req => {
      req.reply(200);
    }).as('getLocation');
  });

  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('Minified React error #299')) {
      return false;
    }
  });

  it('organization navigates to their own project and edits the project', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.enabled').click();
    cy.contains(`Let's begin your fundraising journey`).should('be.visible');

    cy.get('[data-testid=chip]').contains('Mental Health').should('be.visible');
    cy.contains('button','Continue').should('be.enabled').click();

    cy.get('[name="title"]').clear();
    cy.get('[name="title"]').type('test automation');

    cy.get('[name="email"]').clear();
    cy.get('[name="email"]').type('email@test.com');

    cy.get('[name="linkedin"]').clear();
    cy.get('[name="linkedin"]').type('https://linkedin.com/in/test');

    cy.get('[data-testid="description-input"]').should('be.visible').clear();
    cy.get('[data-testid="description-input"]').type('this is a test description {enter}');

    // Italic
    cy.get('[data-testid="description-input"]').contains('button', 'i').click();
    cy.get('[data-testid="description-input"]').type('this is a test description itallic {enter}');

    // Bold
    cy.get('[data-testid="description-input"]').contains('button', 'B').click();
    cy.get('[data-testid="description-input"]').contains('button', 'i').click();
    cy.get('[data-testid="description-input"]').type('this is a bold description {enter}');

    // Italic + Bold
    cy.get('[data-testid="description-input"]').contains('button', 'i').click();
    cy.get('[data-testid="description-input"]').type('this is bold and italic {enter}');

    // Turn off Bold, keep Italic
    cy.get('[data-testid="description-input"]').contains('button', 'B').click();
    cy.get('[data-testid="description-input"]').type('this is only italic now {enter}');

    // Underline only
    cy.get('[data-testid="description-input"]').contains('button', 'i').click(); // Turn off Italic
    cy.get('[data-testid="description-input"]').contains('button', 'u').click();
    cy.get('[data-testid="description-input"]').type('this is underlined {enter}');

    // All: Bold + Italic + Underline
    cy.get('[data-testid="description-input"]').contains('button', 'i').click();
    cy.get('[data-testid="description-input"]').contains('button', 'B').click();
    cy.get('[data-testid="description-input"]').type('this has all three styles {enter}');

    cy.get('.tiptap.ProseMirror')
      .invoke('html')
      .then(html => {
        expect(html).to.include('<p>this is a test description </p>');
        expect(html).to.include('<em class="italic">this is a test description itallic </em>');
        expect(html).to.include('<strong class="font-bold">this is a bold description </strong>');
        expect(html).to.include('<strong class="font-bold"><em class="italic">this is bold and italic </em></strong>');
        expect(html).to.include('<em class="italic">this is only italic now </em>');
        expect(html).to.include('<u class="underline">this is underlined </u>');
        expect(html).to.include(
          '<strong class="font-bold"><em class="italic"><u class="underline">this has all three styles </u></em></strong>',
        );
      });
      
      cy.get('input[type="file"]').first().attachFile('test.jpg');
      cy.get('input[type="file"]').first().attachFile('test.jpg');
      cy.contains('Continue').should('be.enabled');
      cy.contains('Continue').click();
      //step 3

      cy.get('#projectCategory').should('exist');
    cy.get('#projectCategory').click();
    cy.contains('Emerging markets').should('be.visible');
    cy.contains('Open innovation').should('be.visible');
    cy.contains('Women leaders').should('be.visible');
    cy.contains('Women leaders').should('be.visible').click();

    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this is a test paragraph {enter}');

    cy.contains('button', 'B').first().click();
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this test is bold {enter}');

    cy.contains('button', 'i').first().click();
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this text is itallic and bold {enter}');

    cy.contains('button', 'B').first().click();
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this text is only itallic {enter}');

    cy.contains('button', 'i').first().click();
    cy.contains('button', 'u').first().click();
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this text has underline {enter}');

    cy.contains('button', 'i').first().click();
    cy.contains('button', 'B').first().click();
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this text has all at the same time {enter}');

    cy.get('.tiptap.ProseMirror')
      .first()
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

    cy.get('[role=textbox]').eq(1).focus();
    cy.get('[role=textbox]').eq(1).type('this is a test paragraph {enter}');

    cy.get('.tiptap.ProseMirror')
      .eq(1)
      .invoke('html')
      .then(html => {
        expect(html).to.include('<p>this is a test paragraph </p>');
      });
    cy.get('[role=textbox]').eq(2).focus();
    cy.get('[role=textbox]').eq(2).type('this is a test paragraph {enter}');

    cy.get('.tiptap.ProseMirror')
      .eq(2)
      .invoke('html')
      .then(html => {
        expect(html).to.include('<p>this is a test paragraph </p>');
      });

    cy.contains('Continue').should('be.enabled');
    cy.contains('Continue').click();

    //step 4
    cy.contains('Total Amount Requested*').should('be.visible');
    cy.get('[placeholder="Total amount needed for project"]').type('5000');

    cy.contains('Impact Assessment Type*').should('be.visible');
    cy.get('input[value="OPTION_B"]').should('exist');
    cy.get('input[value="OPTION_B"]').click();

    cy.contains('Impact Assessment Details*').should('be.visible');
    cy.get('[role=textbox]').first().focus();
    cy.get('[role=textbox]').first().type('this text has all at the same time {enter}');
    cy.get('[role=textbox]').eq(1).focus();
    cy.get('[role=textbox]').eq(1).type('this text has all at the same time {enter}');
    cy.get('[role=textbox]').eq(2).focus();
    cy.get('[role=textbox]').eq(2).type('this text has all at the same time {enter}');

    cy.contains('Continue').should('be.enabled');
    cy.contains('Continue').click();

    //step 5
    cy.contains('Feasibility and team*').should('be.visible');

    cy.get('[role=textbox]').focus();
    cy.get('[role=textbox]').type('this text has all at the same time {enter}');

    cy.contains('Continue').should('be.enabled');
    cy.contains('Continue').click();
    //step 6
    cy.contains('Add a cover photo').should('be.visible');
    // cy.contains('Continue').should('be.disabled');

    cy.get('input[type="file"]').attachFile('test.jpg');
    cy.contains('Edit Image').should('be.visible');

    cy.contains('Save').click();
    cy.get('[data-testid="image-preview"]').should('exist');
    cy.contains('button','Continue').click();

    //step 7
    cy.contains('Connect a wallet').should('be.visible');
    cy.contains('Preview').should('be.enabled').click();

     cy.contains('Project Summary').should('exist');
    cy.contains('this is a test paragraph').should('exist');

    cy.contains('Problem Statement').should('exist');
    cy.contains('this test is bold').should('exist');

    cy.contains('Solution').should('exist');
    cy.contains('this is a test paragraph').should('exist');

    cy.contains('Key Deliverables & Goals').should('exist');
    cy.contains('this is a test paragraph').should('exist');

    cy.contains('Impact Assessment').should('exist');
    cy.contains('this text has all at the same time').should('exist');

    cy.contains('Voluntary Contribution').should('exist');
    cy.contains('this text has all at the same time').should('exist');

    cy.contains('Funding and budget').should('exist');
    cy.contains('Total Amount Requested: 5000').should('exist');

    cy.contains('Feasibility and team').should('exist');
    cy.contains('this text has all at the same time').should('exist');

    cy.contains('Publish').should('be.enabled');
    cy.contains('Publish').click();

    //step 6 project details
    cy.contains('Project Details').should('be.visible');

  });
  it('organization edits the project website with invalid website url', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.enabled').click();
    cy.contains(`Let's begin your fundraising journey`).should('be.visible');

    cy.get('[data-testid=chip]').contains('Mental Health').should('be.visible');
    cy.contains('button','Continue').should('be.enabled').click();

    cy.get('[name="website"]').clear();
    cy.get('[name="website"]').type('invalid website test');    
    cy.contains('Must be a valid URL').should('be.visible');
  });

  it('organization edits their location', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.enabled').click();
    cy.contains(`Let's begin your fundraising journey`).should('be.visible');

    cy.contains('City / Country').click();

    cy.get('[data-testid="search-dropdown"]').should('exist').type('Tokyo {enter}');    
    cy.contains('Continue').should('be.enabled').click();    
  });
  it('organization edits their social causes', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.enabled').click();
    cy.contains(`Let's begin your fundraising journey`).should('be.visible');

    cy.get('[data-testid="social-causes-input"]').find('[data-testid="home-icon"]').click();
    cy.get('[data-testid="chip"]').eq(1).click();

    cy.contains('Continue').should('be.enabled').click();
  });
  it('organization edits the project name', () => {
    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.enabled').click();
    cy.contains(`Let's begin your fundraising journey`).should('be.visible');
    cy.contains('Continue').should('be.enabled').click();

    cy.get('[name="title"]').clear();
    cy.get('[name="title"]').type('test automation');

    cy.get('[name="email"]').clear();
    cy.get('[name="email"]').type('email@test.com');

    cy.get('[name="linkedin"]').clear();
    cy.get('[name="linkedin"]').type('https://linkedin.com/in/test');

    cy.contains('Continue').should('be.enabled');
  });
  it('organization tries to edit project in not submitable round', () => {
    mockRoundsResponse = ROUNDS;

    cy.visit(`${APP_URL}/projects/*`);
    cy.contains('Project Details').should('be.visible');
    cy.contains('button', 'Edit').should('be.disabled');

    cy.contains('Submissions Closed').should('be.visible');
  });
});
