import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './search.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { selectRestuarantByCuisine,selectRestuarantByItems } from '../Redux/actions/restaurantActions';

let cuisineSet = new Set();
class Search extends Component {
  constructor(props) {
    super(props);
    console.log(props.location);
    this.state = {
      searchText : props.location.state.searchText,
      result: [],
      cuisineItem:""
    };
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter= (row,index,event) => {
    let body = {
      'text' : this.state.searchText,
      'cuisine' : row
    }
  this.props.selectRestuarantByCuisine(body);
 }

  componentDidMount(){
    this.renderMyData();
  }

 renderMyData() {
    let data = {
      'text' : this.state.searchText
    }
   console.log(data);
   this.props.selectRestuarantByItems(data); 
  }

  renderTableData() {
    if(this.props.res!=undefined && this.props.res.length>0){
    console.log("dnskdn",this.props.res[0].sections);
    cuisineSet.clear();
    let arr=[];
    let cue =  this.props.res[0].sections.map((row, index) => {
      row.items.map(item=>{
        if(!cuisineSet.has(item.cuisine)){
        cuisineSet.add(item.cuisine)
        console.log(item.cuisine)
        arr.push(item.cuisine)
      }});
    });

    return arr.map((item,index)=>
      {return (
      <NavItem key={index}
       onClick={this.handleFilter.bind(this,item)}>
       {item}
    </NavItem>
    )
      });
    }
}

  render() {
    let cart="";
    console.log("search functionality");
    let search="";
    // let len = this.state.result ? this.state.result.length :0;
    // let resList = this.state.result ;
    // console.log("result set "+this.state.result);
    if(this.props.res!= undefined){ 
    cart =  <div className="container">
             <div className="row">
                    <div id = "leftbox">
                    <h1 id='filter'>Filter</h1>
                <table id='cuisine'>
                <Nav vertical>
                      {this.renderTableData()};
                  </Nav>
                </table>
              </div>
              <div id = "middlebox">
                <div>{this.props.res.length} Restaurants Found!! <hr /></div>
                <div>
                    <ul >
                        {this.props.res.map(res => (
                            <li key={res.id}>
                                <Link to={{ pathname: '/cart', state: {res:res}}}>{res.name}</Link>
                                <br/>
                                {/* <b>{res.name}</b>
                                <br></br> */}
                                <b>Served here!!</b>
                                <br/><br/>
                            </li>))
                        }
                    </ul>
                </div>
                </div>
            </div>
            </div>
    }else{
        cart= <div>No Restaurants Found!!!</div>
    }
        
    
    return (
        <div>
          <div class="header">
          <a href="/" class="logo">GRUBHUB</a>
          <a style={{position: 'absolute', right: 0}} href="/home" class="logo">BACK</a>
          <div class="header-right">
          </div>
        </div>
        {cart}
    </div>
     )
}
}

function mapStateToProps(store) {
  return {
    output: store.res.output,
    message: store.res.message,
    res: store.res.res,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectRestuarantByItems: (data) => dispatch(selectRestuarantByItems(data)),
    selectRestuarantByCuisine: (data)=> dispatch(selectRestuarantByCuisine(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
