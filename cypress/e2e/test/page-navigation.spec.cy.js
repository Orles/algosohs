describe('Тестирование переходов по страницам', function() {
    it('Домашняя страница', () => {
      cy.visit('http://localhost:3000');
    });
    it('Строка', () => {
      cy.visit('http://localhost:3000/recursion')
    })
    it('Фибоначчи', () => {
      cy.visit('http://localhost:3000/fibonacci')
    })
    it('Сортировка', () => {
      cy.visit('http://localhost:3000/sorting')
    })
    it('Стек', () => {
      cy.visit('http://localhost:3000/stack')
    })
    it('Очередь', () => {
      cy.visit('http://localhost:3000/queue')
    })
    it('Список', () => {
      cy.visit('http://localhost:3000/list')
    })
  });