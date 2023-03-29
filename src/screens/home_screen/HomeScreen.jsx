import React, { useEffect } from 'react';

import { Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CategoryBar from '../../components/category_bar/CategoryBar';
import Video from '../../components/video/Video';

import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.action';

import InfinityScroll from 'react-infinite-scroll-component';

import './_home_screen.scss';
import SkeletonVideo from '../../components/skeleton/SkeletonVideo';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos,
  );

  const fetchData = () => {
    if (activeCategory === 'All') dispatch(getPopularVideos());
    else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);
  console.log(videos);

  return (
    <Container>
      <CategoryBar />
      <InfinityScroll
        style={{ display: 'flex', flexWrap: 'wrap' }}
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div>
        }
      >
        {!loading
          ? videos.map((video, index) => (
              <Col
                lg={3}
                md={4}
                key={video.id.videoId + index || video.id + index}
              >
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((el, index) => (
              <Col
                lg={3}
                md={4}
                key={index}
              >
                <SkeletonVideo />
              </Col>
            ))}
      </InfinityScroll>
    </Container>
  );
};

export default HomeScreen;
