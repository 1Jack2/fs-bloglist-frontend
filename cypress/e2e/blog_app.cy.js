describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'jack',
      username: 'j3z',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('success with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('j3z')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('j3z')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'borderStyle', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe.only('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'j3z', password: '12345' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      const data = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
      }
      const notificationMsg = `a new blog ${data.title} by ${data.author} added`
      cy.get('#blog-title').type(data.title)
      cy.get('#blog-author').type(data.author)
      cy.get('#blog-url').type(data.url)
      cy.get('#create-blog-button').click()
      cy.get('.notification')
        .should('contain', notificationMsg)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'borderStyle', 'solid')
    })

    it('a blog detail can be viewed', function () {
      const data = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
      }
      cy.createBlog(data)

      cy.contains('view').click()
      cy.contains('test-title')
      cy.contains('test-author')
      cy.contains('test-url')
      cy.contains('0')
    })

    it.only('a blog can be liked', function () {
      const data = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
      }
      cy.createBlog(data)
      cy.contains('view').click()

      cy.contains('like').click()
      cy.get('#blog-likes')
        .should('contain', '1')
    })

  })
})

