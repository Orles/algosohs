const {LOCAL_HOST} = require('../../../src/constants/element-captions.ts');
describe('Тестирование работоспособности приложения', function() {
    it('должно быть доступно на localhost:3000', function() {
      cy.visit(`${LOCAL_HOST}`);
    });
  }); 