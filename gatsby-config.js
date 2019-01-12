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
    'gatsby-plugin-netlify-cms',
    {
        resolve:'gatsby-plugin-netlify-cms',
        options:{
            modulePath:`${__dirname}/src/cms/cms.js`,
            stylesPath: `${__dirname}/src/cms/cms.sass`,
            enableIdentityWidget: true,
            publicPath: `admin`,
            htmlTitle: `Thine Royal-Mushroom Content Manager`,
        }
    },
    'gatsby-plugin-netlify'  // always save the best for last
]

module.exports = { plugins }