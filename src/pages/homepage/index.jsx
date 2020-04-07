import React, {useEffect, useState} from "react"
import {Layout, List, Tag} from "antd"
import {useHistory, NavLink} from "react-router-dom"
import {MessageOutlined, LikeOutlined, TagOutlined} from "@ant-design/icons"
import {useRequest} from "@umijs/hooks"
import {getIssues} from "../../request/index"
import "./index.less"
const {Header, Content, Sider} = Layout
const IconText = ({icon, text}) => (
  <span>
    {React.createElement(icon, {style: {marginRight: 8}})}
    {text}
  </span>
)
export default (props) => {
  const [issues, setIssues] = useState([])
  const {loading, run} = useRequest(getIssues, {
    manual: true,
    onSuccess: (result, params) => {
      setIssues(result.data)
    },
  })
  useEffect(() => {
    run()
  }, [])
  return (
    <Layout className="homepage">
      <Sider
        breakpoint="xl"
        theme="light"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        侧边栏
      </Sider>
      <Layout>
        <Header theme="light" className="tag-list">
          <Tag color="#2db7f5">REACT</Tag>
        </Header>
        <Content>
          <List
            itemLayout="vertical"
            size="large"
            // pagination={{
            //   onChange: (page) => {
            //     console.log(page)
            //   },
            //   pageSize: 3,
            // }}
            dataSource={issues}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={<NavLink to="/login">{item.title}</NavLink>}
                  description={item.description}
                />
                <div
                  style={{
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TagOutlined style={{marginRight: 5}} />
                  <span style={{marginRight: 10, marginLeft: 5}}>
                    {window.moment(item.created_at).format("Y-M-D")}
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
          />
        </Content>
      </Layout>
    </Layout>
  )
}
