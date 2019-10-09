import React from "react";
import { connect } from "react-redux";
import {
  getCurrentCommentItem,
  updateCommentItemStatusAndSendMessage,
  getCommentItemStatus
} from "store-popup";
import { Comment, Avatar, Icon } from "antd";
import moment from "moment";
import { BackBtn, ReplyEditorContainer } from "./CommentThread.module.scss";
import { CommentThread, ReplyEditor } from "components";

const CommentThreadWithReplyEditor = ({
  showCommentThread,
  comment,
  updateCommentItemStatusAndSendMessage
}) =>
  showCommentThread ? (
    <div>
      <div
        className={BackBtn}
        onClick={() => updateCommentItemStatusAndSendMessage(null)}
      >
        <Icon type="arrow-left" />
        <span>Back</span>
      </div>
      <CommentThread comment={comment} onClick={() => {}} />
      <Comment
        className={ReplyEditorContainer}
        avatar={<Avatar icon="user" />}
        content={<ReplyEditor rootId={comment.id} />}
      />
    </div>
  ) : null;

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    comment: getCurrentCommentItem(state),
    showCommentThread: getCommentItemStatus(state)
  };
};

const actions = { updateCommentItemStatusAndSendMessage };

export default connect(
  mapState,
  actions
)(CommentThreadWithReplyEditor);
