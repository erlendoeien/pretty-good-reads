describe('search for book', () => {
    it('search', () => {
        //go to website
        cy.visit('http://localhost:3000')
        //find the input-field and search for "harry"
        cy.get('[data-cy=input]').type('harry');
        //click the "search" button
        cy.get('[data-cy=submit]').click({force: true})

        //the page shold then show all books containing "harry" in either title or authors
    })
})