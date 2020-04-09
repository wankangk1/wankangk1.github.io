import React, {useEffect, useState} from "react"
import {Spin, List, Tag} from "antd"
import {NavLink} from "react-router-dom"
import {MessageOutlined, TagOutlined, CalendarOutlined} from "@ant-design/icons"
import {useRequest} from "@umijs/hooks"
import {getIssues} from "../../request/index"
import getImageOfMD from "../../util/getImageOfMD"
import "./index.less"
export default (props) => {
  const [issues, setIssues] = useState([])
  const {loading, run} = useRequest(getIssues, {
    manual: true,
    onSuccess: (result, params) => {
      setIssues(result.data)
    },
  })
  useEffect(() => {
    console.log(moment())
    run()
  })
  console.log(loading)
  return (
    <div className="blog-list">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={issues}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<NavLink to="/">{item.title}</NavLink>}
              description={item.description}
            />
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              {getImageOfMD(item.body)}
              <CalendarOutlined style={{marginRight: 5}} />
              <span style={{marginRight: 10, marginLeft: 5}}>
                {window.moment(item.created_at).format("Y-M-D")}
              </span>
              <MessageOutlined style={{marginRight: 5}} />
              <span style={{marginRight: 10, marginLeft: 5}}>
                {item.comments}
              </span>
              {item.labels && item.labels.length !== 0 && (
                <TagOutlined style={{marginRight: 5}} />
              )}
              {item.labels &&
                item.labels.map((label) => {
                  return (
                    <Tag
                      key={label.id}
                      style={{background: `#${label.color}`, color: "#fff"}}
                    >
                      {label.name}
                    </Tag>
                  )
                })}
            </div>
          </List.Item>
        )}
      >
        <Spin style={{height: "100vh"}} spinning={loading} />
      </List>
    </div>
  )
}
