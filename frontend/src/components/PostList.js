import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Score from './Score';
const NumberOfComments = ({ postId, comments }) => {
  let number = 0;
  if (!comments) {
    return number;
  }
  if (Array.isArray(comments)) {
    number = comments.length;
  }
  else {
    if (comments[postId]) {
      number = comments[postId].length;
    }
  }
  const commentText = number === 1 ? "comment" : "comments";
  return (
    <CardText>{number} {commentText}</CardText>
  );
}
NumberOfComments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.any.isRequired
}
const PostList = ({ comments, decScorePost, deletingPost, filter, incScorePost, editPostModal, posts, sort }) => {
  let filteredPosts = [];
  if (filter !== '') {
    filteredPosts = posts.filter((p) => p.category === filter)
  } else {
    filteredPosts = posts;
  }
  if (sort.order === 'asc') {
    filteredPosts.sort( (a, b) => a[sort.field] - b[sort.field] )
  } else {
    filteredPosts.sort( (a, b) => b[sort.field] - a[sort.field] )
  }
  return (
    <div>
      { filteredPosts.length === 0 &&
      <Card><CardTitle title={'No posts'} /></Card> 
      }

      { filteredPosts && filteredPosts.map((p) =>
      <Card key={p.id}>
        <Link to={`/${p.category}/${p.id}`}>
          <CardTitle title={p.title} />
        </Link>
        
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          <Link to={`/${p.category}`}>
            <Chip style={{ marginLeft: 10 }}>
              {p.category}
            </Chip>
          </Link>
        </div>
        <CardText>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {p.author} :: </CardText>
        <CardText>{p.body}</CardText>
        <Score
          id={p.id}
          score={p.voteScore}
          incScoreForPost={incScorePost}
          decScoreForPost={decScorePost}
        />
        <NumberOfComments
          postId={p.id}
          comments={comments}
        />
        <RaisedButton
          label="Edit"
          onClick={() => editPostModal({ id: p.id, title: p.title, body: p.body })}
          style={{margin: 12}}
        >
          <ContentEdit />
        </RaisedButton>  
        <RaisedButton
          onClick={() => deletingPost(p.id)}
          label="Delete"
          style={{margin: 12}}
        >
          <ContentDelete />
        </RaisedButton>       
      </Card>
      )}
    </div>
  );
}
PostList.propTypes = { comments: PropTypes.object.isRequired, decScorePost: PropTypes.func.isRequired, deletingPost: PropTypes.func.isRequired, filter: PropTypes.string.isRequired, incScorePost: PropTypes.func.isRequired, editPostModal: PropTypes.func.isRequired, posts: PropTypes.array.isRequired, sort: PropTypes.object.isRequired }
export default PostList;