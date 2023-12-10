const { CIRCLE } = require('../../../src/constants/element-captions.ts');
const {PINK} = require('../../../src/constants/color')
const {BLUE} = require('../../../src/constants/color');
const {LOCAL_HOST} = require('../../../src/constants/element-captions.ts');

describe('Стек', () => {
    beforeEach(() => {
        cy.visit(`${LOCAL_HOST}/stack`);
        cy.get('input[type="text"]').as('input')
        cy.get('button').contains('Добавить').as('buttonAdd')
        cy.get('button').contains('Удалить').as('buttonDelete')
        cy.get('button').contains('Очистить').as('buttonClear')
    })

    it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@buttonAdd').parent().should('be.disabled')
    })
    it('Проверьте правильность добавления элемента в стек', () => {
        cy.get('@input').type(9);
        cy.get('@buttonAdd').click()
        cy.get(CIRCLE).parent().as('circle')
        cy.get('@circle').eq(0).should('have.text', '9').should('have.css', 'border', `4px solid ${PINK}`)
        cy.wait(500)
        cy.get('@circle').eq(0).should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@input').type(8);
        cy.get('@buttonAdd').click()
        cy.get('@circle').eq(1).should('have.text', '8').should('have.css', 'border', `4px solid ${PINK}`)
        cy.wait(500)
        cy.get('@circle').eq(1).should('have.css', 'border', `4px solid ${BLUE}`)
    })
    it('Проверить правильность удаления элемента из стека', () => {
        cy.get('@input').type(9);
        cy.get('@buttonAdd').click()
        cy.get('@input').type(8);
        cy.get('@buttonAdd').click()
        cy.get(CIRCLE).as('circle')
        cy.wait(500)
        cy.get('@circle').eq(0).should('exist')
        cy.get('@circle').eq(1).should('exist')
        cy.get('@buttonDelete').click()
        cy.get('@circle').eq(0).should('exist')
        cy.get('@circle').eq(1).should('not.exist')
    })
    it('Проверьте поведение кнопки «Очистить»', () => {
        cy.get('@input').type(9);
        cy.get('@buttonAdd').click()
        cy.get('@input').type(8);
        cy.get('@buttonAdd').click()
        cy.get(CIRCLE).as('circle')
        cy.wait(500)
        cy.get('@circle').should('exist')
        cy.get('@buttonClear').click()
        cy.wait(500)
        cy.get('@circle').should('not.exist')
    })
})