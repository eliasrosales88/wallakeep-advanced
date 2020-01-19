import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { isUserRegistered } from '../store/selectors';

const PrivateRoute = ({ authorized, ...props }) =>{

  return authorized ? <Route {...props} /> : <Redirect to="/" />;
}


const mapStateToProps = state => {
  
  return {
    authorized: isUserRegistered(state)
  }
};

export default connect(mapStateToProps)(PrivateRoute);
