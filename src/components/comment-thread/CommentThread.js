import React, { Fragment } from "react";
import { CommentItem } from "components";

const CommentThread = ({ comment, onClick }) => (
  <Fragment>
    <CommentItem
      comment={comment}
      hideReplyBtn={true}
      onClick={onClick}
      hoverStyle={false}
    >
      {comment.descendents.length
        ? comment.descendents.map(c => (
            <CommentItem
              hideReplyBtn={true}
              comment={c}
              rootId={comment.id}
              onClick={() => {}}
              hoverStyle={false}
            />
          ))
        : null}
    </CommentItem>
  </Fragment>
);

export default CommentThread;
