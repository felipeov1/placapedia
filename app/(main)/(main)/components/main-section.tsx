import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { League_Gothic } from "next/font/google";
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import { placaFormater } from '@/utils/formater';
import AdsSquareBanner from '@/components/AdsSquareBanner';
import { motion } from "framer-motion";

const gothic = League_Gothic({ subsets: ["latin"] });

function MainSection() {
    const router = useRouter();
    const { setPlaca, user } = useContext(AppContext);
    const [dataPlaca, setDataPlaca] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const regex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;

        if (!dataPlaca) {
            setAlertMessage('Por favor preencha o campo!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        if (!regex.test(dataPlaca)) {
            setAlertMessage('Formato da placa é inválido. Formatos válidos: AAA-1234 ou AAA-1B23');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        const result = typeof window !== 'undefined' ? localStorage.getItem('result') : null;

        if (result) {
            localStorage.removeItem('result');
        }

        if (!user) {
            router.replace('/login');
        } else {
            router.replace(`/search/${dataPlaca}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    return (
        <>
            {showAlert && (
                <div className="alert alert-danger position-fixed bottom-0 end-0 m-3" role="alert">
                    {alertMessage}
                </div>
            )}
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
                        {/* <!-- Texto para telas maiores que 767px --> */}
                        <div className="d-none d-md-block">
                            <h1 id='first_section_title' className="mb-2">Antes de comprar, tenha certeza de que o veículo não tem um passado como este!</h1>
                            <p id='first_section_subtitle'>Nunca Compre Um Veículo Sem Conhecer Seu Histórico Primeiro</p>
                            <p id='first_section_paragraph'>Digite a placa e consulte o histórico completo do veículo para evitar surpresas desagradáveis. Identifique acidentes, roubos e outros problemas ocultos, garantindo uma compra segura e informada.</p>
                        </div>

                        {/* <!-- Texto para telas menores que 767px --> */}
                        <div className="d-block d-md-none">
                            <h1 id='first_section_title' className="mb-2">Descubra o Verdadeiro Passado do Veículo: Verifique o Histórico e Faça uma Compra Inteligente!</h1>
                            <p id='first_section_subtitle_small'>Não compre sem saber o passado do carro</p>
                            <p id='first_section_paragraph_small'>Digite a placa para verificar o histórico do veículo e evitar problemas. Conheça acidentes, roubos e outros detalhes importantes para garantir uma compra segura.</p>
                        </div>
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
                        src='/banner-car-crashed.webp'
                        alt='Carro com informações'
                        width={600}
                        height={600}
                        className='car-image'
                    />
                </div>
            </motion.section>
        </>
    );
}

export default MainSection;
