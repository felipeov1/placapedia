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
                description: 'Formatos válidos: AAA-1234 ou AAA-1B23'
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
            className="container-fluid p-5 d-flex justify-content-around align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            {/* Adicionar o Banner de Anúncios Lateral (opcional) */}
            {/* <div className='d-none d-lg-block'>
                <AdsVerticalBanner />
            </div> */}

            <div id='first_section' className="w-100 d-flex flex-column align-items-start justify-content-center p-4">
                <div className="d-none d-md-block">
                    <AdsSquareBanner />
                </div>
                <div className="mb-4">
                    <h1 id='first_section_title' className="mb-3">Deseja consultar um veículo pela placa?</h1>
                    <p id='first_section_paragraph'>A forma mais rápida e prática de obter informações de um veículo pela placa.</p>
                </div>
                <div id='first_section_search' className="w-100">
                    <h2 id='title_input_search' className="mb-3">Digite sua placa aqui</h2>
                    <form id='input_search' onSubmit={handleSubmit} className="d-flex flex-column">
                        <Input
                            type="text"
                            placeholder="Digite sua placa..."
                            value={dataPlaca}
                            onChange={e => setDataPlaca(placaFormater(e.target.value))}
                            className="mb-3"
                        />
                        <button
                            id='btn_search'
                            type='submit'
                            className="btn btn-primary d-flex align-items-center"
                        >
                            <Search className="me-2" />
                            Pesquisar
                        </button>
                    </form>
                </div>
            </div>

            <div id='img_car' className="d-none d-md-block position-relative">
                <Image className="position-absolute top-50 end-0 translate-middle-y" src="/Car-with-damaged-half-and-repair.png" alt="car" width={600} height={600} />
            </div>

            {/* Adicionar o Banner de Anúncios Lateral (opcional) */}
            {/* <div className='d-none d-lg-block'>
                <AdsVerticalBanner />
            </div> */}
        </motion.section>
    );
};

export default MainSection;
