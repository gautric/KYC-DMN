import * as React from 'react';

export const KYCContext = React.createContext({
    apiUrl : "/api",
});

KYCContext.displayName = 'KYCContext';
