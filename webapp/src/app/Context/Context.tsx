import React, { createContext, ReactElement } from 'react';

interface IContext {
  apiUrl: string,
  updateApiUrl: (url:string) => void
}

export const Context = createContext<IContext>({} as IContext);

export class ContextProvider extends React.Component<{children: any}> {
  updateApiUrl = (url:string):void => {
    this.setState(
      state => ({
        ...state,
        apiUrl: url,
      })
    )
  }

  state = {
    apiUrl : '/api',
    updateApiUrl: this.updateApiUrl,
  } as IContext;

  render():ReactElement {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export class ContextConsumer extends React.Component<{children: any}> {
  render():ReactElement {
    return <Context.Consumer>{this.props.children}</Context.Consumer>;
  }
}
// Another option
// export const ContextConsumer = ({children}) => {
//   return <Context.Consumer>{children}</Context.Consumer>
// }

Context.displayName = 'Context';
