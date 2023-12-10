const { CIRCLE } = require('../../../src/constants/element-captions.ts');
const {PINK} = require('../../../src/constants/color')
const {BLUE} = require('../../../src/constants/color');
const {GREEN} = require('../../../src/constants/color');
const {LOCAL_HOST} = require('../../../src/constants/element-captions.ts');

describe('Строка', () => {
    beforeEach(() => {
        cy.visit(`${LOCAL_HOST}/recursion`);
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
        cy.get(CIRCLE).parent().as('circle')
        cy.get('@circle').eq(0).should('have.text', 'а').should('have.css', 'border', `4px solid ${PINK}`)
        cy.get('@circle').eq(1).should('have.text', 'б').should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@circle').eq(2).should('have.text', 'в').should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@circle').eq(3).should('have.text', 'г').should('have.css', 'border', `4px solid ${BLUE}`)
        cy.get('@circle').eq(4).should('have.text', 'д').should('have.css', 'border', `4px solid ${PINK}`)
        cy.wait(1000)
        cy.get('@circle').eq(0).should('have.text', 'д').should('have.css', 'border', `4px solid ${GREEN}`)
        cy.get('@circle').eq(4).should('have.text', 'а').should('have.css', 'border', `4px solid ${GREEN}`)
        cy.wait(1000)
        cy.get('@circle').eq(1).should('have.text', 'г').should('have.css', 'border', `4px solid ${GREEN}`)
        cy.get('@circle').eq(2).should('have.text', 'в').should('have.css', 'border', `4px solid ${GREEN}`)
        cy.get('@circle').eq(3).should('have.text', 'б').should('have.css', 'border', `4px solid ${GREEN}`)
    })
}) 