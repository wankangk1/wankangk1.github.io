import React, {useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import {Menu} from "antd"
import {getUser} from "../../request/index"
import {useRequest} from "@umijs/hooks"
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
export default (props) => {
  const [userInfo, setUserInfo] = useState({})
  const {loading, run} = useRequest(getUser, {
    manual: true,
    onSuccess: (result, params) => {
      setUserInfo(result.data)
    },
  })
  useEffect(() => {
    run()
  }, [])
  return (
    <div className="homepage-left">
      <div className="logo">
        <img
          className="logo-image"
          src={
            userInfo.avatar_url
              ? userInfo.avatar_url
              : require("../../images/avatar.jpg")
          }
          alt=""
        />
        <div className="logo-title">
          <h1 className="logo-title-name">{userInfo.name}</h1>
          <p className="logo-title-des">哈塞给</p>
        </div>
      </div>
      <nav className="homepage-nav">
        <ul>
          <li>
            <NavLink
              className="nav-text"
              activeClassName="nav-text-active"
              to="/intro"
            >
              intro
            </NavLink>
            <NavLink
              className="nav-text"
              activeClassName="nav-text-active"
              to="/blog"
            >
              blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}