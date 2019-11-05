import React, { Component } from 'react';
import Products from '../Cart/Product';
import cookie from 'react-cookies';
import './list.css';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getAll, deleteSectionItem } from '../Redux/actions/sectionAction';

class ItemsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 2,
            menu: "",
            renderPageNumbers: "",
            name: localStorage.getItem("restaurant_name")
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    componentDidMount() {
        this.renderMyData();
    }

    async renderMyData() {
        console.log("render data");
        if (cookie.load('cookyou')) {
            let user = cookie.load('cookyou')
            let data = {
                id: localStorage.getItem('_id'),
                email: localStorage.getItem('email'),
                name: localStorage.getItem('restaurant_name')
            }
          await  this.props.getAll(data);
            console.log("sections", this.props.sections);
        }
    }

    handleRemoveItem = (e, product,sectionId) => {
        console.log("e", e.target);
        console.log("product in handle to cart", product);
        let data = {
            email: localStorage.getItem('email'),
            name: localStorage.getItem('restaurant_name'),
            section_id:sectionId,
            product: product
        }
        this.props.deleteSectionItem(data);
        this.renderMyData();
    }

    render() {
      
        if (this.props.sections != undefined) {
            console.log("sections agagae")
            let foodItems=this.props.sections
            const { currentPage, todosPerPage } = this.state;

            // Logic for displaying todos
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = foodItems.slice(indexOfFirstTodo, indexOfLastTodo);

            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(foodItems.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }

            this.state.renderPageNumbers = pageNumbers.map(number => {
                return (

                    <li
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number} 
                    </li>  
                );
            });

            if (!cookie.load('cookyou')) {
                return (<Redirect to="/" />)
            }
            console.log("menu", this.props.sections)
            this.state.menu = <Products products={currentTodos} type={"owner"} handleRemoveItem={this.handleRemoveItem} />
        }
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">GRUBHUB</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hi,{this.state.name}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="/ordero">
                                        Orders
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
                <div className="container">
                    <hr />
                    <div className="row">
                        <div className="col-md-9">
                            <div style={{ display: 'inline-block' }}>
                                <h2>MENU PAGE</h2>
                                <a class="btn btn-default" style={{ position: 'absolute', right: 1, backgroundColor: '#000CBA', color: "#FFF000" }} href="/addS" class="updatemenu">UPDATE MENU</a>
                            </div>
                            <hr />

                            <ul>
                                {this.state.menu}
                            </ul>
                           <div style={{display:'flex',flexDirection:'row'}}>
                           <ul class="footer">
                               {/* <li>Pages</li> */}
                                {this.state.renderPageNumbers}
                            </ul>
                            </div> 
                           
                            {/* {menu} */}
                        </div>
                    </div>
                </div>
            </div>
        );
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
        getAll: (data) => dispatch(getAll(data)),
        deleteSectionItem: (data) => dispatch(deleteSectionItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);