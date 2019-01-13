
const { resolveTemplate } = require('./machines/resolveTemplate')

exports.onCreateNode = ({ node, getNode, actions, createNode }) => {

    const kindMap = {
        "standard": ({ node, getNode, actions, kind }) => {
            
            const { createNodeField } = actions

            const gradeMap = {
                "K":"Kindergarden",
                "1":"1st Grade",
                "2":"2nd Grade",
                "3":"3rd Grade",
                "4":"4th Grade",
                "5":"5th Grade",
                "6":"6th Grade",
                "7":"7th Grade",
                "8":"8th Grade",
                "9":"9th Grade",
                "10":"10th Grade",
                "11":"11th Grade",
                "12":"12th Grade"
            }

            const domainMap = {
                "H":"Historical Understandings",
                "G":"Geographic Understandings",
                "CG":"Government / Civic Understandings",
                "E":"Economic Understandings"
            }

            const { frontmatter, id } = node
            const { grade, domain_label, domain_number } = frontmatter

            const code = `${frontmatter.class}${grade}${domain_label}${domain_number}`
            console.log(`${kind}: ${code}`)
            createNodeField({
                node,
                name: 'standardCode',
                value: code.toLowerCase(),
            })

            const longGrade = gradeMap[grade] || `Unhandled Grade: ${grade}`

            createNodeField({
                node,
                name: 'standardGradeLong',
                value: longGrade
            })

            const longDomain = domainMap[domain_label] || `Unhandled Domain: ${domain_label}`

            createNodeField({
                node,
                name: 'standardDomainLong',
                value: longDomain
            })

        }
    }

    if( node.internal.type === `MarkdownRemark` ){

        const { kind } = node.frontmatter

        const chosenKind = kindMap[kind]

        if(chosenKind && typeof chosenKind === "function"){
            chosenKind({ node, getNode, actions, kind })
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
                            slug
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

        // created the Standard index page
        createPage({
            path:standardSettings.standardPathPrefix,
            component:resolveTemplate(`standard-index`),
            context:{ kind:'standard' }
        })

        // create the Event index page
        createPage({
            path:eventSettings.eventPathPrefix,
            component:resolveTemplate('event-index'),
            context:{ kind:'event' }
        })

        // create all the sub pages.
        data.allMarkdownRemark.edges.forEach(({ node })=>{

            const { id, frontmatter, fields } = node
            const { kind, template, slug } = frontmatter

            const component = resolveTemplate( template || kind )

            const standardPrefix = standardSettings.standardPathPrefix || 'standard'
            const eventPrefix = eventSettings.eventPathPrefix || 'event'
            
            if(kind === "standard"){
                createPage({
                    path:`${ standardPrefix }/${ fields.standardCode }`,
                    component,
                    context:{ id, kind, prefix: standardPrefix },
                })
            }else if(kind === "event"){
                createPage({
                    path:`${ eventPrefix }/${ slug || id }`,
                    component,
                    context:{ id, kind, prefix: eventPrefix },
                })
            }else if(kind === "page"){
                createPage({
                    path:`${ slug }`,
                    component,
                    context:{ id, kind }
                })
            }else{
                createPage({
                    path:`${ kind }/${ slug || id }`,
                    component,
                    context:{ id, kind },
                })
            }


        })

        

    })

}