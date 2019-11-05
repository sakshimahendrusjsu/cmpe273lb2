import React, { Component } from 'react';
import { Form, Button, FormGroup, Label, Input, Container } from 'reactstrap';
import { Redirect } from 'react-router';
import './CreateBuyer.css';
import { connect } from 'react-redux';
import {signup} from '../Redux/actions/loginActions'

//App Component
class CreateOwner extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.submitSignUp = this.submitSignUp.bind(this);
  }
  submitSignUp(e) {
    let data = {
      'first' : null,
      'last' : null,
      'email' : null,
      'password' : null,
      'restaurant_name': "",
      'zipcode': "",
      'type':"owner"
    }
    e.preventDefault(); 
    data.first = (e.target[0].value);
    data.last = (e.target[1].value);
    data.email = (e.target[2].value);
    data.password = (e.target[3].value);
    data.phone = (e.target[4].value);
    data.restaurant_name = (e.target[5].value);
    data.zipcode = (e.target[6].value);
    console.log("insumbitsign up owner ", data);
    this.props.signup(data);
}
    
render() {
return (

      <div>
      <Container>
        <a href="/logino" id="signIn">Sign in -></a>
        <Form className="create-buyer" onSubmit={this.submitSignUp}>
          <h1><span className="font-weight-bold">Get more orders</span></h1>
          <h5>Ready to increase your takeout sales and reach new hungry customers? Become a Grubhub partner today!!</h5>
          <h4 className="text-centre">{this.props.message}</h4>
          <FormGroup>
            <Label>First name*</Label>
            <Input name="first" type="text" placeholder="First Name" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Last name*</Label>
            <Input name="last" type="text" placeholder="Last Name" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Email*</Label>
            <Input name="email" type="email" placeholder="Email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password*</Label>
            <Input name="password" type="password" placeholder="Password" minlength="8" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Phone*</Label>
            <Input name="phone" type="number" placeholder="xxx-xxx-xxxx" pattern="[0-9]" size="10" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Restaurant name*</Label>
            <Input name="restuarant_name" type="text" placeholder="Restaurant name" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Restaurant zip code*</Label>
            <Input name="zipcode" type="number" placeholder="Restaurant zip code" pattern="[0-9]" size="6" required></Input>
          </FormGroup>
          <Button  className="btn-lg btn-dark btn-block">Sign up now</Button>
          <div className="text-center pt-3">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</div>
        </Form>
      </Container>
      </div>
    );
  }
}

function mapStateToProps(store){
  return{
    output: store.login.output,
    message: store.login.message
  }
}

function mapDispatchToProps(dispatch){
  return{
    signup :(data) =>  dispatch(signup(data))
  }
}

//Export the App component so that it can be used in index.js
export default connect(mapStateToProps,mapDispatchToProps)(CreateOwner);
