"use client"
import React, {createContext, JSX, ReactNode, useContext, useState} from "react";

type ErrorType = {
    title: string
    description: string
}

type ErrorContextType = {
    error: ErrorType | undefined
    setError: (error: ErrorType | undefined) => void
    clearError: () => void
}

const ErrorContext = createContext<ErrorContextType>({
    error: undefined,
    setError: () => {},
    clearError: () => {},
})

export function ErrorProvider({children}: { children: ReactNode }): JSX.Element {
    const [error, setError] = useState<ErrorType | undefined>(undefined)

    const clearError = () => {
        setError(undefined)
    }

    return (<ErrorContext.Provider value={{error, setError, clearError}}>
        {children}
    </ErrorContext.Provider>)
}

export function useError() {
    return useContext(ErrorContext)
}
