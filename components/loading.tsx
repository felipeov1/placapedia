// components/Loading.tsx
import { LoaderCircle } from 'lucide-react';
import React from 'react';

function Loading({ text }: { text?: string }) {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-white'>
            <div className='flex flex-col items-center'>
                <LoaderCircle className='animate-spin text-blue-600' size={48} />
                <h1 className='text-2xl text-blue-600 mt-4'>
                    {text || 'Carregando...'}
                </h1>
            </div>
        </div>
    );
}

export default Loading;