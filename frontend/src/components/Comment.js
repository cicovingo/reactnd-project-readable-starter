import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
export default Comment;
