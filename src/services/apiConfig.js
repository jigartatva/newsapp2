
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '48e65e2d5a7945f39ef43cba048c50d1',
  }
};

module.exports = apiEnvironment[env];
