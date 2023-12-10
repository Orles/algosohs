describe('Строка', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
        cy.get('input[type="text"]').as('input')
        cy.get('button[type="submit"]').as('button');

    })

    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled')
    })

    it('Проверьте, что строка разворачивается корректно', () => {
        cy.get('@input').type('абвгд')
        cy.get('@button').should('not.be.disabled').click()
        cy.get('[data-testid="circle"]').parent().as('circle')
        cy.get('@circle').eq(0).should('have.text', 'а').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('have.text', 'б').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('have.text', 'в').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(3).should('have.text', 'г').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(4).should('have.text', 'д').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(1000)
        cy.get('@circle').eq(0).should('have.text', 'д').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(4).should('have.text', 'а').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.wait(1000)
        cy.get('@circle').eq(1).should('have.text', 'г').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(2).should('have.text', 'в').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(3).should('have.text', 'б').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    })
}) 