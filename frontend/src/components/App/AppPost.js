import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import { FaPencil, FaThumbsOUp, FaThumbsODown, FaTrashO } from 'react-icons/lib/fa';  
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CreatePost from '../Create/CreatePost';
import { votePost, deletePost } from '../../actions/index';

class AppPost extends Component {  
  state = { edit: false }
  deleteForHandle = () => {
    this.props.deletePost(this.props.post.id);
  }
  handleVote = (vote) => {
    this.props.votePost(this.props.post.id, vote);
  }
  editForHandle = () => {
    this.setState({ edit: !this.state.edit });
    <CreatePost edit post={this.props.post}/>
  }
  countOfComments = () => {   
      return `Number of Comments: ${this.props.post.comments}`;
  }
  render() {
    const { post } = this.props;
    return (
      <Card className="c">
        <div className="a">
        </div>
          <CardTitle>
            <Link to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </CardTitle>
          <CardText>
			<p>{post.body}</p>
            <p>Author: {post.author}</p>
            <p>{this.countOfComments()}</p>		
          </CardText>
        <div className="b">
          <CardActions>
            <FlatButton onClick={this.deleteForHandle}><FaTrashO /></FlatButton>
			<FlatButton onClick={this.editForHandle}><FaPencil /></FlatButton>
			<FlatButton onClick={() => this.handleVote('upVote')}><FaThumbsOUp /></FlatButton>
            <FlatButton>{post.voteScore}</FlatButton>
            <FlatButton onClick={() => this.handleVote('downVote')}><FaThumbsODown /></FlatButton>
          </CardActions>
        </div>
      </Card>
    );
  }
}
AppPost.propTypes = {post: PropTypes.object.isRequired,votePost: PropTypes.func,deletePost: PropTypes.func};
export default connect(null,{votePost: votePost,deletePost: deletePost})(AppPost);
