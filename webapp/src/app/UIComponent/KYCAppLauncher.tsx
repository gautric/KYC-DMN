import React from 'react';
import { useCallback } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { ApplicationLauncher, ApplicationLauncherItem, DropdownPosition } from '@patternfly/react-core';

import { useKeycloak } from '@react-keycloak/web';

const LogoutItem = () => {
    const { keycloak } = useKeycloak();
    if (keycloak?.authenticated) return <ApplicationLauncherItem  key="logoutItem_key" onClick={() => keycloak?.logout()}>Logout</ApplicationLauncherItem> ;
    return null; // Do not remove
}; 

const LoginItem = withRouter(({ location }) => {
    const currentLocationState: { [key: string]: unknown } = location.state || {
      from: { pathname: '/' },
    };
    const { keycloak } = useKeycloak();
    const login = useCallback(() => {
      keycloak?.login();
    }, [keycloak]);
  
    if (!keycloak?.authenticated) return <ApplicationLauncherItem key="loginItem_key" onClick={login}>Login</ApplicationLauncherItem>
    return null; // Do not remove
  });

const UserItem = () => {
   
    const { keycloak } = useKeycloak();
    if (keycloak?.authenticated) return  <ApplicationLauncherItem key="userItem_key">{keycloak.tokenParsed?.name} ({keycloak.tokenParsed?.email})</ApplicationLauncherItem>  ;
    return null; // Do not remove
};

class KYCAppLauncher extends React.Component<{},{isOpen:boolean}> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, 
    };
  }

  onToggle = isOpen => {
    this.setState({
      isOpen
    });
  };

  onSelect = event => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;

    const appLauncherItems = [
      <UserItem key="userItem" />,
      <LoginItem key="loginItem" />,
      <ApplicationLauncherItem key="application_3a" component={<Link to="/config">Configuration</Link>}  />,
      <ApplicationLauncherItem key="disabled_application_4a" isDisabled>Unavailable Application</ApplicationLauncherItem>,
      <LogoutItem key="logoutItem" />
    ];

    const style = { marginLeft: 'calc(100% - 46px)' };

    return (
        <>
            <ApplicationLauncher
                onSelect={this.onSelect}
                onToggle={this.onToggle}
                isOpen={isOpen}
                items={appLauncherItems}
                position={DropdownPosition.right}
                style={style}
            />
        </>
    );
  }
}

export { KYCAppLauncher };
