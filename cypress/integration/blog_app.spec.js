describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testaaja',
      username: 'kokeilu',
      password: 'kokeilu'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Blogs');
  });

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  // it.only('login fails with wrong password', function() {
  //   cy.contains('log in').click()
  //   cy.get('#username').type('wrong')
  //   cy.get('#password').type('wrong')
  //   cy.get('#login-button').click()
  
  //   cy.get('.error')
  //     .should('contain', 'Wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)')
  //     .and('have.css', 'border-style', 'solid')
  
  //   cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  // })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('kokeilu')
    cy.get('#password').type('kokeilu')
    cy.get('#login-button').click()

    cy.contains('Testaaja logged in')
  })

});

describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'kokeilu', password: 'kokeilu' })
  })

  it('a new note can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('titteli')
    cy.get('#author').type('koklu')
    cy.get('#url').type('www')
    cy.contains('add blog').click()

    cy.get('.success')
      .should('contain', 'Testaaja created succesfully blog titteli.')

    cy.contains('Title: titteli Author: koklu')
  })

  it('blog can be liked', function() {
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('Likes: 1')
  })

  it('blog can be removed', function() {
    cy.contains('remove').click();
    cy.get('.success')
      .should('contain', 'titteli has now been removed.')
  });
 
})
