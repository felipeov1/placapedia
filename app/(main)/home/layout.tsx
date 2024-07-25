import Header from '@/components/header';
import React from 'react';

function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative w-screen h-screen overflow-x-hidden'>
            <Header />
            <div className='flex items-center justify-center'>
                <div className='mt-5 px-5 max-w-[1440px]'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;