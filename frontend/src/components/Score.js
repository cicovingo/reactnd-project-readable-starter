import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
const Score = ({ id, score, incScoreForPost6, decScoreForPost6 }) => {
  return (
    <div>      
      <IconButton
        iconClassName="material-icons"
        onClick={ () => decScoreForPost6(id) }
      >
      thumb_down
      </IconButton>

      <span style={{margin:5}}>Score: { score }</span>

      <IconButton
        iconClassName="material-icons"
        onClick={ () => incScoreForPost6(id) }
      >
      thumb_up
      </IconButton>
      
    </div>
  );
}
Score.propTypes = {
  incScoreForPost6: PropTypes.func.isRequired,
  decScoreForPost6: PropTypes.func.isRequired
}
export default Score;
