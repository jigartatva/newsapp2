
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '1986d71b2166403bb15d72538b66efd6',
  }
};

module.exports = apiEnvironment[env];
