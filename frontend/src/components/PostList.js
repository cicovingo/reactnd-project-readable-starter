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
const PostList = ({ comments4, decScorePost4, deletingPost4, filter4, incScorePost4, editPostModal4, posts4, sort4 }) => {
  let filteredPosts = [];
  if (filter4 !== '') {
    filteredPosts = posts4.filter((p) => p.category === filter4)
  } else {
    filteredPosts = posts4;
  }
  if (sort4.order === 'asc') {
    filteredPosts.sort( (a, b) => a[sort4.field] - b[sort4.field] )
  } else {
    filteredPosts.sort( (a, b) => b[sort4.field] - a[sort4.field] )
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
          incScoreForPost6={incScorePost4}
          decScoreForPost6={decScorePost4}
        />
        <NumberOfComments
          postId={p.id}
          comments={comments4}
        />
        <RaisedButton
          label="Edit"
          onClick={() => editPostModal4({ id: p.id, title: p.title, body: p.body })}
          style={{margin: 12}}
        >
          <ContentEdit />
        </RaisedButton>  
        <RaisedButton
          onClick={() => deletingPost4(p.id)}
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
PostList.propTypes = { comments4: PropTypes.object.isRequired, decScorePost4: PropTypes.func.isRequired, deletingPost4: PropTypes.func.isRequired, filter4: PropTypes.string.isRequired, incScorePost4: PropTypes.func.isRequired, editPostModal4: PropTypes.func.isRequired, posts4: PropTypes.array.isRequired, sort4: PropTypes.object.isRequired }
export default PostList;
