import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { League_Gothic } from "next/font/google";
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import { placaFormater } from '@/utils/formater';
import { toast } from '@/components/ui/use-toast';
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
            console.log('Data Placa is empty');
            return;
        }
    
        if (!regex.test(dataPlaca)) {
            toast({
                title: 'Formato da placa é inválido',
                description: 'Formatos válidos: AAA-1234 ou AAA-1B23'
            });
            return;
        }
    
        // Verifica se está no ambiente de cliente
        const result = typeof window !== 'undefined' ? localStorage.getItem('result') : null;
    
        if (result) {
            localStorage.removeItem('result');
        }
    
        if (!user) {
            router.replace('/login');
        } else {
            console.log('Navigating to /search/' + dataPlaca);
            router.replace(`/search/${dataPlaca}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent); // Dispara a função de submit
        }
    };

    return (
        <motion.section
            id='main_section'
            className="container-fluid d-flex justify-content-around align-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <div id='first_section' className="w-100 d-flex flex-column align-items-start justify-content-center p-4">
                <div className="d-none d-md-block">
                    <AdsSquareBanner />
                </div>
                <div className="mb-4">
                    <h1 id='first_section_title' className="mb-2">Antes de comprar, tenha certeza de que o veículo não tem um passado como este!</h1>
                    {/* <h3>Evite surpresas e conheça o histórico completo do veículo!</h3> */}
                    <p id='first_section_subtitle'>Nuca Compre Um Veículo Sem Conehcer Seu Histórico Primeiro</p>
                    <p id='first_section_paragraph'>Digite a placa e consulte o histórico completo do veículo para evitar surpresas desagradáveis. Identifique acidentes, roubos e outros problemas ocultos, garantindo uma compra segura e informada.</p>
                </div>
                <div id='first_section_search' className="w-100">
                    <form id="input_search" onSubmit={handleSubmit} className="input-box">
                        <i className="uil uil-search" onClick={handleSubmit}></i>
                        <Input
                            type="text"
                            placeholder="Digite a placa do veículo"
                            value={dataPlaca}
                            onChange={e => setDataPlaca(placaFormater(e.target.value))}
                            className="mb-3"
                            onKeyDown={handleKeyDown}
                        />
                        <button id="btn_search" type="submit" className="button">
                            Pesquisar
                        </button>
                    </form>
                </div>
            </div>

            <div id='img_car' className='d-none d-md-block position-relative'>
                <Image
                    src='/banner-car-crashed.png'
                    alt='Carro com informações'
                    width={600}
                    height={600}
                    className='car-image'
                />
            </div>
        </motion.section>
    );
};

export default MainSection;
