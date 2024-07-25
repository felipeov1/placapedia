import { LoaderCircle } from 'lucide-react';
import React from 'react';

function Loading({ text, permi = false }: { text?: string, permi?: boolean }) {
    return (
        <div className='w-full flex items-center justify-center gap-4'>
            <h1 className='text-2xl text-blue-600'>{
                text ? text : 'Carregando seus dados'
            }</h1>
            {
                !permi ? <LoaderCircle className='animate-spin text-blue-600' /> : ''
            }
        </div>
    );
};

export default Loading;