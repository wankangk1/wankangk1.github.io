import React, { useState } from "react"
import "./index.less"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useRequest } from "@umijs/hooks"
import { useHistory } from "react-router-dom"
import { getIssues } from "../../request/index"
export default (props) => {
  let history = useHistory()
  const onFinish = (values) => {
    run()
  }
  const { loading, run } = useRequest(getIssues, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(isLogin ? "登录成功" : "注册成功", 1)
        history.push("/")
      }
    },
  })
  const [form] = Form.useForm()
  const [isLogin, setIsLogin] = useState(true)
  const switchBtn = () => {
    form.setFieldsValue({
      account: "",
      password: "",
    })
    setIsLogin(!isLogin)
  }
  return (
    <div className="login-form-wrap">
      <Form
        className="login-form"
        form={form}
        onFinish={onFinish}
        initialValues={{
          account: "admin",
          password: "admin",
        }}
      >
        <Form.Item
          name="account"
          autoComplete={"off"}
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          autoComplete="new-password"
          rules={[{ required: true, message: "请输入密码" }]}
          style={{ margin: "0" }}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right", marginBottom: "0" }}>
          <span className="switch-btn" onClick={switchBtn}>
            {isLogin ? "去注册" : "去登录"}
          </span>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {isLogin ? "登录" : "注册"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
