import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../globals.css'; 

function LayoutMainPage({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-screen'>
            <Header />
            {children}
            <div className='hidden md:block'>
                <Footer />
            </div>
            <Toaster />
        </div>
    );
};

export default LayoutMainPage;