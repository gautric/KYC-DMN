import * as React from 'react';

export const KYC_DMN_URL = process.env.KYC_DMN_URL;

export const KYCContext = React.createContext({
    url: process.env.KYC_DMN_URL,
    apiUrl : process.env.KYC_DMN_API_URL,
    metricsUrl : process.env.KYC_DMN_METRICS_URL,
    
    });
KYCContext.displayName = 'KYCContext';
