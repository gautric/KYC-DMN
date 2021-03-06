import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Brand,
  Nav,
  NavList,
  NavItem,
  Page,
  PageHeader,
  PageSidebar,
  PageHeaderTools,
  SkipToContent
} from '@patternfly/react-core';
import { routes } from '@app/routes';

import { KYCAppLauncher } from '@app/UIComponent/KYCAppLauncher';

import kycLogo from '../../images/KYC-icon-145.svg';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({children}) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const Header = (
    <PageHeader
      logo={<span dangerouslySetInnerHTML={{__html: kycLogo}} />}         
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      headerTools={<KYCAppLauncher/>}
    />
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map((route, idx) => route.label && (
            <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
              <NavLink exact to={route.path} activeClassName="pf-m-current">{route.label}</NavLink>
            </NavItem>
          ))}
      </NavList>
    </Nav>
  );
  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );
  const PageSkipToContent = (
    <SkipToContent href="#primary-app-container">
      Skip to Content
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
