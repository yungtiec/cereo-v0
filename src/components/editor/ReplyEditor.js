import React from "react";
import classnames from "classnames";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { FormRow } from "./Editor.module.scss";
import { replyToComment } from "store-popup";

class ReplyEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.text) {
        this.props.replyToComment({
          text: values.text,
          parentId: this.props.parentId,
          rootId: this.props.rootId
        });
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { editorIsOpen, initialValue } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item className={FormRow}>
          {getFieldDecorator("text", {
            initialValue,
            rules: []
          })(<Input.TextArea placeholder="Reply" />)}
        </Form.Item>
        <Form.Item>
          <Button type="normal" block={true} htmlType="submit">
            Reply
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedReplyEditor = Form.create({ name: "ReplyForm" })(ReplyEditor);

const mapState = (state, ownProps) => ({
  ...ownProps
});

const actions = {
  replyToComment
};

export default connect(
  mapState,
  actions
)(WrappedReplyEditor);
