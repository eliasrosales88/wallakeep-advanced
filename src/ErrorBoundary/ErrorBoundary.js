import React, { Component } from 'react'

export class ErrorBoundary extends Component {

  state = {
    hasError: false,
    ErrorMessage: ""
  }

  componentDidCatch = (error, info) =>{
    this.setState({
      hasError: true,
      ErrorMessage: error
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.ErrorMessage}</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
