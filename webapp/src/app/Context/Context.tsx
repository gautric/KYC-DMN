import { string } from 'prop-types';
import React, { createContext } from 'react';

export const Context = createContext({
    apiUrl: string,
    updateApiUrl: (url:string) => {}
});

export class ContextProvider extends React.Component {
  updateApiUrl = (url:string) => {
    this.setState(
      state => ({
        ...state,
        apiUrl: url,
      })
    );
  };

  state = {
    apiUrl : "/api",
    updateApiUrl: this.updateApiUrl,
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export class ContextConsumer extends React.Component {
  render() {
    return <Context.Consumer>{this.props.children}</Context.Consumer>;
  }
}

Context.displayName = 'Context';
