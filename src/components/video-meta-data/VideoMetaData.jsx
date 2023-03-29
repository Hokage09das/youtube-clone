import React, { useEffect } from "react";

import moment from "moment";
import numeral from "numeral";

import { MdThumbDown, MdThumbUp } from "react-icons/md";

import "./_video_meta_data.scss";
import ReactShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";

const VideoMetaData = ({ video, videoId }) => {
  const dispatch = useDispatch();

  const { channel } = useSelector((state) => state.channelDetails);

  useEffect(() => {
    dispatch(getChannelDetails(video?.snippet?.channelId));
    dispatch(checkSubscriptionStatus(video?.snippet?.channelId));
  }, [dispatch, video?.snippet?.channelId]);

  return (
    <div className='video_meta_data py2'>
      <div className='video_meta_data_top'>
        <h5>{video?.snippet?.title}</h5>
        <div className='d-flex justify-content-between align-items-center py-1'>
          <span>
            {numeral(video?.statistics?.viewCount).format("0.a")} Views •
            {moment(video?.snippet?.publishedAt).fromNow()}
          </span>
          <div>
            <span className='mr-3'>
              <MdThumbUp size={26} />
              {numeral(video?.statistics?.likeCount).format("0.a")}
            </span>
            <span className='mr-3'>
              <MdThumbDown size={26} />
              {numeral(video?.statistics?.dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className='video_meta_data_channel d-flex  justify-content-between align-items-center my-2 py-3'>
        <div className='d-flex'>
          <img
            src={channel?.snippet?.thumbnails?.default?.url}
            alt=''
            className='rounder-circle mr-3'
          />
          <div className='d-flex flex-column'>
            <span>{video?.snippet?.channelTitle}</span>
            <span>
              {numeral(channel?.statistics?.subscriberCount).format("0.a")}{" "}
              Subcribers
            </span>
          </div>
        </div>

        <button className='btn border-0 p-2 m-2'>Subsribe</button>
      </div>
      <div className='video_meta_data_description'>
        <ReactShowMoreText
          lines={3}
          more='Show more'
          less='Show Less'
          anchorClass='showMoreText'
          expanded={false}
        >
          {video?.snippet?.description}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
