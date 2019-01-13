const path = require('path')

const resolveTemplate = ( templateName ) => path.resolve(__dirname,`../src/templates/${templateName}-template.js`)

module.exports = { resolveTemplate }