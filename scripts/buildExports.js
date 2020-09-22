const files = require('glob').sync('src/**/*.tsx')

const { readJsonSync, writeJsonSync } = require('fs-extra')

const packageJson = readJsonSync('package.json')

packageJson.exports = Object.fromEntries(
  files.map(file => [
    file.replace(/^src/, '.').replace(/\.tsx?$/, ''),
    {
      import: file.replace(/^src/, './mjs').replace(/\.tsx?$/, '.js'),
      require: file.replace(/^src/, './cjs').replace(/\.tsx?$/, '.js'),
    },
  ])
)

writeJsonSync('package.json', packageJson, { spaces: 2 })
console.log('wrote exports to package.json')
