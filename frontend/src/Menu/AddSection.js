import React, { Component } from 'react';
import '../App.css'
import { connect } from 'react-redux';
import { addSection } from '../Redux/actions/sectionAction';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav,UncontrolledCollapse,Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,NavItem,NavLink} from 'reactstrap';
import axios from 'axios';

//Define a Login Component
class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      redirectVar: "",
      message: ""
    }
    this.addSection = this.addSection.bind(this);
  }

  addSection(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    let data= {
      name:e.target[0].value,
      id:localStorage.getItem('_id'),
      email:localStorage.getItem('email'),
      restaurant_name:localStorage.getItem('restaurant_name')
    } 
   this.props.addSection(data);
   if(this.props.output){
     alert("Section Added Successfully");
   }
    e.target.reset();
  }

  render() {
    if (localStorage.getItem("token")==null && localStorage.getItem("type")!="owner") {
      return (<Redirect to="/" />)
    }
    return(
      <div>
<Navbar color="light" light expand="md">
          <NavbarBrand href="/">GRUBHUB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hi,{this.props.first}
                    </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/order">
                    PastOrders
                      </DropdownItem>
                  <DropdownItem href="/profile">
                    Account
                      </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/logout">
                    Logout
                      </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Nav pills>
        <NavItem>
          <NavLink active href="/addS">ADD SECTION </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  href="/delS">DELETE SECTION </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  href="/addI">ADD ITEM</NavLink>
        </NavItem>
        <NavItem>
              <NavLink  href="/dItems">MENU</NavLink>
            </NavItem>
        </Nav>

        <div>
    <br />
    <div class="alert alert-info alert-dismissable">
      <Button outline color="info" id="toggler3" style={{ marginBottom: '1rem' }}>
        New Section
</Button>
      <UncontrolledCollapse toggler="#toggler3">
        <form class="form-horizontal" role="form" onSubmit={this.addSection}>
          <div class="form-group">
            <label class="col-lg-3 control-label">Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" placeholder="Section Name" required/>
            </div>
          </div>
          <span>
            <button style={{ margin: '0 1rem' }}>Update Sections</button>
          </span>
        </form>
      </UncontrolledCollapse>
    </div>
  </div>

      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    output: store.section.output,
    message: store.section.message,
    sections: store.section.sections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSection: (data) => dispatch(addSection(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSection);