import React from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import CodeBlock from "src/components/codeBlock"
import "./index.less"
export default (props) => {
  console.log(props)
  const { data } = props.location.state
  return (
    <div className="blog-detail">
      <h2>{data.title}</h2>
      <ReactMarkdown
        source={data.body}
        renderers={{
          code: CodeBlock
        }}
        break
      />
    </div>
  )
}
