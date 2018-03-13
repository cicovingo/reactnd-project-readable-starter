import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppToolbar from './AppToolbar';
import PostList from './PostList';
const Root = (props) => {
  const { changeOrder1, comments1, decScorePost1, deletingPost1, filter1, filterFunc1, incScorePost1, addPostModal1, editPostModal1, posts1, sort1 } = props;
  return (
    <div>
	<AppToolbar filterFunc5={filterFunc1} sort5={sort1} changeOrderFunc5={changeOrder1}/>      
    <PostList comments4={comments1} decScorePost4={decScorePost1} deletingPost4={deletingPost1} filter4={filter1} incScorePost4={incScorePost1} editPostModal4={editPostModal1} posts4={posts1} sort4={sort1} />
      <FloatingActionButton style={{ margin: 20 }} onClick={ addPostModal1 } >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};
Root.propTypes = { changeOrder1: PropTypes.func.isRequired, comments1: PropTypes.object.isRequired, decScorePost1: PropTypes.func.isRequired, deletingPost1: PropTypes.func.isRequired, filter1: PropTypes.string.isRequired, filterFunc1: PropTypes.func.isRequired, incScorePost1: PropTypes.func.isRequired, addPostModal1: PropTypes.func.isRequired, editPostModal1: PropTypes.func.isRequired, posts1: PropTypes.array.isRequired, sort1: PropTypes.object.isRequired }
export default Root;
