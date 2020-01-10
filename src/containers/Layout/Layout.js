import React, { Component, Fragment } from 'react'
import AdvertList from '../../components/AdverList/AdvertList'
import { Route, Switch, withRouter } from "react-router-dom";
import Register from '../Register/Register';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import AdvertForm from '../AdvertForm/AdvertForm';

// import AuthContext from '../../contexts/auth-context';
import Icon from '@material-ui/core/Icon';


import { connect } from "react-redux";

import * as actions from "../../store/actions";

export class Layout extends Component {

  // static contextType = AuthContext;

  componentDidMount(){}
  
  componentDidUpdate(){
    
  }

  logOutHandler = () => {
   localStorage.clear();
    
   this.props.onLogout({
    name: "",
    lastname: "",
    authenticated: false,
   })

  //  this.context.login({
  //    name: "",
  //    lastname: "",
  //    authenticated: false,
  //    back: false
  //  });
   this.props.history.replace("/");
  }
  
  backHandler = () => {
    this.props.enableBack(false); 
    this.props.history.goBack();
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-dark bg-primary">
          {this.props.storeBack &&
        
            <span className="text-white" onClick={this.backHandler}><Icon>arrow_back</Icon></span>
          }
          
          <h2 className="text-white">Wallakeep </h2>
          <span>
            <span className="text-white">{this.props.storeName} {this.props.storeLastname}</span>
            {this.props.storeAuth &&
              <span className="text-white ml-1" onClick={this.logOutHandler}>
                |<span className="text-white ml-1 logout">Logout</span>
              </span>
            }
          </span>
        </nav>
          <main className="container-fluid pb-5">
            {this.props.children}
            <Switch>
              <Route exact path="/" component={Register} />
              <Route path="/list" component={AdvertList} />
              <Route path="/advert/:type/:id/" component={AdvertForm} />
              <Route path="/advert/:id" component={AdvertDetail} />
            </Switch>
          </main>
        <footer className="bg-dark p-2 text-center text-white">Wallakeep</footer>    
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    storeName: state.auth.name,
    storeLastname: state.auth.lastname,
    storeAuth: state.auth.authenticated,
    storeBack: state.nav.back
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({type: actions.LOGOUT}),
    enableBack: (val) => dispatch({type: actions.NAVIGATION, val })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
