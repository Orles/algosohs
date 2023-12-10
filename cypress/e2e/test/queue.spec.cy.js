const { CIRCLE } = require('../../../src/constants/element-captions.ts');
const {PINK} = require('../../../src/constants/color')
const {BLUE} = require('../../../src/constants/color');
const {LOCAL_HOST} = require('../../../src/constants/element-captions.ts');

describe('Очередь', () => {
    beforeEach(() => {
        cy.visit(`${LOCAL_HOST}/queue`);
        cy.get('button').contains('Очередь').as('buttonAdd');
        cy.get('button').contains('Удалить').as('buttonDelete');
        cy.get('button').contains('Очистить').as('buttonClear');
        cy.get('input[type="text"]').as('input')
        cy.get(CIRCLE).parent().as('circle')
        cy.get('[data-testid="head"]').as('head')
        cy.get('[data-testid="tail"]').as('tail')
    })
    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@buttonAdd').parent().should('be.disabled')
    })
    it('Проверьте, правильность добавления элемента в очередь', () => {
        cy.get('@input').type(9)
        cy.get('@buttonAdd').click()
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', `4px solid ${PINK}`)
        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@tail').eq(0).should('have.text', 'tail')
        cy.wait(500);
        cy.get('@circle').eq(0).should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@input').type(8)
        cy.get('@buttonAdd').click()
        cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', `4px solid ${PINK}`)
        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@tail').eq(0).should('have.text', '')
        cy.get('@tail').eq(1).should('have.text', 'tail')
        cy.wait(500);
        cy.get('@circle').eq(1).should('have.css', 'border', `4px solid ${BLUE}`)
    })
    it('Проверить правильность удаления элемента из очереди', () => {
        cy.get('@input').type(9)
        cy.get('@buttonAdd').click()
        cy.get('@input').type(8)
        cy.get('@buttonAdd').click()
        cy.wait(500);
        cy.get('@buttonDelete').click()
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', `4px solid ${PINK}`)
        cy.wait(500);
        cy.get('@circle').eq(0).should('have.text', '').should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@head').eq(0).should('have.text', '')
        cy.get('@head').eq(1).should('have.text', 'head')
        cy.get('@tail').eq(1).should('have.text', 'tail')
    })
    it('Проверьте поведение кнопки «Очистить»', () => {
        cy.get('@input').type(9)
        cy.get('@buttonAdd').click()
        cy.get('@input').type(8)
        cy.get('@buttonAdd').click()
        cy.wait(500);
        cy.get('@buttonClear').click()
        cy.wait(500);
        cy.get('@circle').eq(0).should('have.text', '')
        cy.get('@circle').eq(1).should('have.text', '')
    })
})