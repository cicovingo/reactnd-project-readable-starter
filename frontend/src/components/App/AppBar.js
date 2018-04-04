import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
class AppBar extends Component {
  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/"> Readable Project</NavbarBrand>     
            <Nav className="e" navbar>
              {this.props.categories.map((category) => (
                <NavItem key={category} >
                  <NavLink href={`/${category}`}>
                    {category[0].toUpperCase() + category.slice(1)}
                  </NavLink>
                </NavItem>
              ))}
			</Nav>
			<Nav className="m" navbar>
              <NavItem className="n">
                <NavLink href="/addPost/">Add Post</NavLink>
              </NavItem>
            </Nav>    
        </Navbar>
      </div>
    );
  }
}
AppBar.propTypes = {categories: PropTypes.array};
AppBar.defaultProps = {categories: []};
const mapStateToProps = ({ category }) => ({...category});
export default connect(mapStateToProps,null)(AppBar);
