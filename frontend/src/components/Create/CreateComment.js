import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import { addComment } from '../../actions/index';

class CreateComment extends Component {
  state = {author: '',body: ''}
  componentDidMount() {
    if (this.props.comment) {
      const { author, body } = this.props.comment;
      this.setState({author,body});
    }
  }
  change = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }
  submitForm = (event) => {
    event.preventDefault();
    let { ...comment } = this.state;
    comment.parentId = this.props.parentId;
    this.props.addComment(comment);
    this.setState({ author: '', body: '' });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
		<TextField type="text" name="author" id="author" value={this.state.author} onChange={this.change} placeholder="author" />
        <br/>
        <TextField type="textarea" name="body" id="body" value={this.state.body} onChange={this.change} placeholder="Comment" />
        <br/>
        <Button color="primary">Submit</Button>
      </form>
    );
  }
}
CreateComment.propTypes = {addComment: PropTypes.func,comment: PropTypes.object,parentId: PropTypes.string};
export default connect(null,{addComment: addComment})(CreateComment);