import React, { Component, Fragment } from 'react'
import AdvertList from '../../components/AdverList/AdvertList'
import { Route, Switch, withRouter } from "react-router-dom";
import Register from '../Register/Register';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import AdvertForm from '../AdvertForm/AdvertForm';

import Icon from '@material-ui/core/Icon';

import { connect } from "react-redux";

import * as types from "../../store/types";
import LocalStorage from '../../utils/Storage';

export class Layout extends Component {

  componentDidMount(){

    
  }
  
  componentDidUpdate(){
    
  }

  logOutHandler = () => {
  
    LocalStorage.clearLocalStorage();
  
    //  localStorage.clear();
    
  //  this.props.onLogout({
  //   name: "",
  //   lastname: "",
  //   authenticated: false,
  //  })

   this.props.history.replace("/");
  }
  
  backHandler = () => {
    this.props.enableBack(false); 
    this.props.history.goBack();
  }

  render() {
    console.log('storeAuth', this.props.storeAuth);
    
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
    onLogout: () => dispatch({type: types.LOGOUT}),
    enableBack: (val) => dispatch({type: types.NAVIGATION, val })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
