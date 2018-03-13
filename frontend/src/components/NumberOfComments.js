import React from 'react';
import PropTypes from 'prop-types';
import CardText from 'material-ui/Card';
const NumberOfComments = ({ postId, comments }) => {
  let number = 0;
  if (!comments) {
    return number;
  }
  if (Array.isArray(comments)) {
    number = comments.length;
  }
  else {
    if (comments[postId]) {
      number = comments[postId].length;
    }
  }
  const commentText = number === 1 ? "comment" : "comments";
  return (
    <CardText>{number} {commentText}</CardText>
  );
}
NumberOfComments.propTypes = { postId: PropTypes.string.isRequired, comments: PropTypes.any.isRequired }
export default NumberOfComments;
