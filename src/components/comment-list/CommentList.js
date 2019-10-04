import React, { useRef } from "react";
import { connect } from "react-redux";
import { Comment, Tooltip, List, Avatar, Spin } from "antd";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import classnames from "classnames";
import { ScrollParentStyle } from "./CommentList.module.scss";
import {
  CommentItemStyle,
  CommentItemHover
} from "../comment-item/CommentItem.module.scss";
import {
  getCommentListStatus,
  updateCommentListStatus,
  updateCommentItemStatus,
  getComments,
  hasMoreComments,
  isFetchingComments,
  fetchComments
} from "store-popup";
import { CommentItem } from "components";

const CommentList = ({
  fetchComments,
  updateCommentListStatus,
  updateCommentItemStatus,
  commentListIsOpen,
  isFetchingComments,
  hasMoreComments,
  comments
}) => {
  const scrollParent = useRef(null);
  return commentListIsOpen ? (
    <div key="comment-list" className={ScrollParentStyle}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={fetchComments}
        hasMore={!isFetchingComments && hasMoreComments}
        useWindow={false}
        getScrollParent={() => scrollParent.current}
      >
        <List
          itemLayout="horizontal"
          dataSource={comments || []}
          renderItem={comment => {
            return (
              <CommentItem
                classNames={classnames(CommentItemStyle, CommentItemHover)}
                key={`comment-${comment.id}`}
                onClick={() => updateCommentItemStatus(comment.id)}
                comment={comment}
              />
            );
          }}
        >
          {isFetchingComments && hasMoreComments && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  ) : null;
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchingComments: isFetchingComments(state),
    hasMoreComments: hasMoreComments(state),
    comments: getComments(state),
    commentListIsOpen: getCommentListStatus(state)
  };
};

const actions = {
  fetchComments,
  updateCommentListStatus,
  updateCommentItemStatus
};

export default connect(
  mapState,
  actions
)(CommentList);
