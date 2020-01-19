import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  state = {
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
