import React from "react"
import { Table, Tag, Row, Col } from "antd"
import "./index.less"
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green"
          if (tag === "loser") {
            color = "volcano"
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <span style={{ marginRight: 16 }}>Invite {record.name}</span>
        <span>Delete</span>
      </span>
    ),
  },
]
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }
export default (props) => {
  return (
    <Row className="code-demo" justify="center">
      <Col {...contentLayout}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Col>
    </Row>
  )
}
