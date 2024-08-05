import type { Metadata } from "next";
import React from 'react';
import HeaderSearchPage from '@/components/headerSearchPage';
import Footer from '@/components/footer';

export const metadata: Metadata = {
    title: "Placapedia - Entre em contato com nossa equipe",
    description: "A Solução Completa para Consulta Veicular! Obtenha informações detalhadas sobre chassi, Renavam, multas, histórico de furtos e muito mais, tudo com apenas a placa do veículo.",
};

function LayoutContact({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeaderSearchPage />
            <div className='w-full h-screen'>
                {children}
            </div>
            <div className='hidden md:block'>
                <Footer />
            </div>
        </div>
    );
};

export default LayoutContact;