import React from "react"
// import { Link, graphql } from "gatsby"
// import { Link } from "gatsby"

// const PageLinkListFromEdges = ( edges ) => edges.map((edge)=>PageLinkFromEdge(edge))
// const PageLinkFromEdge = ({ node }) => PageLinkFromNode( node )
// const PageLinkFromNode = ({ id, excerpt, fields, frontmatter }) => {
//     const { slug } = fields
//     const { title, date } = frontmatter
//     return (
//         <div key={ id }>
//             <Link to={ slug }>{ title } - { date }</Link>
//             <div>{ excerpt }</div>
//         </div>
//     )
// }

export default ({ data }) => {

    // const { allMarkdownRemark } = data
    // const { totalCount, edges } = allMarkdownRemark

    return (
        <div>
            Unstable
            {/* <div>TOTAL: { totalCount }</div> */}
            {/* <div>{ PageLinkListFromEdges(edges) }</div> */}
        </div>
    )
}

// export const query = graphql`
//     {
//         all
//     }
// `