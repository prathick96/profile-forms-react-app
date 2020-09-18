import React, { Component } from "react";

class ErrorBoundry extends Component {
  static getDerivedStateFromError(err) {
    return {
      isCrashed: true
    };
  }

  state = {
    isCrashed: false
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { children } = this.props;

    if (!this.state.isCrashed) {
      return children;
    }

    return <h1>Something went wrong here..</h1>;
  }
}

export default ErrorBoundry;
