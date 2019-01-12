const plugins = [
    'gatsby-transformer-yaml',
    {
        resolve: 'gatsby-source-filesystem',
        options:{
            path:`${__dirname}/src/pages`,
            name:'markdown-pages'
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options:{
            path:`${__dirname}/src/data`,
            name:'data'
        }
    },
    'gatsby-transformer-remark', // process frontmatter in markdown files
    'gatsby-plugin-netlify-cms' // always save the best for last
]

module.exports = { plugins }