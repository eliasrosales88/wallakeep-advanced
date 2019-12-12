import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./contexts/auth-context";
import ApiContext from "./contexts/api-context";

class App extends Component {
  state = {
    name: localStorage.getItem("name") || "",
    lastname: localStorage.getItem("lastname") || "",
    authenticated: localStorage.getItem("authenticated") || false,
    back: localStorage.getItem("back") || false
  }

  loginHandler = (state) => {
    const { name, lastname, authenticated, back } = state;
    
    this.setState({
        name: name,
        lastname: lastname,
        authenticated: authenticated,
        back: back

    });
    
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <ErrorBoundary>
            <AuthContext.Provider value={{
              name: this.state.name,
              lastname: this.state.lastname,
              authenticated: this.state.authenticated,
              login: this.loginHandler,
              back: this.state.back
            }}>
              <ApiContext.Provider>
                <Layout>
                  
                </Layout>
              </ApiContext.Provider>
            </AuthContext.Provider>
            </ErrorBoundary>
        </BrowserRouter>
        </div>
    );
}
}
export default App;
