import React from "react"

export const ToJSON = ({ input, label }) => (
    <div>
        <div>{ label }</div>
        <pre>{ JSON.stringify(input,null,'  ') }</pre>
    </div>
)