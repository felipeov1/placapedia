"use client";

import { createContext, ReactNode, useState } from 'react';

export const ChoiseContext = createContext({
    placa: '',
    setPlaca: (e: string) => { },
    api: '',
    setApi: (e: '1' | '2' | '3') => { },
    method: '',
    setMethod: (e: 'PIX' | 'CREDIT_CARD') => { }
});

export const ChoiseProvivider = ({ children }: { children: ReactNode }) => {

    const [placa, setPlaca] = useState('');
    const [api, setApi] = useState<'1' | '2' | '3'>('1');
    const [method, setMethod] = useState<'PIX' | 'CREDIT_CARD'>('PIX');

    const handlePlaca = (element: string) => {
        setPlaca(element)
    };

    const handleApi = (element: '1' | '2' | '3') => {
        setApi(element);
    };

    const handleMethod = (element: 'PIX' | 'CREDIT_CARD') => {
        setMethod(element);
    };

    return (
        <ChoiseContext.Provider
            value={{
                placa,
                setPlaca: e => handlePlaca(e),
                api,
                setApi: e => handleApi(e),
                method,
                setMethod: e => handleMethod(e),
            }}
        >
            {children}
        </ChoiseContext.Provider>
    );
};