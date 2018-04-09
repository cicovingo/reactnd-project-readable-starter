import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AppPost from './App/AppPost';
import { fetchPosts, sortOrder } from '../actions/index';
  
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }
  componentDidMount() {
    if (this.props.match.params.category)
      this.props.fetchPosts(this.props.match.params.category);
    else
      this.props.fetchPosts();
  }
  sort = (sortType) => {
  	return this.props.sortOrder(sortType);
  }
  handleChange = (event, index, value) => {
	if(value === 1){
		this.sort('voteScore')
	} else if(value === 2){
		this.sort('-voteScore')
	}
	this.setState({value});
  }
  
  render() {
    return (
      <div>
	<DropDownMenu value={this.state.value} onChange={this.handleChange}>
		<MenuItem value={1} primaryText="Popular Post" />
		<MenuItem value={2} primaryText="Not Popular Post" />
	</DropDownMenu>
        {this.props.posts.map((post) => <AppPost key={post.id} post={post}/>)}
      </div>
    );
  }
}
const fromSort = (key) => {
	let sortOrder = 1;
	console.log(key);
	if (key[0] === '-') {
		sortOrder = -1;
		key = key.substr(1);
	}
    return function (a, b) {
		return sortOrder * ((a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0);
  }; 
};
Root.propTypes = {fetchPosts: PropTypes.func,match: PropTypes.object,posts: PropTypes.array,sortOrder: PropTypes.func};
const mapStateToProps = ({ post }) => {
  if (post.posts) {
    let posts = Object.keys(post.posts).map((postId) => post.posts[postId]).filter((post) => post);
	console.log(posts.sortBy);
    if (post.sortBy){
		posts.sort(fromSort(post.sortBy));
	}
    return { posts };
  } else
    return { posts: [] };
};
export default connect(mapStateToProps,{fetchPosts: fetchPosts,sortOrder: sortOrder})(Root);
