import React from 'react';
import HeaderSearchPage from '@/components/headerSearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css'; 



function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeaderSearchPage />
            {children}
            {/* <Toaster /> */}
        </div>
    );
};

export default AuthLayout;