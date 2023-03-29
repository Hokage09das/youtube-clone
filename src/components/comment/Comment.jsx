import React from "react";

import moment from "moment";
import "./_comment.scss";
import ReactShowMoreText from "react-show-more-text";

const Comment = ({ comment }) => {
  return (
    <div className='comment p-2 d-flex'>
      <img
        src={comment.authorProfileImageUrl}
        alt=''
        className='rounded-circle mr-3'
      />
      <div className='comment_body'>
        <p className='comment_header'>
          {comment.authorDisplayName} • {moment(comment.publishedAt).fromNow()}
        </p>
        <p className='comment_title'>
          <ReactShowMoreText
            lines={1}
            more='Show more'
            less='Show Less'
            anchorClass='showMoreText'
            expanded={false}
          >
            {comment.textDisplay}
          </ReactShowMoreText>
        </p>
      </div>
    </div>
  );
};

export default Comment;
