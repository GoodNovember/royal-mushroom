
// Compile those with the kind: standard

const { resolveTemplate } = require("./resolveTemplate")

const compileStandard = ({ actions, node }) => {

    const { createPage } = actions

    const { frontmatter, id } = node
    const { kind } = frontmatter

    const component = resolveTemplate('standard')

    console.log('standard', frontmatter)

    createPage({
        id,
        path:`/standard/${id}`,
        component,
        context: { id, kind }
    })

}

const compileStandardCode = (frontmatter) => {
    
}

module.exports = { compileStandard }