import React from "react";
import { SprintVariables } from "../../routers";

export type AppContextType = {
    data: SprintVariables | undefined
    setData: React.Dispatch<React.SetStateAction<SprintVariables>>
    envPath: string
    setEnvPath: React.Dispatch<React.SetStateAction<string>>
}

type AppContextProviderType = {
    children: React.ReactNode
}

export const AppContext = React.createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: AppContextProviderType) {
    const [data, setData] = React.useState<SprintVariables>({
        GOOGLE_CLIENT_ID: '',
        GOOGLE_CLIENT_SECRET: '',
        SMTP_CHARSET: '',
        SMTP_CONTENT_TYPE: 'text/html',
        SMTP_DEBUG: '',
        SMTP_ENCRYPTION: '',
        SMTP_FROM_EMAIL: '',
        SMTP_HOST: '',
        SMTP_PASSWORD: '',
        SMTP_PORT: '',
        SMTP_USERNAME: ''   
    });

    const [envPath, setEnvPath] = React.useState<string>('');
    return <AppContext.Provider value={{ data, setData, envPath, setEnvPath }}>
        {children}
    </AppContext.Provider>
}
