import React from "react";
import classnames from "classnames";
import {
  BasicEditorStyle,
  FormRow,
  BtnContainer,
  BtnContainerLeft,
  BtnContainerRight,
  TextareaStyle
} from "./Editor.module.scss";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import {
  getEditorStatus,
  postComment,
  putComment,
  getDeviceInfo,
  getPageInfo,
  getEditorData,
  updateEditorStatus,
  resetEditorData,
  updateCommentListScrollOffset
} from "store-popup";

class BasicEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && values.text) {
        if (!this.props.initialValue) {
          this.props.updateCommentListScrollOffset(0);
          this.props.postComment({
            text: values.text,
            deviceInfo: this.props.deviceInfo,
            pageInfo: this.props.pageInfo
          });
        } else {
          this.props.putComment({
            commentId: this.props.commentId,
            data: { text: values.text }
          });
        }
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
      <Form className={BasicEditorStyle} onSubmit={this.handleSubmit}>
        <Form.Item label="Leave your feedback" className={FormRow}>
          {getFieldDecorator("text", {
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

const WrappedBasicEditor = Form.create({ name: "BasicForm" })(BasicEditor);

const mapState = (state, ownProps) => {
  const { commentId, value } = getEditorData(state);
  return {
    ...ownProps,
    editorIsOpen: getEditorStatus(state),
    deviceInfo: getDeviceInfo(state),
    pageInfo: getPageInfo(state),
    initialValue: value,
    commentId
  };
};

const actions = {
  postComment,
  putComment,
  resetEditorData,
  updateEditorStatus,
  updateCommentListScrollOffset
};

export default connect(
  mapState,
  actions
)(WrappedBasicEditor);
