describe('Фибоначчи', () => {
    beforeEach(() => {
       cy.visit('http://localhost:3000/fibonacci');
       cy.get('input[type="number"]').as('input');
       cy.get('button[type="submit"]').as('button');
    })

   it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
   }) 

   it('Проверьте, что числа генерируются корректно', () => {
    cy.get('@input').type(5)
    cy.get('@button').click()
    cy.get('[data-testid="circle"]').as('circle')
    cy.get('@circle').eq(0).should('have.text', '1')
    cy.wait(500)
    cy.get('@circle').eq(1).should('have.text', '1')
    cy.wait(500)
    cy.get('@circle').eq(2).should('have.text', '2')
    cy.wait(500)
    cy.get('@circle').eq(3).should('have.text', '3')
    cy.wait(500)
    cy.get('@circle').eq(4).should('have.text', '5')
    cy.wait(500)
    cy.get('@circle').eq(5).should('have.text', '8')
   })
})