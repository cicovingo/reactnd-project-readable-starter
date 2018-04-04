import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Page404 extends Component {
  
  render() {
    return (
		<div>
			<p>404 not found, No Post</p>
			<Link to="/" replace className="btn btn-block btn-primary">Readable Project Homepage</Link>
		</div>
    );
  }
}
Page404.propTypes = {};
export default Page404;