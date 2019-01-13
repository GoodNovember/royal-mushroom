import React from "react"
const { graphql } = require("gatsby")

const Template = ({ data }) => RenderData( data )

const RenderData = (props) => {

    const { markdownRemark } = props

    if ( markdownRemark ){
        const { frontmatter, html } = markdownRemark
        return ( <RenderBlog frontmatter={ frontmatter } html={ html } /> )
    }else{
        return ( 
            <div>
                <div>PageTemplate render Error: MarkdownRemark is not renderable.</div>
                <pre>
                    <code>
                        { JSON.stringify(props, null, '  ') }
                    </code>
                </pre>
            </div>
        )
    }
}

const RenderBlog = ({ frontmatter, html }) => {
    
    const { title, date } = frontmatter
    const __html = html

    return (
        <div className="event">
            <div className="event__title">{ title }</div>
            <div className="event__date">{ date }</div>
            <div className="event__content" dangerouslySetInnerHTML={{ __html }}/>
        </div>
    )
}

export const pageQuery = graphql`
  query($id: String!){
    markdownRemark( id: {eq: $id} ){
      html
      frontmatter{
        date(formatString:"MMMM DD, YYYY")
        title
      }
    }
  }
`

export default Template