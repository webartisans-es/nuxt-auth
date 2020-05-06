const { resolve, join } = require('path')
const { readdirSync, statSync } = require('fs')

const walkSync = (dir, fileList = []) => {
  dir = resolve(__dirname, dir)
  return readdirSync(dir)
  .filter(file => {
    return file.replace(__dirname, '') !== 'module.js' ||
           file.replace(__dirname, '') !== 'plugin.js'
  })
  .map(file => {
    return statSync(join(dir, file)).isDirectory()
      ? walkSync(join(dir, file), fileList)
      : fileList.concat(
        join(dir, file)
          .replace(__dirname, '.')
      )[0]
  })
  .flat(Infinity)
}

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['nuxt-auth'],
    ...moduleOptions
  }
  
  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'auth'
  const { namespace } = options
  
  const { dst } = this.addTemplate({
    src: resolve(__dirname, 'plugin.js'),
    fileName: join(namespace, 'auth.js'),
    options
  })
  
  this.options.plugins.push(resolve(this.options.buildDir, dst))
  
  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = walkSync('./')
  
  for (const file of foldersToSync) {
    this.addTemplate({
      src: resolve(__dirname, file),
      fileName: join(namespace, file),
      options
    })
  }
}

module.exports.meta = require('../package.json')