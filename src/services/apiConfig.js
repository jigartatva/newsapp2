
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '13023259c7304cbb8169940e58bdba7d',
  }
};

module.exports = apiEnvironment[env];
