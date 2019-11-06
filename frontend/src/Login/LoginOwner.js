import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { signin } from '../Redux/actions/loginActions';

//Define a Login Component
class LoginOwner extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.submitSignIn = this.submitSignIn.bind(this);
    }

    submitSignIn(e) {
        e.preventDefault();
        let data = {
            'email': null,
            'password': null,
            'type' : "owner"
        }
        data.email = (e.target[0].value);
        data.password = (e.target[1].value);
        console.log("insumbitsign in", data);
        this.props.signin(data);
    }

    render() {
        if (localStorage.getItem("token")!=null && localStorage.getItem("type")=="owner") {
            return (<Redirect to="/dItems" />);
          }
        return (
            <React.Fragment>
                <div class="header">
          <a href="/" class="logo">GRUBHUB</a>
          <div class="header-right">
          </div>
        </div>
                <Form className="create-buyer" onSubmit={this.submitSignIn}>
                    <h3><span className="font-weight-bold">GRUBHUB FOR RESTAURANTS</span></h3>
                    <h5>{this.props.message}</h5>
                    <FormGroup>
                        <Label>Email address</Label>
                        <Input type="email" placeholder="Email" name="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Password" name="password" minlength="8" required></Input>
                    </FormGroup>
                    <Button className="btn-lg btn-dark btn-block">Sign in</Button>
                    <div className="text-centre">
                        <a href="/createo" id="signIn">Sign Up</a>
                        <br />
                        <span>Forgot username</span> <br />
                        <span>Forgot password</span>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

function mapStateToProps(store) {
    return {
      output: store.login.ouput,
      message: store.login.message
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      signin: (data) => dispatch(signin(data))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginOwner);