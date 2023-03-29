import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Blog from '../Blogs/Blog/Blog';
import { getBlogsByCreator, getBlogsBySearch } from '../../actions/blogs';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state.blogs);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getBlogsBySearch({ tags: name }));
    } else {
      dispatch(getBlogsByCreator(name));
    }
  }, []);

  if (!blogs.length && !isLoading) return 'No blogs';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {blogs?.map((blog) => (
            <Grid key={blog._id} item xs={12} sm={12} md={6} lg={3}>
              <Blog blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
