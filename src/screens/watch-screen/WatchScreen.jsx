import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

import Comments from '../../components/comments/Comments';

import VideoHorizontal from '../../components/video-horizontal/VideoHorizontal';
import VideoMetaData from '../../components/video-meta-data/VideoMetaData';

import {
  getRelatedVideos,
  getVideoById,
} from '../../redux/actions/videos.action';

import './_watch_screen.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideoLoading } = useSelector(
    (state) => state.relatedVideos,
  );

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  return (
    <Row>
      <Col lg={8}>
        <div className='watchScreen_player'>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder='0'
            title={video?.snippet?.title}
            allowFullScreen
            width='100%'
            height='100%'
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData
            video={video}
            videoId={id}
          />
        ) : (
          <h6>Loading...</h6>
        )}

        <Comments
          key='comment'
          videoId={id}
          totalComment={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!relatedVideoLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal
                key={video?.id?.videoId}
                video={video}
              />
            ))
        ) : (
          <SkeletonTheme
            color='#343a40'
            highlightColor='#3c4147'
          >
            <Skeleton
              width='100%'
              height='130'
              count={15}
            />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
