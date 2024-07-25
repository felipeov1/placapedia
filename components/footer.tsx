import Link from 'next/link';
import React from 'react';

function Footer() {
    return (
        <div className='w-full h-80 mt-10 bg-blue-500 flex items-center justify-around text-white'>
            <div className='text-lg font-light max-w-[500px] flex flex-col gap-3'>
                <p className='text-sm'>Desvende os segredos por trás das placas de veículos!</p>
                <p className='text-sm'>Nossa missão é ser sua fonte de confiança no mercado automotivo, ajudando você a evitar surpresas ao descobrir se o veículo possui restrições, pendências ou histórico de leilão.</p>
                <p className='text-sm'>Garantimos que você faça um bom negócio, proporcionando segurança na compra ou venda de um carro com informações completas. Assim, você pode tomar decisões conscientes, proteger seu patrimônio e evitar dores de cabeça no futuro.</p>
            </div>
            <div className='flex gap-10 items-start'>
                <div>
                    <h2 className='font-semibold text-xl'>Site</h2>
                    <ul className='flex flex-col gap-3 mt-3'>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contato</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className='font-semibold text-xl'>Planos</h2>
                    <ul className='flex flex-col gap-3 mt-3'>
                        <li>
                            <Link href='/'>Consultar Veículo</Link>
                        </li>
                        <li>
                            <Link href='/'>Consultar Leilão</Link>
                        </li>
                        <li className='text-xs text-blue-300'>
                            <p>by <a className='transition-transform hover:underline' href="https://miqueiasbelfort.netlify.app/">Miqueias Belfort</a></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Desvende os segredos por trás das placas de veículos!

// Nossa missão: ser sua fonte de verdade no mercado automotivo, te ajudando a:

// Evitar surpresas: Descubra se o veículo possui restrições, pendências ou histórico de leilão.
// Fazer um bom negócio: Tenha segurança na compra ou venda de um carro com informações completas.
// Tomar decisões conscientes: Proteja seu patrimônio e evite dores de cabeça no futuro.

export default Footer;