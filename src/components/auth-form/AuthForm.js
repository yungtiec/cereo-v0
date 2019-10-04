import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { Header, SubHeader } from "./AuthForm.module.scss";
import { updateGreetingOverlayStatus, isLoginForm, auth } from "store-popup";

class AuthForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.auth({
          ...values,
          method: "login"
        });
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { showLoginForm, updateGreetingOverlayStatus } = this.props;

    return showLoginForm ? (
      <div>
        <h3 className={Header}>Log in to Yuzu</h3>
        <p className={SubHeader}>
          Join the conversation to make this site awesome
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(<Input type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block={true}>
              Continue
            </Button>
            Or{" "}
            <a onClick={() => updateGreetingOverlayStatus("guest")}>
              Continue as guest
            </a>
          </Form.Item>
        </Form>
      </div>
    ) : null;
  }
}

const WrappedAuthForm = Form.create({ name: "auth" })(AuthForm);

const mapState = (state, ownProps) => ({
  ...ownProps,
  showLoginForm: isLoginForm(state)
});

const actions = { updateGreetingOverlayStatus, auth };

export default connect(
  mapState,
  actions
)(WrappedAuthForm);
