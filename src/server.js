const knex = require('knex')
const app = require('./app')
const { PORT, HEROKU_POSTGRESQL_JADE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: HEROKU_POSTGRESQL_JADE_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})