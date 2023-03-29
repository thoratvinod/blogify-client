import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getBlog, getBlogsBySearch } from '../../actions/blogs';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Blog = () => {
  const { blog, blogs, isLoading } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id]);

  useEffect(() => {
    if (blog) {
      dispatch(getBlogsBySearch({ search: 'none', tags: blog?.tags.join(',') }));
    }
  }, [blog]);

  if (!blog) return null;

  const openBlog = (_id) => history.push(`/blogs/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedBlogs = blogs.filter(({ _id }) => _id !== blog._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{blog.title}</Typography>
          <div className={classes.imageSection}>
            <img className={classes.media} src={blog.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={blog.title} />
          </div>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{blog.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{blog.content}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${blog.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${blog.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(blog.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection blog={blog} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {!!recommendedBlogs.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedBlogs}>
            {recommendedBlogs.map(({ title, name, content, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openBlog(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{content}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Blog;
