import { connect } from 'react-redux';
import { FaTrashO, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'; 
import FlatButton from 'material-ui/FlatButton'; 
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { deleteComment, voteComment } from '../../actions/index';

class AppPostComment extends Component {
  deleteForHandle = () => {
    this.props.deleteComment(this.props.comment.id);
  }
  handleVote = (vote) => {
    this.props.voteComment(this.props.comment.id, vote);
  }
  render() {
    const { comment } = this.props;
    return (
      <div className="g">
        <div className="h">
          <p>{comment.body}</p>
          <p>
            <span className="i">{comment.author}</span>
          </p>
        </div>
        <FlatButton onClick={this.deleteForHandle}><FaTrashO /></FlatButton>
		<FlatButton onClick={() => this.handleVote('upVote')}><FaThumbsOUp /></FlatButton>
        <FlatButton>{comment.voteScore}</FlatButton>
        <FlatButton onClick={() => this.handleVote('downVote')}><FaThumbsODown /></FlatButton>       
      </div>
    );
  }
}
AppPostComment.propTypes = {comment: PropTypes.object.isRequired,deleteComment: PropTypes.func,voteComment: PropTypes.func};
export default connect(null,{deleteComment: deleteComment,voteComment: voteComment})(AppPostComment);