import React from "react";
import classnames from "classnames";
import {
  FormStyle,
  BtnContainer,
  BtnContainerLeft,
  BtnContainerRight,
  TextareaStyle
} from "./BasicEditor.module.scss";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import {
  getEditorStatus,
  postComment,
  getDeviceInfo,
  getPageInfo,
  resetEditor
} from "store-popup";

class BasicEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.comment) {
        this.props.postComment({
          text: values.comment,
          deviceInfo: this.props.deviceInfo,
          pageInfo: this.props.pageInfo
        });
        this.props.form.resetFields();
        this.props.resetEditor();
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();
    window.parent.postMessage({ type: "COMMENT_CANCELED" }, "*");
    this.props.form.resetFields();
    this.props.resetEditor();
  };

  render() {
    const { editorIsOpen } = this.props;
    const { getFieldDecorator } = this.props.form;

    return !editorIsOpen ? null : (
      <Form className={FormStyle} onSubmit={this.handleSubmit}>
        <Form.Item label="Leave your feedback">
          {getFieldDecorator("comment", {
            rules: []
          })(
            <Input.TextArea
              className={TextareaStyle}
              placeholder="Enter comment..."
            />
          )}
        </Form.Item>
        <Form.Item>
          <div className={classnames(BtnContainer, BtnContainerLeft)}>
            <Button type="primary" block={true} htmlType="submit">
              Save
            </Button>
          </div>
          <div className={classnames(BtnContainer, BtnContainerRight)}>
            <Button
              type="normal"
              block={true}
              htmlType="button"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedBasicEditor = Form.create({ name: "BasicFrom" })(BasicEditor);

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    editorIsOpen: getEditorStatus(state),
    deviceInfo: getDeviceInfo(state),
    pageInfo: getPageInfo(state)
  };
};

const actions = { postComment, resetEditor };

export default connect(
  mapState,
  actions
)(WrappedBasicEditor);
