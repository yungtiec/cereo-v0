import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { Comment, Tooltip, Avatar, Spin } from "antd";
import moment from "moment";
import { ScrollParentStyle } from "./CommentList.module.scss";
import {
  getCommentListStatus,
  getCommentListScrollOffset,
  updateCommentListStatus,
  updateCommentItemStatusAndSendMessage,
  updateCommentListScrollOffset,
  getComments,
  isFetchingComments,
  fetchComments
} from "store-popup";
import { CommentItem } from "components";

const CommentList = ({
  fetchComments,
  updateCommentListStatus,
  updateCommentItemStatusAndSendMessage,
  updateCommentListScrollOffset,
  commentListIsOpen,
  isFetchingComments,
  comments,
  scrollOffset
}) => {
  const reactWindow = useRef(null);
  useEffect(() => {
    scrollOffset && reactWindow.current.scrollTo(scrollOffset);
    return () => {
      updateCommentListScrollOffset(reactWindow.current.state.scrollOffset);
    };
  }, []);

  return (
    <div key="comment-list" className={ScrollParentStyle}>
      <List
        layout="vertical"
        itemData={comments || []}
        width={358}
        height={399}
        itemCount={comments.length || 0}
        itemSize={148}
        ref={reactWindow}
      >
        {props => {
          const comment = props.data[props.index];
          return (
            <CommentItem
              style={props.style}
              key={`comment-${comment.id}`}
              onClick={() => updateCommentItemStatusAndSendMessage(comment.id)}
              comment={comment}
              hoverStyle={true}
            />
          );
        }}
      </List>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchingComments: isFetchingComments(state),
    comments: getComments(state),
    scrollOffset: getCommentListScrollOffset(state)
  };
};

const actions = {
  fetchComments,
  updateCommentListStatus,
  updateCommentItemStatusAndSendMessage,
  updateCommentListScrollOffset
};

export default connect(
  mapState,
  actions
)(CommentList);
