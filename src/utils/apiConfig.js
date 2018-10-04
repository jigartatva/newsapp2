const env = process.env.NODE_ENV || 'development';
const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2/',
    androidSenderID: '474155481985'
  },
  production: {
    api: 'https://newsapi.org/v2/',
    androidSenderID: '474155481985'
  }
};
module.exports = apiEnvironment[env];
