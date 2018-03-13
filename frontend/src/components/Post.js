import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Score from './Score';
import NumberOfComments from './NumberOfComments';
import Comment from './Comment';
import AppToolbar from './AppToolbar';
const Post = (props) => {
  const { changeOrderFunc3, commentsOrder3, comments3, decScoreForPost3, deletingComment3, deletingPost3, incScoreForPost3, addCommentModal3, editCommentModal3, editPostModal3, post3 } = props;
  let commentSectionTitle = <h4>No comments</h4>;
  let commentList;
  if (comments3.length !== 0) {
    commentSectionTitle = <h4>Comments</h4>;
    commentList = comments3.map((c) =>
      <Comment id={c.id} timestamp={c.timestamp} body={c.body} author={c.author} score={c.voteScore} postId={post3.id} deletingComment={deletingComment3} editCommentModal={editCommentModal3} />
    );
  }
  return (
    <div>
      <AppToolbar sortingTitle5="Order" sort5={commentsOrder3} changeOrderFunc5={changeOrderFunc3}/>
      <Card>
        <CardTitle title={post3.title} />
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          <Link to={`/${post3.category}`}>
            <Chip style={{ marginLeft: 10 }}>
              {post3.category}
            </Chip>
          </Link>
        </div>
        <CardText>Date: {moment(post3.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post3.author} :: </CardText>
        <CardText>{post3.body}</CardText>        
        <Score id={post3.id} score={post3.voteScore} incScoreForPost6={incScoreForPost3} decScoreForPost6={decScoreForPost3} />
        <NumberOfComments postId={post3.id} comments={comments3} />
        <RaisedButton label="Edit" onClick={() => editPostModal3({ id: post3.id, title: post3.title, body: post3.body })} style={{margin: 12}}>
          <ContentEdit />
        </RaisedButton>
        <RaisedButton onClick={() => deletingPost3(post3.id)} label="Delete" style={{margin: 12}}>
          <ContentDelete />
        </RaisedButton>
      </Card>
      { commentSectionTitle }
      <RaisedButton label="comment" onClick={ () => addCommentModal3({ postId: post3.id}) } style={{ margin: 12 }} />
      { commentList }         
    </div>
  );
}
Post.defaultProps = { comments3: [] }
Post.propTypes = { comments3: PropTypes.array.isRequired, incScoreForPost3: PropTypes.func.isRequired, decScoreForPost3: PropTypes.func.isRequired, deletingComment3: PropTypes.func.isRequired, deletingPost3: PropTypes.func.isRequired, addCommentModal3: PropTypes.func.isRequired, editCommentModal3: PropTypes.func.isRequired, editPostModal3: PropTypes.func.isRequired, post3: PropTypes.object.isRequired
}
export default Post;
