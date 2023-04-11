import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

import { ContextProvider } from '@app/Context/Context';

const App: React.FunctionComponent = () => (
  <ContextProvider>
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  </ContextProvider>
);

export default App;
