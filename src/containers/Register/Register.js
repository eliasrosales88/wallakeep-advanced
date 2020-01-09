import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button';
import Label from '../../components/Form/Label';


export class Register extends Component {
  state = {
    name: "",
    lastname: ""
  }



  componentDidMount() {
    if (localStorage.getItem("authenticated")) {
      this.setState({
        authenticated: true
      });

      

      this.props.history.push("list")
    }
    
  }
  
  componentDidUpdate() {}
  
  inputHandler = (event) => {
    event.persist();
       
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

  }  

  onBlurHandler = () => {
    this.setState({
      touched: true
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
       
    const { name, lastname } = this.state;

    this.onBlurHandler();

    if (name.length > 0 && lastname.length > 0) {
      localStorage.setItem("name", name);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("authenticated", "true");

      this.props.onInputHandler({
        name, lastname, auth: true
      })
      


      this.props.history.push("list");

    }

  }

  render() {
    const { name, lastname, touched, authenticated } = this.state;

    return (
      <Fragment>
        <div className="row mt-4">
          <div className="offset-md-3 col-md-6 col-xs-12 ">
            {authenticated ? <h1>Login</h1> : <h1>Register</h1>}
            <Form onSubmit={this.onSubmit}>
              <div className="form-group">
              <Label htmlFor="name" labelText="Name*" />
              <Input type="text" name="name" value={name} className="form-control" placeholder="Enter name" onChange ={this.inputHandler} />
              {name.length === 0 && touched &&
                  <small id="nameHelp" className="form-text text-danger">Name should not be empty</small>
                }

              </div>
              <div className="form-group">
                <Label htmlFor="lastname" labelText="Lastname*" />
              <Input type="text" name="lastname" value={lastname} className="form-control" placeholder="Enter lastname" onChange ={this.inputHandler} />
              {lastname.length === 0 && touched &&
                  <small id="lastnameHelp" className="form-text text-danger">Lastname should not be empty</small>
                }

              </div>
              <Button className="btn btn-primary disabled" buttonText="Submit" />
              <small id="requiredText" className="form-text text-muted">(*) Required</small>
            </Form>
          </div>

        </div>

      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputName: state.name,
    inputLastname: state.lastname
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onInputHandler: (inputs) => dispatch({type: actions.LOGIN, val: inputs }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
