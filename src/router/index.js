import React from "react"
import {HashRouter, Route, Switch} from "react-router-dom"
import Homepage from "../pages/homepage"
import Login from "../pages/login"
import GithubApiDoc from "../pages/githubApiDoc"
const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/githubdoc" component={GithubApiDoc} />
    </Switch>
  </HashRouter>
)

export default BasicRoute
