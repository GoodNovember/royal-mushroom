
const { resolveTemplate } = require('./machines/resolveTemplate')

exports.onCreateNode = ({ node, getNode, actions, createNode }) => {

    console.log("\n--- Processing Kinds")

    const kindMap = {
        "standard": ({ node, getNode, actions, kind }) => {
            
            const { createNodeField } = actions

            const { frontmatter, id } = node
            const { grade, domain_label, domain_number } = frontmatter
            const code = `${frontmatter.class}${grade}${domain_label}${domain_number}`
            console.log(`${kind}: ${code}`)
            createNodeField({
                node,
                name: 'standardCode',
                value: code.toLowerCase(),
            })

        },
        // "page": ({ node, getNode, actions }) => {
    
        // },
        // "event": ({ node, getNode, actions }) => {

        // }
    }

    if( node.internal.type === `MarkdownRemark` ){

        const { kind } = node.frontmatter

        const chosenKind = kindMap[kind]

        if(chosenKind && typeof chosenKind === "function"){
            console.log(`---- ${kind} Created`)
            chosenKind({ node, getNode, actions, kind })
        }else{
            // console.log("Unknown Kind:", kind)
        }

    }

}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {

}

exports.createPages = ({ actions, graphql }) => {

    const { createPage } = actions

    const query = `
        {
            standardYaml{
                standardPathPrefix
            }
            eventYaml{
                eventPathPrefix
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

        const standardSettings = data.standardYaml
        const eventSettings = data.eventYaml

        data.allMarkdownRemark.edges.forEach(({ node })=>{

            const { id, frontmatter, fields } = node
            const { kind, path, template } = frontmatter

            const component = resolveTemplate( template || kind )
            
            if(kind === "standard"){
                createPage({
                    id,
                    path:`${ standardSettings.standardPathPrefix || 'standard' }/${ fields.standardCode }`,
                    kind,
                    component,
                    context:{ id, kind },
                })
            }else if(kind === "event"){
                createPage({
                    id,
                    path:`${ eventSettings.eventPathPrefix || 'event' }/${ id }`,
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