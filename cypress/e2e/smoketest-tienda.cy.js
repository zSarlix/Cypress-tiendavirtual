
describe('Pruebas automatizadas Swaglabs', () => {
 

  it('smoke test login page', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="login-button"]').should('be.visible')
    cy.get('.login_credentials_wrap-inner').should('be.visible')
    
  })

  it('Prueba que un cliente puede agregar o eliminar articulos del carrito', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.shopping_cart_badge').contains('2')
    cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('.shopping_cart_badge').contains('1')
  })

  it('Prueba  checkout de una compra exitosa en la tienda', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Esteban')
    cy.get('[data-test="lastName"]').type('Balvin')
    cy.get('[data-test="postalCode"]').type('6021')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').contains('Thank you for your order!')

  })

})