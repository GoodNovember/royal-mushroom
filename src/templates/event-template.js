import React from "react"

import AddToCalendarButton from "../components/AddToCalendarButton"

const { graphql, Link } = require("gatsby")

const Template = ({ data }) => RenderData( data )

const RenderData = (props) => {

    const { markdownRemark, eventYaml } = props

    if (! eventYaml){
        console.error("No eventYaml?!?")
    }

    if ( markdownRemark && eventYaml ){
        const { frontmatter, html, excerpt } = markdownRemark
        return ( <RenderBlog excerpt={ excerpt } frontmatter={ frontmatter } html={ html } eventYaml={eventYaml} /> )
    }else{
        return ( 
            <div>
                <div>PageTemplate render Error: MarkdownRemark is not renderable.</div>
                <pre><code>{ JSON.stringify(props, null, '  ') }</code></pre>
            </div>
        )
    }
}

const RenderBlog = ({ frontmatter, excerpt, html, eventYaml }) => {
    
    const { title, startDateTime, endDateTime, cost, ticketURL } = frontmatter
    const __html = html

    const location = frontmatter.location || eventYaml.eventDefaultLocation

    const details = (
`
${ excerpt }
---
${ cost ? ('Cost:\n' + cost) : ('') }
${ ticketURL ? ( '\nTicket Link:\n' + ticketURL ) : ('') }
`
)

    return (
        <div className="event">
            <div className="event__title">{ title }</div>
            <div className="event__start">{ startDateTime }</div>
            <div className="event__end">{ endDateTime }</div>
            <div className="event__cost">{ cost }</div>
            { ((ticketURL) && (ticketURL.length > 0)) ? ( <a className="event__link event__link--get-tickets" href={ticketURL} target="_blank" rel="noopener noreferrer">Get Tickets</a> ) : ( null ) }
            <div className="event__location">{ location || null }</div>
            <div className="event__content" dangerouslySetInnerHTML={{ __html }}/>
            <AddToCalendarButton location={ location } startTime={ startDateTime } endTime={ endDateTime } title={ title } details={ details } />
            <div><Link className="event__link event__link--go-back" to={ eventYaml.eventPathPrefix }>Go Back</Link></div>
        </div>
    )
}

export const pageQuery = graphql`
    query($id: String!){
        eventYaml{
            eventPathPrefix
            eventDefaultLocation
        }
        markdownRemark( id: {eq: $id} ){
            html
            excerpt
            frontmatter{
                title
                cost
                startDateTime
                endDateTime
                ticketURL
                location
            }
        }
    }
`

export default Template