import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";

import Comment from "../comment/Comment";

import "./_comments.scss";

const Comments = ({ videoId, totalComment }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if (inputValue.length > 0) dispatch(addComment(videoId, inputValue));
  };

  const { comments } = useSelector((state) => state.commentList);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet,
  );

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);

  return (
    <div className='comments'>
      <p> {totalComment} Comments</p>
      <div className='comments_form d-flex w-100 my-2'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/147/147144.png?w=360'
          alt=''
          className='rounded-circle mr-3'
        />
        <form
          action=''
          className='d-flex flex-grow-1'
          onSubmit={handleComment}
        >
          <input
            type='text'
            className='flex-grow-1'
            placeholder='Write comment'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='border-0 p-2'>Comment</button>
        </form>
      </div>

      <div className='comments_list'>
        {_comments?.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
