import React, { createContext } from 'react';

interface IContext {
  apiUrl: string,
  updateApiUrl: (url:string) => {}
}

export const Context = createContext<IContext>({} as IContext);

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
    apiUrl : '/api',
    updateApiUrl: this.updateApiUrl,
  } as IContext;

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

// export class ContextConsumer extends React.Component<IContext,{children:ChildNode}> {
//   render() {
//     return <Context.Consumer>{this.props.children}</Context.Consumer>;
//   }
// }

export const ContextConsumer = ({children}) => {
  return <Context.Consumer>{children}</Context.Consumer>
}


Context.displayName = 'Context';
