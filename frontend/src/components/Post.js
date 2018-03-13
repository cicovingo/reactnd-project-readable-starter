import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Score from './Score';
import AppToolbar from './AppToolbar';
const Comment = ({ id, author, body, deletingComment, editCommentModal, postId, timestamp }) => {
  return (
      <Card key={id}>
        <CardText>{author} commented on {moment(timestamp).format("MMM-DD-YYYY hh:mma")}</CardText>
        <CardText>{body}</CardText>
        <CardActions>
          <FlatButton primary={ true } label="Edit" onClick={ () => editCommentModal({id, body, postId}) } />
          <FlatButton secondary={ true } label="Delete" onClick={ () => deletingComment(id) } />
        </CardActions>
      </Card>
  );
}
Comment.propTypes = { id: PropTypes.string.isRequired, author: PropTypes.string.isRequired, body: PropTypes.string.isRequired, deletingComment: PropTypes.func.isRequired, postId: PropTypes.string.isRequired, editCommentModal: PropTypes.func.isRequired, timestamp: PropTypes.number.isRequired }
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
NumberOfComments.propTypes = { postId: PropTypes.string.isRequired, comments: PropTypes.any.isRequired }
const Post = (props) => {
  const { changeOrderFunc, commentsOrder, comments, decScoreForPost, deletingComment, deletingPost, incScoreForPost, addCommentModal, editCommentModal, editPostModal, post } = props;
  let commentSectionTitle = <h4>No comments</h4>;
  let commentList;
  if (comments.length !== 0) {
    commentSectionTitle = <h4>Comments</h4>;
    commentList = comments.map((c) =>
      <Comment key={c.id} id={c.id} timestamp={c.timestamp} body={c.body} author={c.author} score={c.voteScore} postId={post.id} deletingComment={deletingComment} editCommentModal={editCommentModal} />
    );
  }
  return (
    <div>
      <AppToolbar sortingTitle="Order" sort={commentsOrder} changeOrderFunc={changeOrderFunc}/>
      <Card>
        <CardTitle title={post.title} />
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          <Link to={`/${post.category}`}>
            <Chip style={{ marginLeft: 10 }}>
              {post.category}
            </Chip>
          </Link>
        </div>
        <CardText>Date: {moment(post.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post.author} :: </CardText>
        <CardText>{post.body}</CardText>        
        <Score id={post.id} score={post.voteScore} incScoreForPost={incScoreForPost} decScoreForPost={decScoreForPost} />
        <NumberOfComments postId={post.id} comments={comments} />
        <RaisedButton label="Edit" onClick={() => editPostModal({ id: post.id, title: post.title, body: post.body })} style={{margin: 12}}>
          <ContentEdit />
        </RaisedButton>
        <RaisedButton onClick={() => deletingPost(post.id)} label="Delete" style={{margin: 12}}>
          <ContentDelete />
        </RaisedButton>
      </Card>
      { commentSectionTitle }
      <RaisedButton label="comment" onClick={ () => addCommentModal({ postId: post.id}) } style={{ margin: 12 }} />
      { commentList }         
    </div>
  );
}
Post.defaultProps = { comments: [] }
Post.propTypes = { comments: PropTypes.array.isRequired, incScoreForPost: PropTypes.func.isRequired, decScoreForPost: PropTypes.func.isRequired, deletingComment: PropTypes.func.isRequired, deletingPost: PropTypes.func.isRequired, addCommentModal: PropTypes.func.isRequired, editCommentModal: PropTypes.func.isRequired, editPostModal: PropTypes.func.isRequired, post: PropTypes.object.isRequired
}
export default Post;
