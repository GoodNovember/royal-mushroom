
const { resolveTemplate } = require('./machines/resolveTemplate')

exports.onCreateNode = ({ node, getNode, actions, createNode }) => {

    const kindMap = {
        "standard": ({ node, getNode, actions }) => {
            
            const { createNodeField } = actions

            const { frontmatter, id } = node
            const { grade, domain_label, domain_number } = frontmatter
            const code = `${frontmatter.class}${grade}${domain_label}${domain_number}`
            console.log("\nAdded Standard:",code)
            createNodeField({
                node,
                name: 'standardCode',
                value: code.toLowerCase(),
            })

        },
        "page": ({ node, getNode, actions }) => {
    
        }
    }

    if( node.internal.type === `MarkdownRemark` ){

        const { kind } = node.frontmatter

        const chosenKind = kindMap[kind]

        if(chosenKind && typeof chosenKind === "function"){
            chosenKind({ node, getNode, actions })
        }else{
            console.log("Unknown Kind:", kind)
        }

    }

}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {

}

exports.createPages = ({ actions, graphql }) => {

    const { createPage } = actions

    const query = `
        {
            settingsYaml{
                standardPathPrefix
            }
            allMarkdownRemark {
                edges {
                    node {
                        id
                        fields{
                            standardCode
                        }
                        frontmatter {
                            kind
                            path
                            template
                        }
                    }
                }
            }
        }
    `

    return graphql( query ).then( result => {

        const { errors, data } = result

        if( errors ){
            errors.map( ( error ) => { console.error( error.toString() ) } )
            return Promise.reject( errors )
        }

        const settings = data.settingsYaml

        data.allMarkdownRemark.edges.forEach(({ node })=>{

            const { id, frontmatter, fields } = node
            const { kind, path, template } = frontmatter

            const component = resolveTemplate( template || kind )
            
            if(kind === "standard"){
                createPage({
                    id,
                    path:`${ settings.standardPathPrefix || 'standard' }/${ fields.standardCode }`,
                    kind,
                    component,
                    context:{ id, kind },
                })
            }else{
                createPage({
                    id,
                    path:`${kind}/${id}`,
                    kind,
                    component,
                    context:{ id, kind },
                })
            }


        })

    })

}