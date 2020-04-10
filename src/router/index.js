import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Homepage from "../pages/homepage"
import Login from "../pages/login"
import CodeFragments from "../pages/codeFragments"
const BasicRoute = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/code" component={CodeFragments} />
      <Route path="/" component={Homepage} />
    </Switch>
  </BrowserRouter>
)

export default BasicRoute
