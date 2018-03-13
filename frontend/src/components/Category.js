import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import AppToolbar from './AppToolbar';
const Category = (props) => {
  const { changeOrder2, comments2, decScoreForPost2, deletingPost2, filter2, incScoreForPost2, openEditPostModal2, posts2, sort2 } = props;
  return (
    <div>    
      <AppToolbar sortingTitle5="Order" changeOrder5={changeOrder2} />
      <PostList comments4={comments2} decScoreForPost4={decScoreForPost2} deletingPost4={deletingPost2} filter4={filter2} incScoreForPost4={incScoreForPost2} openEditPostModal4={openEditPostModal2} posts4={posts2} sort4={sort2} />
    </div>
  );
};

Category.propTypes = { changeOrder2: PropTypes.func.isRequired, comments2: PropTypes.object.isRequired, decScoreForPost2: PropTypes.func.isRequired, deletingPost2: PropTypes.func.isRequired, filter2: PropTypes.string.isRequired, incScoreForPost2: PropTypes.func.isRequired, openEditPostModal2: PropTypes.func.isRequired, posts2: PropTypes.array.isRequired, sort2: PropTypes.object.isRequired }
export default Category;
