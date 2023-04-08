import { create } from 'zustand'

const KYC_API_URL = "http://127.0.0.1:8080/api";

interface ContextState {
    apiURL: string
    updateAPIURL: (url: string) => void
}  

export const useContextStore = create<ContextState>()((set) => ({
    apiURL: KYC_API_URL,
    updateAPIURL: (url) => {console.log(url); set((state) => ({ apiURL: url }));},
}))
