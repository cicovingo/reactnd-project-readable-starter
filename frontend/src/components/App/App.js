import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import CreatePost from '../Create/CreatePost';
import Detail from '../Detail';
import { fetchCategories, fetchPosts } from '../../actions/index';
import AppBar from './AppBar';
import Root from '../Root';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="container">
        <AppBar />
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/addPost" component={CreatePost} />
          <Route exact path="/:category" component={Root} />
          <Route path="/:category/:postId" component={Detail} />
        </Switch>
      </div>
    );
  }
}
App.propTypes = {fetchCategories: PropTypes.func,fetchPosts: PropTypes.func,};
export default  withRouter(connect(null,{fetchCategories: fetchCategories,fetchPosts: fetchPosts})(App));