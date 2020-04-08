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
        <div className="title">这是一个gitblog</div>
      </div>
    </section>
  )
}
