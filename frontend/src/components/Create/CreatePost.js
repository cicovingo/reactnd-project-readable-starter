import { connect } from 'react-redux';
import { Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import { addPost } from '../../actions/index';

class CreatePost extends Component {
  state = {author: '',body: '',category: '',title: ''}
  componentDidMount() {
    if (this.props.post) {
      const {author,body,category,title} = this.props.post;
      this.setState({author,body,category,title});
    }
  }
  change = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }
  submitForm = (event) => {
    event.preventDefault();
    const { ...post } = this.state;
    this.props.addPost(post);  
	this.props.history.replace('/');
  }
  render() {
    return (
	  <form onSubmit={this.submitForm}>
        <TextField type="text" id="title" name="title" value={this.state.title} onChange={this.change} hintText="Title" floatingLabelText="Title"/>
        <br/>
        <TextField type="text" id="author" name="author" value={this.state.author} onChange={this.change} hintText="Author" floatingLabelText="Author"/>
        <br/>
        <Input type="select" id="category" name="category"  value={this.state.category} onChange={this.change} >
          <option value="">Select Category</option>
          {this.props.categories.map((category) => (
            <option key={category} value={category}>
              {category[0].toUpperCase() + category.slice(1)}
            </option>
          ))}
        </Input>
        <br/>
        <TextField type="textarea" id="body" name="body" value={this.state.body} onChange={this.change} hintText="Post body" floatingLabelText="Post body"/>
		<br/>
		<Button color="primary">Submit</Button>
      </form>
    );
  }
}
CreatePost.propTypes = {addPost: PropTypes.func,categories: PropTypes.array,post: PropTypes.object};
CreatePost.defaultProps = {categories: []};
const mapStateToProps = ({ category }) => ({...category});
export default connect(mapStateToProps,{addPost: addPost})(CreatePost);