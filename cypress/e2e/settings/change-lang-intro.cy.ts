import { API_SERVER, APP_URL } from "../constants/constants";
import { ROUNDS } from "./mocks";

describe('Change language on intro page test', () => {
    beforeEach(() => {
        cy.intercept('GET', `${API_SERVER}/identities?t=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `${API_SERVER}/rounds?t=*`, req => {
            req.reply(200, ROUNDS);
        });
    });

    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #299')) {
            return false;
        }
    });
    it('user changes the language on the intro page to Japanese', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('Japanese').should('be.visible');
        cy.contains('Japanese').click();

        cy.contains('アカウントを作成').should('be.visible');
    });
    it('user changes the language on the intro page to Spanish', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('Spanish').should('be.visible');
        cy.contains('Spanish').click();

        cy.contains('Crear cuenta').should('be.visible');
    });
    it('user changes the language on the intro page to Korean', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('Korean').should('be.visible');
        cy.contains('Korean').click();

        cy.contains('계정 만들기').should('be.visible');
    });
    it('user changes the language on the intro page to Arabic', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('Arabic').should('be.visible');
        cy.contains('Arabic').click();

        cy.contains('إنشاء حساب').should('be.visible');
    });
    it('user changes the language on the intro page to chinese', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('Chinese').should('be.visible');
        cy.contains('Chinese').click();

        cy.contains('创建账户').should('be.visible');
    });
    it('user changes the language on the intro page to French', () => {
        cy.visit(`${APP_URL}/intro`);
        cy.get('[data-testid="home-icon"]').should('exist');
        cy.get('[data-testid="home-icon"]').click();

        cy.contains('French').should('be.visible');
        cy.contains('French').click();

        cy.contains('Créer un compte').should('be.visible');
    });
});
