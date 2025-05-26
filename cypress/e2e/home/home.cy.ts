import { API_SERVER, APP_URL } from "../constants/constants";
import { PROJECTS, ROUNDS } from "./mocks";

describe('home page test', () => {
    beforeEach(() => {
        cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
            req.reply(200, ROUNDS);
        });
        cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
            req.reply(200);
        });
        cy.intercept('GET', 'https://cdn.commoninja.com/api/v1/embed/*', req => {
            req.reply(200);
        });
        cy.intercept('POST', 'https://events.framer.com/anonymous', req => {
            req.reply(200);
        });

        // explore projects intercepts

        cy.intercept('GET', `${API_SERVER}/projects?t=*&page=1&limit=10`, req => {
            req.reply(200, PROJECTS);
        }).as('getProjects');
    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #299')) {
            return false;
        }
    });
    it('user navigates to home and clicks on explore and sees projects', () => {
        cy.visit(`${APP_URL}/home`);
        cy.contains('Make your impact').should('exist');
        cy.contains('button', 'Explore').should('be.visible');
        cy.contains('button', 'Explore').click();

        cy.contains('New Round').should('be.visible');
        cy.wait('@getProjects');

        cy.get('[data-testid="project-card"]').should('exist');
    });
    it('navigates to home and clicks Learn more (cross-origin)', () => {
        cy.visit(`${APP_URL}/home`);
        cy.contains('Make your impact').should('exist');

        cy.contains('Learn more')
            .should('have.attr', 'href')
            .then((href) => {
                if (!href) return;

                const url = new URL(href);
                const origin = url.origin;
                const path = url.pathname + url.search;

                cy.origin(
                    origin,
                    { args: { path } },
                    ({ path }) => {
                        cy.on('uncaught:exception', () => false);
                        cy.visit(path);
                        cy.contains('Rewards').should('exist'); // Adjust based on expected GitBook content
                    }
                );
            });
    });
    it('user navigates to Home from page navigator', () => {
        cy.visit(`${APP_URL}/projects`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').first().click();
        cy.contains('Make your impact').should('exist');
    });
});
