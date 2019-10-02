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

class BasicEditor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return (
      <Form className={FormStyle} onSubmit={this.handleSubmit}>
        <Form.Item label="Leave your feedback">
          <Input.TextArea
            className={TextareaStyle}
            placeholder="Enter comment..."
          />
        </Form.Item>
        <Form.Item>
          <div className={classnames(BtnContainer, BtnContainerLeft)}>
            <Button type="primary" block={true} htmlType="submit">
              Save
            </Button>
          </div>
          <div className={classnames(BtnContainer, BtnContainerRight)}>
            <Button type="normal" block={true} htmlType="button">
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedBasicEditor = Form.create({ name: "BasicFrom" })(BasicEditor);

export default WrappedBasicEditor;
