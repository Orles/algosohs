describe('Список', () => {
    beforeEach('', () => {
        cy.visit('http://localhost:3000/list');
        cy.get('button').contains('Добавить в head').as('buttonAddToHead')
        cy.get('button').contains('Добавить в tail').as('buttonAddToTail')
        cy.get('button').contains('Удалить из head').as('buttonDeleteFromHead')
        cy.get('button').contains('Удалить из tail').as('buttonDeleteFromTail')
        cy.get('button').contains('Добавить по индексу').as('buttonAddByIndex')
        cy.get('button').contains('Удалить по индексу').as('buttonDeleteByIndex')
        cy.get('input[type="text"]').as('inputValue')
        cy.get('input[type="number"]').as('inputIndex')
        cy.get('[data-testid="circle"]').parent().as('circle')
        cy.get('[data-testid="head"]').as('head')
        cy.get('[data-testid="tail"]').as('tail')
    })
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже.', () => {
        cy.get('@inputValue').should('have.value', '');
        cy.get('@buttonAddToHead').parent().should('be.disabled')
        cy.get('@buttonAddToTail').parent().should('be.disabled')
        cy.get('@inputIndex').should('have.value', '');
        cy.get('@buttonAddByIndex').parent().should('be.disabled')
        cy.get('@buttonDeleteByIndex').parent().should('be.disabled')
    })
    it('Проверьте корректность отрисовки дефолтного списка', () => {
        cy.get('@circle').eq(0).should('have.text', '0').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('have.text', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('have.text', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(3).should('have.text', '1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@tail').eq(3).should('have.text', 'tail')
    })

    it('Проверьте корректность добавления элемента в head', () => {
        cy.get('@inputValue').type(9);
        cy.get('@buttonAddToHead').click();
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@head').eq(0).should('have.text', 'head')
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Проверьте корректность добавления элемента в tail', () => {
        cy.get('@inputValue').type(9);
        cy.get('@buttonAddToTail').click();
        cy.get('@circle').eq(3).should('have.text', '9').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(4).should('have.text', '9').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@tail').eq(4).should('have.text', 'tail')
        cy.wait(500)
        cy.get('@circle').eq(4).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Проверьте корректность добавления элемента по индексу' , () => {
        cy.get('@inputValue').type(9);
        cy.get('@inputIndex').type(1);
        cy.get('@buttonAddByIndex').click();
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(1).should('have.text', '9').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(1).should('have.text', '9').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.wait(500)
        cy.get('@circle').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Проверьте корректность удаления элемента из head', () => {
        cy.get('@buttonDeleteFromHead').click();
        cy.get('@circle').eq(0).should('have.text', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('have.text', '0').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.text', '34').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })

    it('Проверьте корректность удаления элемента из tail', () => {
        cy.get('@buttonDeleteFromTail').click();
        cy.get('@circle').eq(3).should('have.text', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(4).should('have.text', '1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@tail').eq(2).should('have.text', 'tail')
    })
    
    it('Проверьте корректность удаления элемента по индексу', () => {
        cy.get('@inputIndex').type(1);
        cy.get('@buttonDeleteByIndex').click();
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle').eq(1).should('have.text', '').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(2).should('have.text', '34').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    })
})