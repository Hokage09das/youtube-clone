import React, { useEffect, useState } from "react";

import "./_video_horizontal.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { AiFillEye } from "react-icons/ai";

import moment from "moment";
import numeral from "numeral";
import { Col, Row } from "react-bootstrap";
import request from "../../api";
import { useNavigate } from "react-router-dom";

const VideoHorizontal = ({ video, subScreen }) => {
  const {
    id,
    snippet: {
      title,
      publishedAt,
      channelTitle,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${id.videoId}`);
  };
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

  return (
    <Row
      className='video_horizontal'
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={6}
        className='video_horizontal_left'
      >
        <LazyLoadImage
          src={medium.url}
          effect='blur'
          className='video_horizontal_thumbnail'
          wrapperClassName='video_horizontal_thumbnail_wrapper'
        />
        <span className='video_top_duration'>{_duration}</span>
      </Col>
      <Col
        xs={6}
        md={6}
        className='video_horizontal_right'
      >
        <p className='video_horizontal_title'>{title}</p>
        <div className='video_horizontal_details'>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
          {moment(publishedAt).fromNow()}
        </div>
        <div className='video_horizontal_channel d-flex align-items-center my-1'>
          <p className='mb-0'>{channelTitle} </p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
