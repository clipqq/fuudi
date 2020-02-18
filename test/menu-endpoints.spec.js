const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Menu Endpoints', function() {
  let db

  const {
    testUsers,
    testMenuItems,
    testReviews,
  } = helpers.makeMenuFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /menu`, () => {
    context(`Given no menu items`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/menu')
          .expect(200, [])
      })
    })

    // context('Given there are menu items in the database', () => {
    //   beforeEach('insert menu items', () =>
    //     helpers.seedMenuTables(
    //       db,
    //       testUsers,
    //       testMenuItems,
    //       testReviews,
    //     )
    //   )

    //   it('responds with 200 and all of the menu items', () => {
    //     const expectedMenu = testMenuItems.map(menuItem =>
    //       helpers.makeExpectedMenu(
    //         testUsers,
    //         menuItem
    //       )
    //     )
    //     return supertest(app)
    //       .get('/menu')
    //       .expect(200, expectedMenu)
    //   })
    // })

    context(`Given an XSS attack menuItem`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousMenu,
        expectedMenu,
      } = helpers.makeMaliciousMenu(testUser)

      beforeEach('insert malicious menuItem', () => {
        return helpers.seedMaliciousMenuItem(
          db,
          testUser,
          maliciousMenu,
        )
      })

      it('removes XSS attack description', () => {
        return supertest(app)
          .get(`/menu`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedMenu.title)
            expect(res.body[0].description).to.eql(expectedMenu.description)
          })
      })
    })
  })

  // describe(`GET /menu/:menuItem_id`, () => {
  //   context(`Given no menu items`, () => {
  //     beforeEach(() =>
  //       db.into('fuudi_users').insert(testUsers)
  //     )

  //     it(`responds with 404`, () => {
  //       const menuItemId = 123456
  //       return supertest(app)
  //         .get(`/menu/${menuItemId}`)
  //         .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //         .expect(404, { error: `Menu item doesn't exist` })
  //     })
  //   })

  //   // context('Given there are menu items in the database', () => {
  //   //   beforeEach('insert menu items', () =>
  //   //     helpers.seedMenuTables(
  //   //       db,
  //   //       testUsers,
  //   //       testMenuItems,
  //   //       testReviews,
  //   //     )
  //   //   )

  //   //   it('responds with 200 and the specified menuItem', () => {
  //   //     const menuItemId = 2
  //   //     const expectedMenu = helpers.makeExpectedMenu(
  //   //       testUsers,
  //   //       testMenuItems[menuItemId - 1],
  //   //       testReviews,
  //   //     )

  //   //     return supertest(app)
  //   //       .get(`/menu/${menuItemId}`)
  //   //       .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //   //       .expect(200, expectedMenu)
  //   //   })
  //   // })

  //   context(`Given an XSS attack menuItem`, () => {
  //     const testUser = helpers.makeUsersArray()[1]
  //     const {
  //       maliciousMenu,
  //       expectedMenu,
  //     } = helpers.makeMaliciousMenu(testUser)

  //     beforeEach('insert malicious menuItem', () => {
  //       return helpers.seedMaliciousMenuItem(
  //         db,
  //         testUser,
  //         maliciousMenu,
  //       )
  //     })

  //     it('removes XSS attack description', () => {
  //       return supertest(app)
  //         .get(`/menu/${maliciousMenu.id}`)
  //         .set('Authorization', helpers.makeAuthHeader(testUser))
  //         .expect(200)
  //         .expect(res => {
  //           expect(res.body.title).to.eql(expectedMenu.title)
  //           expect(res.body.description).to.eql(expectedMenu.description)
  //         })
  //     })
  //   })
  // })

  // describe(`GET /menu/:menuItem_id/reviews`, () => {
  //   context(`Given no menu items`, () => {
  //     beforeEach(() =>
  //       db.into('fuudi_users').insert(testUsers)
  //     )

  //     it(`responds with 404`, () => {
  //       const menuItemId = 123456
  //       return supertest(app)
  //         .get(`/menu/${menuItemId}/reviews`)
  //         .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //         .expect(404, { error: `Menu item doesn't exist` })
  //     })
  //   })

  //   // context('Given there are reviews for menuItem in the database', () => {
  //   //   beforeEach('insert menu items', () =>
  //   //     helpers.seedMenuTables(
  //   //       db,
  //   //       testUsers,
  //   //       testMenuItems,
  //   //       testReviews,
  //   //     )
  //   //   )

  //   //   it('responds with 200 and the specified reviews', () => {
  //   //     const menuItemId = 1
  //   //     const expectedReview = helpers.makeExpectedMenuReviews(
  //   //       testUsers, menuItemId, testReviews
  //   //     )

  //   //     return supertest(app)
  //   //       .get(`/menu/${menuItemId}/reviews`)
  //   //       .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //   //       .expect(200, expectedReview)
  //   //   })
  //   // })
  // })
})