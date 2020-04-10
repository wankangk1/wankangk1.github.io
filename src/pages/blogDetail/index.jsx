import React from "react"
import ReactMarkdown from "react-markdown"
import "./index.less"
export default (props) => {
  console.log(props)
  const {data} = props.location.state
  return (
    <div className="blog-detail">
      <h2>{data.title}</h2>
      <ReactMarkdown source={data.body} break />
    </div>
  )
}
