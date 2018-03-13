import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
const AppToolbar = ({ filterFunc, sort, changeOrder }) => {
  this.filterF = filterFunc;
  this.sort = sort;
  this.changeOrderF = changeOrder;
  const onSortFieldChanged = (event, index, value) => {
    const newSort = {
      field: value,
      order: this.sort.order
    };
    this.changeOrderF(newSort);
  }
  return (
    <Toolbar>
      <ToolbarGroup >
        <DropDownMenu value={"voteScore"} onChange={onSortFieldChanged}>
        </DropDownMenu>
      </ToolbarGroup>      
    </Toolbar>
  );
}
AppToolbar.propTypes = { filterFunc: PropTypes.func, sort: PropTypes.object.isRequired, changeOrder: PropTypes.func.isRequired }
export default AppToolbar;