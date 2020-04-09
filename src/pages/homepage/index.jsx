import React from "react"
import {Layout} from "antd"
import {Route, Switch, Redirect} from "react-router-dom"
import HomeLeft from "./left"
import Blog from "../blog"
import Intro from "../intro"
import "./index.less"
const {Content, Sider} = Layout

export default (props) => {
  return (
    <Layout className="homepage">
      <Sider
        breakpoint="10000"
        theme="light"
        collapsedWidth="0"
        className="homepage-slider"
        zeroWidthTriggerStyle={{
          zIndex: 999,
          top: 12,
          right: -46,
          borderRadius: 4,
          color: "#fff",
          backgroundColor: "rgba(128, 136, 144, 0.5)",
        }}
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <HomeLeft />
      </Sider>
      <Content>
        <Switch>
          <Route path="/intro" component={Intro} />
          <Route path="/blog" component={Blog} />
          <Redirect to="/intro"></Redirect>
        </Switch>
      </Content>
    </Layout>
  )
}
