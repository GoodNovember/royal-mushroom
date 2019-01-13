import React from "react"
const { graphql } = require("gatsby")

const Template = ({ data }) => RenderData( data )

const RenderData = (props) => {

    const { markdownRemark, eventYaml } = props

    if (! eventYaml){
        console.error("No eventYaml?!?")
    }

    if ( markdownRemark && eventYaml ){
        const { frontmatter, html } = markdownRemark
        return ( <RenderBlog frontmatter={ frontmatter } html={ html } eventYaml={eventYaml} /> )
    }else{
        return ( 
            <div>
                <div>PageTemplate render Error: MarkdownRemark is not renderable.</div>
                <pre><code>{ JSON.stringify(props, null, '  ') }</code></pre>
            </div>
        )
    }
}

const RenderBlog = ({ frontmatter, html, eventYaml }) => {
    
    const { title, startDateTime, endDateTime, location, cost } = frontmatter
    const __html = html

    return (
        <div className="event">
            <div className="event__title">Title: { title }</div>
            <div className="event__start">Start: { startDateTime }</div>
            <div className="event__end">End: { endDateTime }</div>
            <div className="event__cost">Cost: { cost }</div>
            <div className="event__location">Location: { location || eventYaml.eventDefaultLocation || null }</div>
            <div className="event__content" dangerouslySetInnerHTML={{ __html }}/>
        </div>
    )
}

export const pageQuery = graphql`
    query($id: String!){
        eventYaml{
            eventDefaultLocation
        }
        markdownRemark( id: {eq: $id} ){
            html
            frontmatter{
                title
                cost
                startDateTime
                endDateTime
                location
            }
        }
    }
`

export default Template