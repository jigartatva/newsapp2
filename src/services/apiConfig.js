
const env = process.env.NODE_ENV || 'development'

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '80c42c787c3940b88d8620fb2c8271b1',
    country :'cn'
  }
}

module.exports = apiEnvironment[env]
