import React from "react"
const { graphql, Link } = require("gatsby")

const Template = ({data}) => RenderData(data )

const RenderData = ({eventQuery, eventSettings}) => {

    const events = eventQuery.results
    const { prefix } = eventSettings

    const composedEvents = events.map(({event})=>(<RenderEvent key={ event.id } prefix={ prefix } event={ event }/>))

    return (
        <div>
            <div>Event Index Page</div>
            <pre>{ composedEvents }</pre>
        </div>
    )

}

const RenderEvent = ({ prefix, event }) => {

    const { frontmatter, excerpt } = event
    const { title, slug } = frontmatter

    return (
        <div>
            <Link to={`${prefix}/${slug}`}>{title}</Link>
            <div>{ frontmatter.eventStart } ({ frontmatter.humanStart })</div>
            <div>{ excerpt }</div>
        </div>
    )
}

export const pageQuery = graphql`
    {
        eventSettings: eventYaml{
            prefix: eventPathPrefix
            defaultLocation: eventDefaultLocation
        }
        eventQuery: allMarkdownRemark(
            filter: { 
                frontmatter: { 
                    kind: { in:["event"] }
                }
            }
        ){
            results: edges{
                event: node{
                    id
                    excerpt
                    frontmatter{
                        slug
                        title
                        cost
                        startDateTime
                        humanStart: startDateTime(fromNow:true)
                        eventStart: startDateTime(formatString:"MMMM DD YYYY @ h:mm a")
                        endDateTime
                        ticketURL
                        location
                    }
                }
            }
        }
    }
`

export default Template