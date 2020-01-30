module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    HEROKU_POSTGRESQL_JADE_URL: process.env.HEROKU_POSTGRESQL_JADE_URL || 'postgresql://fuudi@localhost/fuudi',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://fuudi@localhost/fuudi_test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '24h',  
  }
  