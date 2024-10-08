const bunId= '60666c42cc7b410027a1a9b2';
const mainId='60666c42cc7b410027a1a9b5';
const bunName='Флюоресцентная булка R2-D3';
const modalOverlay = '[data-cy="modal-overlay"]';
const burgerConstructor = '[data-cy="constructor"]';
const orderBtn = '[data-cy="order-button"]';
const modal = '[data-cy="modal"]';

describe('App',() => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    window.localStorage.setItem('accessToken', JSON.stringify('Bearer mock'));
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should redirect logged-in user to home page', () => {
    cy.visit('/login');
    cy.url().should('eq', 'http://localhost:3000/stellar-burger');
  });

  const openIngredientModal = (ingredientId) => {
    cy.get(`[data-testid="ingredient-${ingredientId}"]`).click();
    cy.get(modal).should('be.visible');
  };

  const closeIngredientModal = () => {
    cy.get('[data-cy="close-modal-btn"]').click();
    cy.get(modal).should('not.exist');
  };


  it('should open modal with ingredient details ',()=>{
    openIngredientModal(bunId);
    cy.get('[data-testid^="ingredient-name"]').contains(bunName);
  });

  it('should close modal when clicking on close button', () => {
    openIngredientModal(bunId);
    closeIngredientModal();
  });

  it('should close modal when pressing Esc key', () => {
    openIngredientModal(bunId);

    cy.get('body').type('{esc}');
    cy.get(modal).should('not.exist');
  });

  it('should close modal when clicking on overlay', () => {
    openIngredientModal(bunId);

    cy.get(modalOverlay).each(() => {
      cy.get(modalOverlay).first().click({ force: true });
    });
    cy.get(modal).should('not.exist');
  });

  it('should allow drag-n-drop and disable order button if no bun is present', () => {
    cy.get(`[data-testid="ingredient-${mainId}"]`).trigger('dragstart');
    cy.get(burgerConstructor).trigger('drop');
    cy.get(orderBtn).should('be.disabled');

    cy.get(`[data-testid="ingredient-${bunId}"]`)
      .trigger('dragstart');
    cy.get(burgerConstructor).trigger('drop');
    cy.get(orderBtn).should('not.be.disabled');
  });
});
