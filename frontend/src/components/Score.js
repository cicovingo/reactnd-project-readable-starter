import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
const Score = ({ id, score, incScoreForPost, decScoreForPost }) => {
  return (
    <div>      
      <IconButton
        iconClassName="material-icons"
        onClick={ () => decScoreForPost(id) }
      >
      thumb_down
      </IconButton>

      <span style={{margin:5}}>Score: { score }</span>

      <IconButton
        iconClassName="material-icons"
        onClick={ () => incScoreForPost(id) }
      >
      thumb_up
      </IconButton>
      
    </div>
  );
}
Score.propTypes = {
  incScoreForPost: PropTypes.func.isRequired,
  decScoreForPost: PropTypes.func.isRequired
}
export default Score;