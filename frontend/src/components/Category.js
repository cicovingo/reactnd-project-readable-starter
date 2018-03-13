import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import AppToolbar from './AppToolbar';
const Category = (props) => {
  const { changeOrder, comments, decScoreForPost, deletingPost, filter, incScoreForPost, openEditPostModal, posts, sort } = props;
  return (
    <div>    
      <AppToolbar sortingTitle="Order" changeOrder={changeOrder} />
      <PostList comments={comments} decScoreForPost={decScoreForPost} deletingPost={deletingPost} filter={filter} incScoreForPost={incScoreForPost} openEditPostModal={openEditPostModal} posts={posts} sort={sort} />
    </div>
  );
};

Category.propTypes = { changeOrder: PropTypes.func.isRequired, comments: PropTypes.object.isRequired, decScoreForPost: PropTypes.func.isRequired, deletingPost: PropTypes.func.isRequired, filter: PropTypes.string.isRequired, incScoreForPost: PropTypes.func.isRequired, openEditPostModal: PropTypes.func.isRequired, posts: PropTypes.array.isRequired, sort: PropTypes.object.isRequired }
export default Category;
