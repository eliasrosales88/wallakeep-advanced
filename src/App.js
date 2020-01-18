import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  state = {
    name: localStorage.getItem("name") || "",
    lastname: localStorage.getItem("lastname") || "",
    authenticated: localStorage.getItem("authenticated") || false,
    back: localStorage.getItem("back") || false
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <ErrorBoundary>
                <Layout>
                  
                </Layout>
            </ErrorBoundary>
        </BrowserRouter>
        </div>
    );
}
}
export default App;
