import React from 'react';
import PropTypes from 'prop-types';
const onCategoryFilterChanged = (event) => {
  const newFilter = event.target.value;
  this.filter(newFilter);
}
const CategoryList = ({ categories, filterFunc }) => {
  this.filter = filter;
  return (
    <select onChange={onCategoryFilterChanged} >
      <option value="">All</option>
      { categories.map((category) =>
        <option value={category.name} key={category.name}>
          {category.name}
        </option>
      )}
    </select>
  );
}
CategoryList.propTypes = { categories: PropTypes.array.isRequired, filter: PropTypes.func.isRequired,
}
const CategoryHeader = ({ categories, filter }) => {
  return (
    <div>
      <h2>Categories</h2>
      <CategoryList 
        categories={categories} 
        filter={filter}
      />
    </div>
  );
};

CategoryHeader.propTypes = { categories: PropTypes.array.isRequired, filter: PropTypes.func.isRequired
}
export default CategoryHeader;