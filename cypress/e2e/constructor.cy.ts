import * as tokens from '../fixtures/tokens.json';
describe('проверяем конструктор', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    window.localStorage.setItem('accessToken', tokens.accessToken);
    window.localStorage.setItem('refreshToken', tokens.refreshToken);
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000/');
  });
  describe('составления бургера', function () {
    it('добавление булки', function () {
      cy.get('[data-cy="bun-top"]').should('not.exist');
      cy.get('[data-cy="bun-bottom"]').should('not.exist');
      cy.get('[data-cy="bun"]')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });
      cy.get('[data-cy="bun-top"]').should('exist');
      cy.get('[data-cy="bun-bottom"]').should('exist');
    });
    it('добавление начинки', function () {
      cy.get('[data-cy="main-component"]').should('not.exist');
      cy.get('[data-cy="main"]')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });
      cy.get('[data-cy="main-component"]').should('exist');
    });
  });
  describe('проверка модального окна', function () {
    it('открытие модального окна', function () {
      cy.get('[data-cy="bun"]')
        .first()
        .within(() => {
          cy.get('.text_type_main-default').invoke('text').as('bunName');
        });
      cy.get('[data-cy="bun"]')
        .first()
        .within(() => {
          cy.get('a').click();
        });
      cy.get('[data-cy="modal"]').should('exist');
      cy.get('@bunName').then((bunName) => {
        cy.get('[data-cy="modal"]').within(() => {
          cy.get('h3').should('contain', bunName);
        });
      });
    });
    it('закрытие модального окна на крестик', function () {
      cy.get('[data-cy="bun"]')
        .first()
        .within(() => {
          cy.get('a').click();
        });
      cy.get('[data-cy="modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
    it('закрытие модального окна по оверлею', function () {
      cy.get('[data-cy="bun"]')
        .first()
        .within(() => {
          cy.get('a').click();
        });
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
  describe('отправка бургера', function () {
    it('оформление заказа', function () {
      cy.get('[data-cy="bun"]')
        .first()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get('[data-cy="main"]')
        .first()
        .find('button')
        .contains('Добавить')
        .click();
      cy.get('button').contains('Оформить заказ').click();
      cy.get('[data-cy="modal"]').should('exist');
      cy.fixture('order.json').then((order) => {
        cy.get('[data-cy="orderNumber"]').should('contain', order.order.number);
      });
      cy.get('[data-cy="modal-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="bun-top"]').should('not.exist');
      cy.get('[data-cy="bun-bottom"]').should('not.exist');
      cy.get('[data-cy="main-component"]').should('not.exist');
    });
  });
});
