import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import {
  updateGreetingOverlayStatus,
  isGuestForm,
  registerAsGuest
} from "store-popup";
import { Header, SubHeader } from "./AuthForm.module.scss";

class GuestForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerAsGuest(values);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { showGuestForm, updateGreetingOverlayStatus } = this.props;

    return showGuestForm ? (
      <div>
        <h3 className={Header}>Hello there!</h3>
        <p className={SubHeader}>
          Join the conversation to make this site awesome
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input your name!" }]
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: []
            })(<Input type="email" placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block={true}>
              Continue
            </Button>
            Or{" "}
            <a onClick={() => updateGreetingOverlayStatus("login")}>
              Have a Yuzu account?
            </a>
          </Form.Item>
        </Form>
      </div>
    ) : null;
  }
}

const WrappedGuestForm = Form.create({ name: "guest_info" })(GuestForm);

const mapState = (state, ownProps) => ({
  ...ownProps,
  showGuestForm: isGuestForm(state)
});

const actions = { updateGreetingOverlayStatus, registerAsGuest };

export default connect(
  mapState,
  actions
)(WrappedGuestForm);
