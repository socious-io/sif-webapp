import { ACCESS_TOKEN, API_SERVER, APP_URL, REFRESH_TOKEN, TOKEN_TYPE } from "../constants/constants";
import { IDENTITIES, PROJECTS, ROUNDS } from "./mocks";

describe('Logout test', () => {
    beforeEach(() => {
        cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
            req.reply(200, ROUNDS);
        });
        cy.intercept('GET', `${API_SERVER}/identities?t=*`,
            req => {
                req.reply(200, IDENTITIES);
            }
        );
        cy.intercept('GET', 'https://cdn.commoninja.com/api/v1/embed/*', req => {
            req.reply(200);
        });
        cy.intercept('POST', 'https://events.framer.com/anonymous', req => {
            req.reply(200);
        });        

        cy.intercept('GET', `${API_SERVER}/projects?t=*&page=1&limit=10`, req => {
            req.reply(200, PROJECTS);
        }).as('getProjects');

        cy.setCookie('access_token', ACCESS_TOKEN);
        cy.setCookie('refresh_token', REFRESH_TOKEN);
        cy.setCookie('token_type', TOKEN_TYPE);
    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #299')) {
            return false;
        }
    });
    it('user navigates to home page and clicks on logout from profile dropdown', () => {
        cy.visit(`${APP_URL}/home`);
        cy.contains('Make your impact').should('exist');

        cy.getCookie('access_token').should('exist');
        cy.getCookie('refresh_token').should('exist');
        cy.getCookie('token_type').should('exist');

        cy.get('[data-testid="avatar-icon"]').should('exist');
        cy.get('[data-testid="avatar-icon"]').click();

        cy.contains('Logout')
            .should('exist')
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.getCookie('access_token').should('be.null');
        cy.getCookie('refresh_token').should('be.null');
        cy.getCookie('token_type').should('be.null');

        cy.url().should('contain', '/intro');
        cy.contains('Create account').should('be.visible');
    });
});
