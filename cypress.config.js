const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    chromeWebSecurity: false, // Para a segurança do Chrome não atrapalhar nos testes
    viewportHeight: 1080, // altura em pixels
    viewportWidth: 1920, // largura em pixels --> Full HD
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
