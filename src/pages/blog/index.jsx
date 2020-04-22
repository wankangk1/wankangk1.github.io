import React from "react"
import { List, Tag } from "antd"
import { NavLink } from "react-router-dom"
import {
  MessageOutlined,
  TagOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import { useRequest } from "@umijs/hooks"
import { getIssues } from "../../request/index"
import getImageOfMD from "../../util/getImageOfMD"
import "./index.less"
export default () => {
  const { data, run } = useRequest(getIssues, {
    formatResult: (response) => {
      //过滤数据
      return window._.filter(response.data, (item) =>
        window._.every(item.labels, (element) => element.name !== "invalid")
      )
    },
  })
  return (
    <div className="blog-list" onClick={run}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={
                <NavLink
                  to={{ pathname: "/blogDetail", state: { data: item } }}
                >
                  {item.title}
                </NavLink>
              }
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
              <CalendarOutlined style={{ marginRight: 5 }} />
              <span style={{ marginRight: 10, marginLeft: 5 }}>
                {moment(item.created_at).format("Y-M-D")}
              </span>
              <MessageOutlined style={{ marginRight: 5 }} />
              <span style={{ marginRight: 10, marginLeft: 5 }}>
                {item.comments}
              </span>
              {item.labels && item.labels.length !== 0 && (
                <TagOutlined style={{ marginRight: 5 }} />
              )}
              {item.labels &&
                item.labels.map((label) => {
                  return (
                    <Tag
                      key={label.id}
                      style={{ background: `#${label.color}`, color: "#fff" }}
                    >
                      {label.name}
                    </Tag>
                  )
                })}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
