import request from '../../api';

import {
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
} from '../actionType';

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_VIDEO_REQUEST });

    const res = await request.get('videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        category: 'All',
        videos: res?.data?.items,
        nextPageToken: res?.data?.nextPageToken,
      },
    });
  } catch (e) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: e.message,
    });
    console.log(e.message);
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_VIDEO_REQUEST });

    const res = await request.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });

    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: res?.data?.items,
        nextPageToken: res?.data?.nextPageToken,
        category: keyword,
      },
    });
  } catch (e) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: e.message,
    });
    console.log(e.message);
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELECTED_VIDEO_REQUEST });

    const { data } = await request('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    });

    dispatch({ type: SELECTED_VIDEO_SUCCESS, payload: data.items[0] });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SELECTED_VIDEO_FAIL, payload: error.message });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });

    const res = await request('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: id,
        maxResults: 15,
        type: 'video',
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: res?.data?.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });
    const res = await request('/search', {
      params: {
        part: 'snippet',

        maxResults: 20,
        q: keyword,
        type: 'video,channel',
      },
    });

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: res.data?.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
