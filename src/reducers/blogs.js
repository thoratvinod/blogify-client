import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_BLOG, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, blogs: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        blogs: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, blogs: action.payload.data };
    case FETCH_BLOG:
      return { ...state, blog: action.payload.blog };
    case LIKE:
      return { ...state, blogs: state.blogs.map((blog) => (blog._id === action.payload._id ? action.payload : blog)) };
    case COMMENT:
      return {
        ...state,
        blogs: state.blogs.map((blog) => {
          if (blog._id == +action.payload._id) {
            return action.payload;
          }
          return blog;
        }),
      };
    case CREATE:
      return { ...state, blogs: [...state.blogs, action.payload] };
    case UPDATE:
      return { ...state, blogs: state.blogs.map((blog) => (blog._id === action.payload._id ? action.payload : blog)) };
    case DELETE:
      return { ...state, blogs: state.blogs.filter((blog) => blog._id !== action.payload) };
    default:
      return state;
  }
};

