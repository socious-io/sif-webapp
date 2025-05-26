import { API_SERVER, APP_URL } from "../constants/constants";
import { COMMENTS, IDENTITIES, PROJECT_DETAIL, PROJECTS, ROUNDS, VOTE } from "./mocks";


describe('vote to a project test', () => {
    beforeEach(() => {
        cy.intercept('GET', `${API_SERVER}/projects/*?t=*`,
            req => {
                req.reply(200, PROJECTS);
            }
        ).as('getProjects');
        cy.intercept('GET', `${API_SERVER}/projects/*?t=*`,
            req => {
                req.reply(200, PROJECT_DETAIL);
            }
        ).as('getProjectDetails');
        cy.intercept('GET', `${API_SERVER}/rounds?t=*`,
            req => {
                req.reply(200, ROUNDS);
            }
        );
        cy.intercept('GET', `${API_SERVER}/identities?t=*`,
            req => {
                req.reply(200, IDENTITIES);
            }
        );
        cy.intercept('GET', `${API_SERVER}/projects/*/comments?t=*&page=1&limit=5`,
            req => {
                req.reply(200, COMMENTS);
            }
        );
        cy.intercept('POST', `${API_SERVER}/projects/*/votes`,
            req => {
                req.reply(200, VOTE);
            }
        ).as('vote');
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
        cy.intercept('GET', `https://js.stripe.com/v3/.deploy_status_henson.json`, req => {
            req.reply(200);
        });

    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #299')) {
            return false;
        }
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('rateUsd')) {
                return false;
            }
        });
    });

    it('user votes to a project with vote without donation', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('Overview').should('be.visible');

        cy.contains('Vote now').scrollIntoView().should('exist').should('be.enabled');
        cy.contains('Vote now').click();

        cy.contains('Vote without donation').should('exist');
        cy.contains('Vote without donation').click();
        cy.contains('Vote now').should('exist');
        cy.contains('Vote now').click();
        cy.wait('@vote');

        cy.contains('Thank you for your vote!').should('be.visible');
        cy.contains('Continue').should('exist');
        cy.contains('Continue').click();
        cy.wait('@getProjects').its('response.statusCode').should('eq', 200);
    });

    it('user votes to a project with vote with a donation', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('Overview').should('be.visible');

        cy.contains('Vote now').scrollIntoView().should('exist').should('be.enabled');
        cy.contains('Vote now').click();

        cy.contains('Vote with a donation').should('exist');
        Cypress.once('uncaught:exception', () => false);
        cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });

        cy.contains('Donate now').should('exist').should('be.disabled');
        cy.get('#donate').should('exist');

        cy.get('input#donate').focus();
        cy.contains('ADA').should('be.visible');
    });
    it('user votes to a project with vote with a donation with unvalid amount', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('Overview').should('be.visible');

        cy.contains('Vote now').scrollIntoView().should('exist').should('be.enabled');
        cy.contains('Vote now').click();

        cy.contains('Vote with a donation').should('exist');
        Cypress.once('uncaught:exception', () => false);
        cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });

        cy.contains('Donate now').should('exist').should('be.disabled');
        cy.get('#donate').should('exist');

        cy.get('input#donate').focus();
        // cy.contains('ADA').should('be.visible');
        // cy.get('[data-testid="currency"]').contains('ADA').should('be.visible');

        cy.get('input#donate').type('0');
        // cy.contains('Value must be a positive integer').should('be.visible');
    });
    it('user votes to a project with vote with a donation and checks USDM', () => {
        cy.visit(`${APP_URL}/projects/*`);
        cy.contains('Project Details').should('be.visible');
        cy.contains('Overview').should('be.visible');

        cy.contains('Vote now').scrollIntoView().should('exist').should('be.enabled');
        cy.contains('Vote now').click();

        cy.contains('Vote with a donation').should('exist');
        Cypress.once('uncaught:exception', () => false);
        cy.get('[data-testid="RadioButtonCheckedIcon"]').eq(1).click({ force: true });

        cy.contains('Donate now').should('exist').should('be.disabled');
        cy.get('#donate').should('exist');

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

        cy.contains('Share').scrollIntoView().should('exist');
        cy.contains('Share').click({ force: true });
    });

});
