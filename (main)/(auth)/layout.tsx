import React from 'react';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            <Toaster />
        </div>
    );
};

export default AuthLayout;