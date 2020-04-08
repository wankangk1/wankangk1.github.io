import React from "react"
import {HashRouter, Route, Switch} from "react-router-dom"
import Homepage from "../pages/homepage"
import Login from "../pages/login"
import GithubApiDoc from "../pages/githubApiDoc"
import Main from "../pages/main"
const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/githubdoc" component={GithubApiDoc} />
      <Route exact path="/Main" component={Main} />
      <Route path="/" component={Homepage} />
    </Switch>
  </HashRouter>
)

export default BasicRoute
