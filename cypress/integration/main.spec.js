describe('Art App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Home', () => {
    beforeEach(() => {
      cy.get('nav > a')
        .contains('Home')
        .click()
    })

    it('has the right path', () => {
      cy.location('pathname').should('include', '')
    })

    it('has the correct title', () => {
      cy.title().should('include', 'Art App')
    })

    it('shows the correct header text', () => {
      cy.get('[data-cy="header-title"]').should('contain', 'Recommended Works')
    })

    it('shows a card with image, title, content', () => {
      cy.get('[data-cy="card-image"]')
        .contains('[style="background-image"]')
        .should('have.length', 0)
      cy.get('[data-cy="card-content"]')
        .contains('[class="Bookmark"]')
        .should('have.length', 0)
      cy.get('[data-cy="card-content"]').should('have.length', 9)
      cy.get('[data-cy="card-content"]').should('have.length', 9)
    })
  })

  describe('Explore', () => {
    beforeEach(() => {
      cy.get('nav > a')
        .contains('Explore')
        .click()
    })

    it('has the right path', () => {
      cy.location('pathname').should('include', 'explore')
    })

    it('shows the correct header text', () => {
      cy.get('[data-cy="header-title"]').should('contain', 'Explore')
    })
  })
})
