import React from "react";

export type ToastContextType = {
    content: string
    renderToast: boolean
    setContent: React.Dispatch<React.SetStateAction<string>>
    setRenderToast: React.Dispatch<React.SetStateAction<boolean>>
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

type ToastContextProviderProps = {
    children: React.ReactNode
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
    const [content, setContent] = React.useState<string>('');
    const [renderToast, setRenderToast] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    return <ToastContext.Provider value={{ content, renderToast, setContent, setRenderToast, isError, setIsError }}>
        {children}
    </ToastContext.Provider>
}