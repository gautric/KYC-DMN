import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

import { KYCContextProvider } from './KYCContext';

const App: React.FunctionComponent = () => (
  <KYCContextProvider>
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  </KYCContextProvider>
);

export default App;
