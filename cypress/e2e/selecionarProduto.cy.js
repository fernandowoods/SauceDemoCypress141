import 'cypress-xpath'

describe('Selecionar Produto', () => {     // Describe é uma suíte/conjunto de testes

  const massa1 = require('../fixtures/massa')

  beforeEach(() => {
    cy.visit('/')                          // Abre o browser na url informada em cypress.config.js
  })

  it('Selecionar Sauce Labs Backpack', () => {
    cy.title()                            // Verifica se o título da página é Swag Labs
      .should('eq', 'Swag Labs'),

    // realizar o login (inspecionar para ver como pegar cada elemento)
    cy.get('input[data-test="username"]')
      .type('standard_user')

    cy.get('#password')                   // Quando pegamos pelo id (caso exista) podemos usar #
      .type('secret_sauce')

    cy.get('input[name="login-button"]')
      .click()                            // Clica no botão Login

    // carregar a página interna (às vezes pode ser necessário colocar algum comando para esperar o carregamento)

    cy.get('span.title')                  // Pegando por css selector
      .should('have.text', 'Products')    // Verificar se o elemento contém o Products

    cy.get('img[alt="Sauce Labs Backpack"]')
      .click()

    // carregar a página de inventário do produto

    cy.xpath('/html/body/div/div/div/div[1]/div[2]/div/button')   // Em último caso, caso não haja outra forma de pegar o elemento, utilizar o XPath absoluto (precisa instalar o --> npm install -D cypress xpath) (deve importar o cypress-xpath)
      .should('have.text', 'Back to products')                    // Esse caminho do XPath pode acabar se quebrando caso o layout da página seja alterado

    cy.get('div.inventory_details_name.large_size')                // CSS Selector não pode haver espaço (substituído por . )
      .should('have.text', 'Sauce Labs Backpack')

    cy.get('div.inventory_details_price')
      .should('have.text', '$29.99')

    cy.get('#add-to-cart')
      .click()

    cy.get('a.shopping_cart_link')
      .should('have.text', '1')                                  // Verifica se no carrinho exibe o número 1
      .click()

    cy.get('span.title')
      .should('have.text', 'Your Cart')

    cy.get('div.inventory_item_name')
      .should('have.text', 'Sauce Labs Backpack')

    cy.get('div.inventory_item_price')
      .should('have.text', '$29.99')

    cy.get('div.cart_quantity')
      .should('to.have', '1')                                     // PERGUNTAR TERIA COMO SER EQ

  })

  massa1.array.forEach(({ username, productName, productPrice }) => {
    it(`Selecionar ${productName} - Usuario: ${username}`, () => {
      cy.title()                            // Verifica se o título da página é Swag Labs
        .should('eq', 'Swag Labs'),

      // realizar o login (inspecionar para ver como pegar cada elemento)
      cy.get('input[data-test="username"]')
        .type(username)

      cy.get('#password')                   // Quando pegamos pelo id (caso exista) podemos usar #
        .type('secret_sauce')

      cy.get('input[name="login-button"]')
        .click()                            // Clica no botão Login

      // carregar a página interna (às vezes pode ser necessário colocar algum comando para esperar o carregamento)

      cy.get('span.title')                  // Pegando por css selector
        .should('have.text', 'Products')    // Verificar se o elemento contém o Products

      cy.get(`img[alt="${productName}"]`)
        .click()

      // carregar a página de inventário do produto

      cy.xpath('/html/body/div/div/div/div[1]/div[2]/div/button')   // Em último caso, caso não haja outra forma de pegar o elemento, utilizar o XPath absoluto (precisa instalar o --> npm install -D cypress xpath) (deve importar o cypress-xpath)
        .should('have.text', 'Back to products')                    // Esse caminho do XPath pode acabar se quebrando caso o layout da página seja alterado

      cy.get('div.inventory_details_name.large_size')                // CSS Selector não pode haver espaço (substituído por . )
        .should('have.text', productName)

      cy.get('div.inventory_details_price')
        .should('have.text', productPrice)

      cy.get('#add-to-cart')
        .click()

      cy.get('a.shopping_cart_link')
        .should('have.text', '1')                                  // Verifica se no carrinho exibe o número 1
        .click()

      cy.get('span.title')
        .should('have.text', 'Your Cart')

      cy.get('div.inventory_item_name')
        .should('have.text', productName)

      cy.get('div.inventory_item_price')
        .should('have.text', productPrice)

      cy.get('div.cart_quantity')
        .should('to.have', '1')                                     // PERGUNTAR TERIA COMO SER EQ

    })
  })

  /*
   afterEach(() => {
    cy.get('#remove-sauce-labs-backpack')
      .click()

    cy.get('#react-burger-menu-btn')
      .click()

    cy.get('#logout_sidebar_link', { timeout: 10000 })             // Tempo máximo de espera
      .should('be.visible')                                        // Esperar até que o elemento seja visível   (também pode utilizar .should(not.be.disabled))
      .click()

    cy.get('#login-button')
      .should('be.visible')                                       // verificar se está novamente na tela de login

  })
  */
  // rodando em cypress não precisa do afterEach, ele já remove as configurações a cada teste
})