import { connect } from 'react-redux';
import { Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AppPost from './App/AppPost';
import AppPostComment from './App/AppPostComment';
import CreateComment from './Create/CreateComment';
import { fetchPost, fetchComments } from '../actions/index';
import Page404 from './Page404';

class Detail extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId);
    this.props.fetchComments(this.props.match.params.postId);
  }
  render() {
    const { post }   = this.props;
    return (
     post ? (
	  <div>
        <AppPost post={post} onDelete={"location.href='/'"} />
        <Card>
          <ListGroup className="list-group-flush">
          {this.props.comments.map((comment) => <ListGroupItem className="comment" key={comment.id}><AppPostComment comment={comment} /></ListGroupItem>)}
          </ListGroup>   
          <CardBody>
            <CreateComment parentId={this.props.match.params.postId} />
          </CardBody>
        </Card>
      </div> 
	 ) : (<Page404 />)
    );
  }
}
const mapStateToProps = ({ post, comment }) => {
  let props = {};
  if (post.posts) {
    props.post = post.posts[Object.keys(post.posts)[0]];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments).map((id) => comment.comments[id]).filter((comment) => comment);
  }
  return props;
};
Detail.propTypes = {comments: PropTypes.array,fetchComments: PropTypes.func,fetchPost: PropTypes.func,match: PropTypes.object,post: PropTypes.object};
Detail.defaultProps = {comments: []};
export default connect(mapStateToProps,{ fetchPost: fetchPost,fetchComments: fetchComments,})(Detail);