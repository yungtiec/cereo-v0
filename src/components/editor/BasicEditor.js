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
  getEditorValue,
  updateEditorStatus,
  resetEditorData
} from "store-popup";

class BasicEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.comment) {
        if (!this.props.initialValue)
          this.props.postComment({
            text: values.comment,
            deviceInfo: this.props.deviceInfo,
            pageInfo: this.props.pageInfo
          });
        else console.log("edit comment");
        this.props.form.resetFields();
        this.props.resetEditorData();
        this.props.updateEditorStatus(false);
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();
    window.parent.postMessage({ type: "COMMENT_CANCELED" }, "*");
    this.props.form.resetFields();
    this.props.resetEditorData();
    this.props.updateEditorStatus(false);
  };

  render() {
    const { editorIsOpen, initialValue } = this.props;
    const { getFieldDecorator } = this.props.form;

    return !editorIsOpen ? null : (
      <Form className={FormStyle} onSubmit={this.handleSubmit}>
        <Form.Item label="Leave your feedback">
          {getFieldDecorator("comment", {
            initialValue,
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
    pageInfo: getPageInfo(state),
    initialValue: getEditorValue(state)
  };
};

const actions = { postComment, resetEditorData, updateEditorStatus };

export default connect(
  mapState,
  actions
)(WrappedBasicEditor);
