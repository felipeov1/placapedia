"use client";

import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { League_Gothic } from "next/font/google";

import { ArrowDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import Cards from './cards';
import { placaFormater } from '@/utils/formater';
import { toast } from '@/components/ui/use-toast';
// import AdsVerticalBanner from '@/components/AdsVerticalBanner';
import AdsSquareBanner from '@/components/AdsSquareBanner';

import { motion } from "framer-motion";

const gothic = League_Gothic({ subsets: ["latin"] });

function MainSection() {

    const router = useRouter();
    const { setPlaca, user } = useContext(AppContext);
    const [dataPlaca, setDataPlaca] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Regex para validar os dois formatos de placas brasileiras
        const regex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;

        if (!dataPlaca) {
            return;
        }

        if (!regex.test(dataPlaca)) {
            toast({
                title: 'Formato da placa é inválido',
                description: 'Formatos validos AAA-1234 ou AAA-1B23'
            });
            return;
        }

        const result = localStorage.getItem('result');
        setPlaca(dataPlaca);

        if (result) {
            localStorage.removeItem('result');
        };

        if (!user) {
            router.replace('/login');
        } else {
            if (!dataPlaca) {
                return;
            }
            router.replace(`/search/${dataPlaca}`);
        }
    };

    return (
        <motion.section
            id='main_section'
            className="w-full h-full flex justify-center gap-3 items-start px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            {/* <div className='hidden lg:block'>
                <AdsVerticalBanner />
            </div> */}
            <div id='first_section' className="relative w-full lg:max-w-[1440px] h-full">
                <div className="max-w-[100%] md:max-w-[50%] h-full px-5 flex flex-col items-center justify-center md:flex-none md:items-start md:justify-start">
                    <div className='w-full md:hidden'>
                        <AdsSquareBanner />
                    </div>
                    <h1 className={cn('text-4xl md:text-7xl text-blue-500', gothic.className)}>Deseja consultar um veículo pela placa?</h1>
                    <p className="max-w-[100%] md:max-w-[480px] mt-0 md:mt-3 font-light mb-4">A forma mais rápida e prática de obter informações de um veículo pela placa.</p>
                    <div
                        className="max-w-[100%] w-full h-36 bg-white border border-blue-900 rounded-md shadow-md px-5 py-2 z-50"
                    >
                        <h1 className="text-2xl text-blue-900 mb-5">Digite sua placa aqui</h1>
                        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                            <Input type="text" placeholder="Digite sua placa..." value={dataPlaca} onChange={e => setDataPlaca(placaFormater(e.target.value))} />
                            <button
                                className="w-28 p-2 cursor-pointer rounded-md text-white flex items-center gap-2 bg-blue-800 transition-transform hover:bg-blue-900 hover:scale-105 "
                                type='submit'
                            >
                                <Search />
                                Pesquisar
                            </button>
                        </form>
                    </div>
                    <div className='md:hidden flex items-center justify-center'>
                        <a href='#third_section' className='w-16 h-16 border-blue-500 border-2 rounded-full flex items-center justify-center mt-10 animate-bounce'>
                            <ArrowDown className='w-10 h-10 text-blue-500' />
                        </a>
                    </div>
                </div>
                <div className="hidden md:block w-[50%] h-[80%] h-xl:h-[70%] bg-blue-500 absolute top-0 right-0 rounded-b-md">
                    <Image className="" src="/main_car.svg" alt="car" width={600} height={600} />
                </div>
                <div className="hidden md:block w-full absolute left-0 bottom-20 h-md:bottom-10 h-xl:bottom-72">
                    <div
                        className="w-full flex items-center justify-center"
                    >
                        <Cards />
                    </div>
                </div>
            </div>
            {/* <div className='hidden lg:block'>
                <AdsVerticalBanner />
            </div> */}
        </motion.section>
    );
};

export default MainSection;