const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Simple usage
    'cookie-universal-nuxt',
    { handler: require('../') }
  ],
  
  auth: {
    redirects: {
      login: '/login',
      register: '/register',
      home: '/',
      dashboard: '/secret',
    }
  },
  
  axios: {
    baseURL: 'https://api.webartisans.dev'
  }
}
