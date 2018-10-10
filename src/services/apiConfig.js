
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '44f4172e2ef64d2d8f15f3db96061a83',
  }
};

module.exports = apiEnvironment[env];
