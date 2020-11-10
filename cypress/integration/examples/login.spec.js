describe('login to page', () => {
    it('login', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.url().should('include', '/login') 
    })
})