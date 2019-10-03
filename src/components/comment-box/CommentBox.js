import React from "react";
import { connect } from "react-redux";
import {
  getEditorStatus,
  getCommentBoxStatus,
  toggleCommentBox
} from "store-popup";

const CommentBox = ({ editorIsOpen, commentBoxIsOpen }) =>
  commentBoxIsOpen && !editorIsOpen ? <div>hello</div> : null;

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    editorIsOpen: getEditorStatus(state),
    commentBoxIsOpen: getCommentBoxStatus(state)
  };
};

const actions = { toggleCommentBox };

export default connect(
  mapState,
  actions
)(CommentBox);
