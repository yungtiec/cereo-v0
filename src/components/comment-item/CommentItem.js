import React from "react";
import { Comment, Tooltip, Avatar, List, Icon, Row, Col } from "antd";
import moment from "moment";
import classnames from "classnames";
import { CommentItemStyle, CommentItemHover } from "./CommentItem.module.scss";
import { connect } from "react-redux";
import {
  getMe,
  updateEditorStatus,
  setEditorData,
  deleteComment,
  updateCommentItemStatus
} from "store-popup";

const CommentItem = ({
  comment,
  onClick,
  hoverStyle,
  hideReplyBtn,
  updateEditorStatus,
  setEditorData,
  deleteComment,
  updateCommentItemStatus,
  me,
  rootId,
  children
}) => {
  var actions = [];
  actions = comment.deviceInfo
    ? actions.concat(
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
      )
    : actions;
  actions = !hideReplyBtn
    ? actions.concat(<span key={`comment-${comment.id}__reply`}>Reply</span>)
    : actions;
  actions =
    (me.isGuest && comment.guestId === me.id) ||
    (!!me.id && !me.isGuest && comment.ownerId === me.id)
      ? actions.concat([
          <span
            key={`comment-${comment.id}__edit`}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              updateEditorStatus(true);
              setEditorData({ commentId: comment.id, value: comment.text });
            }}
          >
            Edit
          </span>,
          <span
            key={`comment-${comment.id}__delete`}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              if (!rootId) updateCommentItemStatus(null);
              deleteComment({ commentId: comment.id, rootId: rootId });
            }}
          >
            Delete
          </span>
        ])
      : actions;
  return (
    <List.Item
      className={classnames(CommentItemStyle, {
        [CommentItemHover]: hoverStyle
      })}
      onClick={onClick}
    >
      <Comment
        actions={actions}
        author={
          comment.owner
            ? comment.owner.name
            : comment.guestOwner
            ? comment.guestOwner.name
            : ""
        }
        avatar={<Avatar icon="user" />}
        content={<p>{comment.text}</p>}
        datetime={
          <Tooltip
            title={moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(comment.createdAt).fromNow()}</span>
          </Tooltip>
        }
      >
        {children}
      </Comment>
    </List.Item>
  );
};

const mapState = (state, ownProps) => ({ ...ownProps, me: getMe(state) });

const actions = {
  updateEditorStatus,
  setEditorData,
  deleteComment,
  updateCommentItemStatus
};

export default connect(
  mapState,
  actions
)(CommentItem);
