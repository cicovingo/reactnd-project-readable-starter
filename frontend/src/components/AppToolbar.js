import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
const AppToolbar = ({ filterFunc5, sort5, changeOrderFunc5 }) => {
  this.filterFunc5 = filterFunc5;
  this.sort5 = sort5;
  this.changeOrderFunc5 = changeOrderFunc5;
  const onSortFieldChanged = (event, index, value) => {
    const newSort = {
      field: value,
      order: this.sort.order
    };
    this.changeOrderFunc5(newSort);
  }
  return (
    <Toolbar>
      <ToolbarGroup >
        <DropDownMenu value={"voteScore"} onChange={onSortFieldChanged}>
        </DropDownMenu>
    	<DropDownMenu value={"timestamp"} onChange={onSortFieldChanged}>
        </DropDownMenu>
      </ToolbarGroup>      
    </Toolbar>
  );
}
AppToolbar.propTypes = { filterFunc5: PropTypes.func, sort5: PropTypes.object.isRequired, changeOrderFunc5: PropTypes.func.isRequired }
export default AppToolbar;
