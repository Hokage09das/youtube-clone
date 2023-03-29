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
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
} from '../actionType';

const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All',
};

export const homeVideosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEO_SUCCESS: {
      const getByCategoryVideos =
        state.activeCategory === payload.category
          ? [...state.videos, ...payload.videos]
          : payload.videos;

      return {
        ...state,
        videos: getByCategoryVideos,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    }
    case HOME_VIDEO_REQUEST: {
      return {
        ...state,
      };
    }

    case HOME_VIDEO_FAIL: {
      return {
        ...state,
        error: payload,
      };
    }

    default:
      return state;
  }
};

const selectedState = {
  loading: false,
  video: null,
};
export const selectedVideoReducer = (state = selectedState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SELECTED_VIDEO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELECTED_VIDEO_SUCCESS: {
      return {
        ...state,
        loading: false,
        video: payload,
      };
    }

    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action,
) => {
  const { payload, type } = action;

  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

const searchVideoInitialState = {
  loading: true,
  videos: [],
};

export const searchedVideosReducer = (
  state = searchVideoInitialState,
  action,
) => {
  const { payload, type } = action;

  switch (type) {
    case SEARCHED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
