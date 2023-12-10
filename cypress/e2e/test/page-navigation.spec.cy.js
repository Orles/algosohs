const {LOCAL_HOST} = require('../../../src/constants/element-captions.ts');

describe('Тестирование переходов по страницам', function() {
    it('Домашняя страница', () => {
      cy.visit(`${LOCAL_HOST}`);
    });
    it('Строка', () => {
      cy.visit(`${LOCAL_HOST}/recursion`)
    })
    it('Фибоначчи', () => {
      cy.visit(`${LOCAL_HOST}/fibonacci`)
    })
    it('Сортировка', () => {
      cy.visit(`${LOCAL_HOST}/sorting`)
    })
    it('Стек', () => {
      cy.visit(`${LOCAL_HOST}/stack`)
    })
    it('Очередь', () => {
      cy.visit(`${LOCAL_HOST}/queue`)
    })
    it('Список', () => {
      cy.visit(`${LOCAL_HOST}/list`)
    })
  });