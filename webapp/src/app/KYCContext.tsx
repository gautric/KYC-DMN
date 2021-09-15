import * as React from 'react';

export const KYC_DMN_URL = process.env.KYC_DMN_URL;

export const KYCContext = React.createContext({url: KYC_DMN_URL});
KYCContext.displayName = 'KYCContext';
