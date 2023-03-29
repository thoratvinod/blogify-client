import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Blog from './Blog/Blog';
import useStyles from './styles';

const Blogs = ({ setCurrentId }) => {
  const { blogs, isLoading } = useSelector((state) => state.blogs);
  const classes = useStyles();

  if (!blogs.length && !isLoading) return 'No blogs';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {blogs?.map((blog) => (
          <Grid key={blog._id} item xs={12} sm={12} md={6} lg={3}>
            <Blog blog={blog} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Blogs;
