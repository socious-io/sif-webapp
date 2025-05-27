import { API_SERVER, APP_URL } from "../constants/constants";
import { ROUNDS, VERIFIED_ORG, SUBMITABLE_ROUNDS, MEDIA, POST_PROJECTS, NEW_PROJECT_DETAIL, LOCATIONS, NOT_VERIFIED_ORG, EDIT_PROJECT_DETAIL } from "./mocks";

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
        cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`, req => {
            req.reply(200, { "limit": 5, "page": 1, "results": [], "total": 0 });
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

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #299')) {
            return false;
        }
    });

    it('organization navigates to their own project and edits the project', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[name="title"]').clear().type('test automation');

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

        cy.get('.tiptap.ProseMirror').invoke('html').then(html => {
            expect(html).to.include('<p>this is a test description </p>');
            expect(html).to.include('<em class="italic">this is a test description itallic </em>');
            expect(html).to.include('<strong class="font-bold">this is a bold description </strong>');
            expect(html).to.include('<strong class="font-bold"><em class="italic">this is bold and italic </em></strong>');
            expect(html).to.include('<em class="italic">this is only italic now </em>');
            expect(html).to.include('<u class="underline">this is underlined </u>');
            expect(html).to.include('<strong class="font-bold"><em class="italic"><u class="underline">this has all three styles </u></em></strong>');
        });

        cy.get('input[type="file"]').first().attachFile('test.jpg');
        cy.get('input[type="file"]').eq(1).attachFile('test.jpg');
        cy.contains('Save').click();

        cy.contains('You cannot change your wallet address').should('be.visible');
        cy.contains('Publish').should('be.enabled').click();
    });
    it('organization edits the project website with invalid website url', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[name="website"]').clear().type('invalid website test');
        cy.contains('Publish').should('be.enabled').click();
        cy.get('[name="website"]').should('have.focus');
    });
    it('organization edits the project website with valid website url', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[name="website"]').clear().type('https://website.com');
        cy.contains('Publish').should('be.enabled').click();

        cy.contains('Project Details').should('be.visible');
    });
    it('organization edits their location', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[data-testid="search-dropdown"]').should('exist').type('Tokyo {enter}');
        cy.contains('Publish').should('be.enabled').click();
        cy.contains('Project Details').should('be.visible');
    });
    it('organization edits their social causes', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[data-testid="social-causes-input"]').find('[data-testid="home-icon"]').click();
        cy.get('[data-testid="chip"]').eq(1).click();

        cy.contains('Publish').should('be.enabled').click();
        cy.contains('Project Details').should('be.visible');
    });
    it('organization edits the project name', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('[name="title"]').clear().type('test automation');

        cy.contains('Publish').should('be.enabled').click();
        cy.contains('Project Details').should('be.visible');
    });
    it('organiztion edits the project banner', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.enabled').click();
        cy.contains('Edit project').should('be.visible');

        cy.get('input[type="file"]').first().attachFile('test.jpg');
        cy.get('input[type="file"]').eq(1).attachFile('test.jpg');
        cy.contains('Save').click();
    });
    it('organization tries to edit project in not submitable round', () => {
        mockRoundsResponse = ROUNDS;

        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('button', 'Edit').should('be.disabled');

        cy.contains('Submissions Closed').should('be.visible');
    });
});
