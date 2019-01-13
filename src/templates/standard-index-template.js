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
        <div className="standard">
            <div className="standard__title">{ title }</div>
            <div className="standard__date">{ date }</div>
            <div className="standard__content" dangerouslySetInnerHTML={{ __html }}/>
        </div>
    )
}

export const pageQuery = graphql`
    standardYaml{
        standardPathPrefix
    }
    allMarkdownRemark{
        edges{
            node{
                id
        frontmatter{
          title
        }
        fields{
          standardCode
        }
      }
    }
  }
`

export default Template