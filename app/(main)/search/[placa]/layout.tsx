import HeaderSearchPage from '@/components/headerSearchPage';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

function LayoutPlaca({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative w-screen h-screen overflow-x-hidden'>
            <HeaderSearchPage />
            {children}
            {/* <Toaster /> */}
        </div>
    );
};

export default LayoutPlaca;