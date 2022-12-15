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
      cy.visit('http://localhost:3000')

      cy.contains('view').click()
      cy.contains('test-title')
      cy.contains('test-author')
      cy.contains('test-url')
      cy.contains('0')
    })

    it('a blog can be liked', function () {
      const data = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
      }
      cy.createBlog(data)
      cy.visit('http://localhost:3000')
      cy.contains('view').click()

      cy.contains('like').click()
      cy.get('#blog-likes')
        .should('contain', '1')
    })

    it('a blog can be deleted', function () {
      const data = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
      }
      cy.createBlog(data)
      cy.visit('http://localhost:3000')
      cy.contains('view').click()

      cy.contains('delete').click()
      cy.get('.notification')
        .should('contain', 'delete undefined successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'borderStyle', 'solid')
    })

    it('blog list are ordered by likes desc', function () {
      const likesEq1 = {
        title: 'test-title-likesEq1',
        author: 'test-author',
        url: 'test-url',
        likes: 1
      }
      const likesEq2 = {
        title: 'test-title-likesEq2',
        author: 'test-author',
        url: 'test-url',
        likes: 2
      }
      const likesEq3 = {
        title: 'test-title-likesEq3',
        author: 'test-author',
        url: 'test-url',
        likes: 3
      }
      cy.createBlog(likesEq1)
      cy.createBlog(likesEq3)
      cy.createBlog(likesEq2)
      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'test-title-likesEq3')
      cy.get('.blog').eq(1).should('contain', 'test-title-likesEq2')
      cy.get('.blog').eq(2).should('contain', 'test-title-likesEq1')
    })

  })
})

