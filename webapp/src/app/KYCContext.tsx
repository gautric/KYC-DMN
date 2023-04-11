import { string } from 'prop-types';
import React, { createContext } from 'react';

export const KYCContext = createContext({
    apiUrl: string,
    updateApiUrl: (url:string) => {}
});

export class KYCContextProvider extends React.Component {
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
    return <KYCContext.Provider value={this.state}>{this.props.children}</KYCContext.Provider>;
  }
}

export class KYCContextConsumer extends React.Component {
  render() {
    return <KYCContext.Consumer>{this.props.children}</KYCContext.Consumer>;
  }
}

KYCContext.displayName = 'KYCContext';
