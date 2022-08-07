import React, { Component } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { signIn } from "../Services";

const { Title } = Typography;
const { Content } = Layout;
export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (stateElem, value) => {
    this.setState({ [stateElem]: value });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    signIn(email, password).then((respone) => {
      const token = respone.data.jwt;
      localStorage.setItem("Auth_token", token);
      this.props.history.push("/orders");
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={(e) =>
                        this.handleChange("email", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Password"
                      type="password"
                      onChange={(e) =>
                        this.handleChange("password", e.target.value)
                      }
                      value={password}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch
                      defaultChecked
                      onChange={this.handleChange}
                      name="rememberMe"
                    />
                    Remember me
                  </Form.Item> */}

                  <Form.Item>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={this.handleLogin}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
