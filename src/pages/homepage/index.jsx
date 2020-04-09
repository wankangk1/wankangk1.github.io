import React from "react"
import { Row, Col } from "antd"
import { Route, Switch, Redirect } from "react-router-dom"
import HomeLeft from "./left"
import Blog from "../blog"
import Intro from "../intro"
import "./index.less"
// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }
export default (props) => {
  return (
    <Row className="homepage">
      <Col {...siderLayout} className="left-col">
        <HomeLeft />
      </Col>
      <Col {...contentLayout}>
        <Switch>
          <Route path="/intro" component={Intro} />
          <Route path="/blog" component={Blog} />
          <Redirect to="/intro"></Redirect>
        </Switch>
      </Col>
    </Row>
  )
}
