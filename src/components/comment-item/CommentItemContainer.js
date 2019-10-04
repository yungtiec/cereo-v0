import React from "react";
import { connect } from "react-redux";
import { getCurrentCommentItem, updateCommentItemStatus } from "store-popup";
import { Comment, Tooltip, Avatar, List, Icon, Row, Col } from "antd";
import moment from "moment";
import { CommentItemStyle, BackBtn } from "./CommentItem.module.scss";
import { CommentItem } from "components";

const CommentItemContainer = ({ comment, updateCommentItemStatus }) =>
  comment ? (
    <div>
      <div className={BackBtn} onClick={() => updateCommentItemStatus(null)}>
        <Icon type="arrow-left" />
        <span>Back</span>
      </div>
      <CommentItem
        classNames={CommentItemStyle}
        comment={comment}
        onClick={() => {}}
      />
    </div>
  ) : null;

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    comment: getCurrentCommentItem(state)
  };
};

const actions = { updateCommentItemStatus };

export default connect(
  mapState,
  actions
)(CommentItemContainer);
