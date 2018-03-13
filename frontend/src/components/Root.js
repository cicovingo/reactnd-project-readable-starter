import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppToolbar from './AppToolbar';
import PostList from './PostList';
const Root = (props) => {
  const { categories, changeOrder, comments, decScorePost, deletingPost, filter, filterFunc, incScorePost, addPostModal, editPostModal, posts, sort } = props;
  return (
    <div>
	<AppToolbar filterTitle="Category" categories={categories} filterFunc={filterFunc} filter={filter} sortingTitle="Order" sort={sort} changeOrderFunc={changeOrder}
      />      <PostList comments={comments} decScorePost={decScorePost} deletingPost={deletingPost} filter={filter} incScorePost={incScorePost} editPostModal={editPostModal} posts={posts} sort={sort} />
      <FloatingActionButton style={{ margin: 20 }} onClick={ addPostModal } >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};
Root.propTypes = { categories: PropTypes.array.isRequired, changeOrder: PropTypes.func.isRequired, comments: PropTypes.object.isRequired, decScorePost: PropTypes.func.isRequired, deletingPost: PropTypes.func.isRequired, filter: PropTypes.string.isRequired, filterFunc: PropTypes.func.isRequired, incScorePost: PropTypes.func.isRequired, addPostModal: PropTypes.func.isRequired, editPostModal: PropTypes.func.isRequired, posts: PropTypes.array.isRequired, sort: PropTypes.object.isRequired }
export default Root;
