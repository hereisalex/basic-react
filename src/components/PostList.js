import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useHistory } from 'react-router';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
    wordBreak: 'break-all',
    overflow: 'auto',
    backgroundColor: '#30244c',
    borderBottomRightRadius: '5px',
    // boxShadow: '0px 0px 5px black',
  },
  alignCenter: {
    textAlign: 'center',
  },
  loader: {
    textAlign: 'center',
    paddingTop: 20,
  },
  maxWidth: {
    width: '100%',
  },
  listHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    backgroundColor: '#30244c',
    color: 'white',
    borderBottom: '3px solid #B19de4',
    
    // boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

export default function PostList({ isLoading, posts, getAdditionalPosts, listHeaderTitle, listHeaderTitleButton }) {
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      {isLoading ?
        <div className={classes.loader}>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          <ListItem
            alignItems="flex-start"
            className={classes.listHeader}
          >
            <Typography
              variant='h5'
              fontWeight="fontWeightBold"
              maxWidth
            >
              {listHeaderTitle}
              {listHeaderTitleButton && listHeaderTitleButton}
            </Typography>
          </ListItem>
          {posts.map(post => (
            <span>
              <PostItem post={post} />
              <Divider component="li" />
            </span>
          ))}
          <ListItem
            alignItems="flex-start"
            className={classes.alignCenter}
            key='loadmore'
          >
            <ListItemText
              primary={
                <Button variant='outlined' onClick={() => getAdditionalPosts()} className={classes.maxWidth}> Read More </Button>
              }
            />
          </ListItem>
        </List>
      }
    </div>
  )
}

function PostItem({ post }) {
  const classes = useStyles();
  const history = useHistory();
  const now = moment();
  console.log(now)

  const calcTimestampDiff = (timestamp) => {
    const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

    for (let i=0; i < scales.length; i++){
      const scale = scales[i];
      const diff = moment(now).diff(timestamp * 1000, scale);
      if( diff > 0) return diff + scale.charAt(0)
    }

    return 0 + scales[scales.length - 1].charAt(0)
  }

  return (
    <ListItem alignItems='flex-start' key={post.id}>
      <ListItemAvatar>
        <div className={classes.clickable} onClick={() => history.push('/' + post.owner)}>
          <Avatar alt={post.owner} src='/' />
        </div>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {post.owner}
            <Typography
              color='textSecondary'
              display='inline'
            >
              {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.timestamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <Typography
            color='textPrimary'
          >
            {post.content}
          </Typography>
        }
      />
    </ListItem>
  )
}