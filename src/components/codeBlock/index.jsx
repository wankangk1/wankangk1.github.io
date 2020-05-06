import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { PrismAsyncLight  as SyntaxHighlighter } from "react-syntax-highlighter"
// 设置高亮样式
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
// 设置高亮的语言
import {
  jsx,
  javascript,
} from "react-syntax-highlighter/dist/esm/languages/prism"
console.log(atomDark)
class CodeBlock extends PureComponent {
static propTypes = {
    value: PropTypes.string.isRequired
  }
  componentWillMount() {
    // 注册要高亮的语法，
    // 注意：如果不设置打包后供第三方使用是不起作用的
    SyntaxHighlighter.registerLanguage("jsx", jsx)
    SyntaxHighlighter.registerLanguage("javascript", javascript)
    SyntaxHighlighter.registerLanguage("js", javascript)
  }
  render() {
    const {  value } = this.props
    return (
      <SyntaxHighlighter
        language="js"
        style={atomDark}
        showLineNumbers={true}
      >
        {value}
      </SyntaxHighlighter>
    )
  }
}
export default CodeBlock
