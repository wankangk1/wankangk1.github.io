import React, {useEffect, useState} from "react"
import {Button, List, Tag} from "antd"
import {useHistory, NavLink, Route, Switch} from "react-router-dom"
import {MessageOutlined, LikeOutlined, TagOutlined} from "@ant-design/icons"
import {useRequest} from "@umijs/hooks"
import {getIssues} from "../../request/index"
import "./index.less"
export default (props) => {
  return (
    <section className="homepage-intro">
      <div className="container">
        <header>
          <h2 class="alt">
            Hi! I'm <strong>Prologue</strong>, a{" "}
            <a href="http://html5up.net/license">free</a> responsive
            <br />
            site template designed by <a href="http://html5up.net">HTML5 UP</a>.
          </h2>
          <p>
            Ligula scelerisque justo sem accumsan diam quis
            <br />
            vitae natoque dictum sollicitudin elementum.
          </p>
        </header>

        <footer>
          <Button type="link" size="large">
            look
          </Button>
        </footer>
      </div>
    </section>
  )
}
