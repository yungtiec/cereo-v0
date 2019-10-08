import React from "react";
import { connect } from "react-redux";
import {
  getCurrentCommentItem,
  updateCommentItemStatus,
  getCommentItemStatus
} from "store-popup";
import { Comment, Avatar, Icon } from "antd";
import moment from "moment";
import { BackBtn, ReplyEditorContainer } from "./CommentThread.module.scss";
import { CommentThread, ReplyEditor } from "components";

const CommentThreadWithReplyEditor = ({
  showCommentThread,
  comment,
  updateCommentItemStatus
}) =>
  showCommentThread ? (
    <div>
      <div className={BackBtn} onClick={() => updateCommentItemStatus(null)}>
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

const actions = { updateCommentItemStatus };

export default connect(
  mapState,
  actions
)(CommentThreadWithReplyEditor);
