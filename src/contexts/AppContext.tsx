import React from "react";
import { SprintVariables } from "../../routers";

export type AppContextType = {
    data: SprintVariables | undefined
    setData: React.Dispatch<React.SetStateAction<SprintVariables | undefined>>
    envPath: string
    setEnvPath: React.Dispatch<React.SetStateAction<string>>
    googleClientId: string
    setGoogleClientId: React.Dispatch<React.SetStateAction<string>>
    googleSecretKey: string
    setGoogleSecretKey: React.Dispatch<React.SetStateAction<string>>
}

type AppContextProviderType = {
    children: React.ReactNode
}

export const AppContext = React.createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: AppContextProviderType) {
    const [data, setData] = React.useState<SprintVariables | undefined>();
    const [googleClientId, setGoogleClientId] = React.useState<string>('');
    const [googleSecretKey, setGoogleSecretKey] = React.useState<string>('');
    const [envPath, setEnvPath] = React.useState<string>('');
    return <AppContext.Provider value={{ data, setData, envPath, setEnvPath, googleClientId, setGoogleClientId, googleSecretKey, setGoogleSecretKey }}>
        {children}
    </AppContext.Provider>
}
