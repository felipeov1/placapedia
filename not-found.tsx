import Link from 'next/link';
import React from 'react';

function NotFound() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-3xl'>404</h1>
                <h1>Página não encontrada!</h1>
                <Link className='text-blue-300 underline' href="/">Voltar</Link>
            </div>
        </div>
    );
};

export default NotFound;