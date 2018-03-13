import React, { Component } from 'react';
import { Route, Router, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as uuid from 'uuid/v1';
import history from './history';
import { addingForComment, addingForPost, changeCommentsOrder, changeSortOrder, decPostScore, deletingForComment, deletingForPost, editingForComment, editingForPost, getAllCategory, getAllComment, getAllPost, incPostScore, filterCategory } from './actions';
import Root from './components/Root';
import Category from './components/Category';
import Post from './components/Post';
class App extends Component {
  state = { author: '', comment: '', commentId: '', addingCommentModal: false, addingPostModal: false, editingCommentModal: false, editingPostModal: false, postId: '', postTitle: '', postBody: '', postAuthor: '', postCategory: '', postEditId: '', postEditTitle: '', postEditBody: '' }
  componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPost();
  }
  addPostModal = () => {
    this.setState(() => ({
      addingPostModal: true
    }))
  } 
  addcPostModal = () => {
    this.setState(() => ({
      addingPostModal: false,
      postTitle: '',
      postBody: '',
      postAuthor: '',
      postCategory: ''
    }))
  }
  editPostModal = (data) => {
    this.setState(() => ({
      editingPostModal: true,
      postEditId: data.id,
      postEditTitle: data.title,
      postEditBody: data.body
    }))
  } 
  editcPostModal = (data) => {
    this.setState(() => ({
      editingPostModal: false,
      postEditId: '',
      postEditTitle: '',
      postEditBody: ''
    }))
  }
  addCommentModal = (data) => {
    this.setState(() => ({
      addingCommentModal: true,
      postId: data.postId
    }))
  } 
  addcCommentModal = (data) => {
    this.setState(() => ({
      addingCommentModal: false,
      comment: '',
      author: ''
    }))
  }
  editCommentModal = (data) => {
    this.setState(() => ({
      editingCommentModal: true,
      commentId: data.id,
      comment: data.body,
      postId: data.postId
    }))
  } 
  editcCommentModal = (data) => {
     this.setState(() => ({
      editingCommentModal: false,
      commentId: '',
      comment: '',
      postId: ''
    }))
  }
  commentChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  addCommentSubmit = (event) => {
    event.preventDefault();
    const comment = { 
      id: uuid(),
      body: this.state.comment,
      author: this.state.author,
      timestamp: Date.now(),
      parentId: this.state.postId,
      voteScore: 0
    };
    this.props.addingForComment(comment);
    this.addcCommentModal();
  }
  editCommentSubmit = (event) => {
    event.preventDefault();
    const comment = {
      id: this.state.commentId,
      body: this.state.comment,
      postId: this.state.postId,
      timestamp: Date.now()
    };
    this.props.editingForComment(comment);
    this.editcCommentModal();
  }
  postChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  addPostSubmit = (event) => {
    event.preventDefault();
    const post = { 
      id: uuid(),
      timestamp: Date.now(),
      voteScore: 0,
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory
    };
    this.props.addingForPost(post);
    this.addcPostModal();
  }
  editPostSubmit = (event) => {
    event.preventDefault();
    const post = { 
      id: this.state.postEditId,
      title: this.state.postEditTitle,
      body: this.state.postEditBody
    };
    this.props.editingForPost(post);
    this.editcPostModal();
  }
  renderAddCommentModal(post) {
    const actions = [<RaisedButton label="Cancel" secondary={true} onClick={this.addcCommentModal}/>, <RaisedButton label="Add" primary={true} onClick={this.addCommentSubmit}/>];
    return (
      <div>
        <Dialog title="Comment" actions={actions} modal={true} open={this.state.addingCommentModal}>
          <form onSubmit={this.addCommentSubmit}>
            <TextField name="comment" value={this.state.comment} onChange={this.commentChange} hintText="Comment" floatingLabelText="Comment"/>           
            <br/>
            <TextField name="author" value={this.state.author} onChange={this.commentChange} hintText="Author" floatingLabelText="Author"/>
          </form>
        </Dialog>
      </div>
    );
  }
  renderEditCommentModal(post) {
    const actions = [<RaisedButton label="Cancel" secondary={true} onClick={this.editcCommentModal}/>, <RaisedButton label="Save" primary={true} onClick={this.editCommentSubmit}/>];
    return (
      <div>
        <Dialog title="Edit comment" actions={actions} modal={true} open={this.state.editingCommentModal}>
          <form onSubmit={this.editCommentSubmit}>
            <TextField name="comment" value={this.state.comment} onChange={this.commentChange} hintText="Comment" floatingLabelText="Comment" multiLine={true} rows={2}/>
          </form>
        </Dialog>      
      </div>
    );
  }
  renderAddPostModal() {
    const actions = [<RaisedButton label="Cancel" secondary={true} onClick={this.addcPostModal}/>, <RaisedButton label="Add" primary={true} onClick={this.addPostSubmit}/>];
    return (
      <div>
        <Dialog title="Post" actions={actions} modal={true} open={this.state.addingPostModal}>
          <form onSubmit={this.addPostSubmit}>
            <TextField name="postTitle" value={this.state.postTitle} onChange={this.postChange} hintText="Title" floatingLabelText="Title"/>
            <br/>
            <TextField name="postAuthor" value={this.state.postAuthor} onChange={this.postChange} hintText="Author" floatingLabelText="Author"/>
            <br/>
            <TextField name="postCategory" value={this.state.postCategory} onChange={this.postChange} hintText="Category" floatingLabelText="Category"/>
            <br/>
            <TextField name="postBody" value={this.state.postBody} onChange={this.postChange} hintText="Post body" floatingLabelText="Post body"/>
          </form>
        </Dialog>
      </div>
    );
  }
  renderEditPostModal() {
    const actions = [<RaisedButton label="Cancel" secondary={true} onClick={this.editcPostModal}/>, <RaisedButton label="Change" primary={true} onClick={this.editPostSubmit}/>];
    return (
      <div>
        <Dialog title="Edit post" actions={actions} modal={true} open={this.state.editingPostModal}>
          <form onSubmit={this.editPostSubmit}>
            <TextField name="postEditTitle" value={this.state.postEditTitle} onChange={this.postChange} hintText="Post title" floatingLabelText="Post title"/>
            <br/>
            <TextField name="postEditBody" value={this.state.postEditBody} onChange={this.postChange} hintText="Post body" floatingLabelText="Post body"/>
          </form>
        </Dialog>
      </div>
    );
  }
  renderAppBar() {
    return (
      <Link style={{ textDecoration: 'none' }} to="/">
        <AppBar title="2ND PROJECT"/>
      </Link>
    )
  }
  render() {
    const {  categories, changeSortOrder, commentsOrder, changeCommentsOrder, comments, decPostScore, deletingForComment, deletingForPost, filter, filterCategory, incPostScore, posts, sort } = this.props;
    return (
     <Router history={history}>
      <div>
        { this.renderAppBar() }
        <Route exact path="/:category/:postId" render= { ({ match }) => {
          const { postId } = match.params;
          const post = posts.find( (p) => p.id === postId )
          const postComments = comments[postId];
          return (
            <div>
              <Post post={post} comments={postComments} commentsOrder={commentsOrder} changeOrderFunc={changeCommentsOrder} decScoreForPost={decPostScore} deletingComment={deletingForComment} deletingPost={deletingForPost} incScoreForPost={incPostScore} addCommentModal={this.addCommentModal} editCommentModal={this.editCommentModal} editPostModal={this.editPostModal} />
              { this.renderAddCommentModal(post) }
              { this.renderEditCommentModal(post) }
              { this.renderEditPostModal() }
            </div>                            
          );
        }} />
        <Route exact path="/:category" render={ ({ match }) => (
          <div>
            <Category changeOrder={changeSortOrder} comments={comments} decScorePost={decPostScore} deletingPost={deletingForPost} filter={match.params.category} incScorePost={incPostScore} editPostModal={this.editPostModal} posts={posts} sort={sort} />
            { this.renderEditPostModal() }
          </div>
        )} />
        <Route exact path="/" render={ () => (
          <div>
            <Root categories={categories} changeOrder={changeSortOrder} comments={comments} decScorePost={decPostScore} deletingPost={deletingForPost} filter={filter} filterFunc={filterCategory} incScorePost={incPostScore} addPostModal={this.addPostModal} editPostModal={this.editPostModal} posts={posts} sort={sort} />
            { this.renderAddPostModal() }
            { this.renderEditPostModal() }
          </div>
        )} />
      </div>
     </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = (dispatch) => {
  return {
	addingForComment(data) {
      dispatch(addingForComment(data));
    },
	addingForPost(data) {
      dispatch(addingForPost(data));
    },
	changeSortOrder(sort){
      dispatch(changeSortOrder(sort));
    },
    changeCommentsOrder(order) {
      dispatch(changeCommentsOrder(order));
    },
	decPostScore(id){
      dispatch(decPostScore(id));
    },
	deletingForComment(id) {
      dispatch(deletingForComment(id));
    },
	deletingForPost(postId) {
      dispatch(deletingForPost(postId));
    },
	editingForComment(data) {
      dispatch(editingForComment(data));
    },
	editingForPost(data) {
      dispatch(editingForPost(data));
    },
    getAllCategories(){
      dispatch(getAllCategory());
    },
	getAllComment(postId) {
      dispatch(getAllComment(postId));
    },
    getAllPost(sortBy){
      dispatch(getAllPost(sortBy));
    },  
    incPostScore(id){
      dispatch(incPostScore(id));
    },  
    filterCategory(filter){
      dispatch(filterCategory(filter));
    }    
  }
}
export default withRouter(
  connect(mapStateToProps,mapDispatchToProps) (App)
);
