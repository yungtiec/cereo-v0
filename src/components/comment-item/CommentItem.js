import React from "react";
import { Comment, Tooltip, Avatar, List, Icon, Row, Col } from "antd";
import moment from "moment";
import { CommentItemStyle } from "./CommentItem.module.scss";
import { connect } from "react-redux";
import { updateEditorStatus, setEditorValue } from "store-popup";

const CommentItem = ({
  comment,
  onClick,
  classNames,
  updateEditorStatus,
  setEditorValue
}) => (
  <List.Item className={classNames} onClick={onClick}>
    <Comment
      actions={[
        <span key={`comment-${comment.id}__reply`}>Reply</span>,
        <span
          key={`comment-${comment.id}__edit`}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            updateEditorStatus(true);
            setEditorValue(comment.text);
          }}
        >
          Edit
        </span>,
        <Tooltip
          key={`comment-${comment.id}__device-info`}
          title={
            <div>
              <Row>
                <Col span={12}>OS</Col>
                <Col span={12}>{comment.deviceInfo.os}</Col>
              </Row>
              <Row>
                <Col span={12}>Browser</Col>
                <Col span={12}>{comment.deviceInfo.browser}</Col>
              </Row>
              <Row>
                <Col span={12}>Screen size</Col>
                <Col
                  span={12}
                >{`${comment.deviceInfo.screenWidth} x ${comment.deviceInfo.screenHeight}`}</Col>
              </Row>
            </div>
          }
        >
          Device info
        </Tooltip>
      ]}
      author={comment.owner ? comment.owner.name : comment.guestName}
      avatar={<Avatar icon="user" />}
      content={<p>{comment.text}</p>}
      datetime={
        <Tooltip
          title={moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  </List.Item>
);

const mapState = (state, ownProps) => ({ ...ownProps });

const actions = {
  updateEditorStatus,
  setEditorValue
};

export default connect(
  mapState,
  actions
)(CommentItem);
