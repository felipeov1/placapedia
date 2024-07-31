import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion, useAnimation, useInView } from "framer-motion";

function ThirdSection({ prices }: { prices: any }) {

    const controls = useAnimation();
    const ref = useRef(null)
    const isInView = useInView(ref)

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <section id='third_section' className="w-full mt-8 pb-4">
            <motion.div
                className='flex items-center justify-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <h1 className='text-2xl font-bold max-w-[600px] text-center'>Faça uma consulta e descubra o passado do veículo que tem interrese!</h1>
            </motion.div>
            <motion.div
                className='w-full h-[calc(100%-100px)] flex flex-col items-center justify-center gap-2 mt-5 px-10'
                variants={container}
                initial="hidden"
                animate={controls}
                ref={ref}
            >
                {/* <div className='w-72 h-[500px] border-blue-400 border rounded-xl p-5'>
                    <h2 className='text-center text-xl font-light'>Consulta <span className='font-bold'>1.0</span></h2>
                    <ul className='mt-5'>
                        <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Chassi</li>
                        <li className='flex items-center gap-2 text-lg'><X className='text-red-500' /> Renavam</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Motor</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Informações Cadastrais</li>
                        <li className='text-sm'> (Ano, Fabricante, Modelo, Cor, UF, Municipio) </li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Restrições</li>
                        <li className='flex items-center gap-2 text-lg'><X className='text-red-500' /> Débitos</li>
                        <li className='flex items-center gap-2 text-lg'><X className='text-red-500' /> Multa</li>
                        <li className='flex items-center gap-2 text-lg'><X className='text-red-500' /> Ano de Licenciamento</li>
                        <li className='flex items-center gap-2 text-lg'><X className='text-red-500' /> Recalls Pendentes</li>
                    </ul>
                    <div className='mt-5'>
                        <p className='text-center text-red-500 text-2xl line-through'>De R$ {prices?.label_api_1 || '--'} por</p>
                        <p className='text-center text-green-500 text-3xl font-bold'>R$ {prices?.api_1 || '--'}</p>
                    </div>
                    <div className='flex items-center justify-center mt-7'>
                        <Button variant="placapedia">
                            <a href="#main_section">Comprar pacote</a>
                        </Button>
                    </div>
                </div> */}
                {/* <div className='w-72 h-[500px] border-blue-400 border rounded-xl p-5'>
                    <h2 className='text-center text-xl font-light'>Consulta <span className='font-bold'>2.0</span></h2>
                    <ul className='mt-5'>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Chassi</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Renavam</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Motor</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Informações Cadastrais</li>
                        <li className='text-sm'> (Ano, Fabricante, Modelo, Cor, UF, Municipio) </li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Restrições</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Débitos</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Multa</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Ano de Licenciamento</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Recalls Pendentes</li>
                    </ul>
                    <div className='mt-5'>
                        <p className='text-center text-red-500 text-2xl line-through'>De R$ {prices?.label_api_2 || '--'} por</p>
                        <p className='text-center text-green-500 text-3xl font-bold'>R$ {prices?.api_2 || '--'}</p>
                    </div>
                    <div className='flex items-center justify-center mt-7'>
                        <Button variant="placapedia">
                            <a href="#main_section">Comprar pacote</a>
                        </Button>
                    </div>
                </div>
                <div className='w-72 h-[500px] border-blue-400 border rounded-xl p-5'>
                    <h2 className='text-center text-xl font-light'>Consulta <span className='font-bold'>Leilão</span></h2>
                    <ul className='mt-5'>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Leiloeiro</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Chassi</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Remarcação de chassi</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Patio</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Datas</li>
                        <li className='flex items-center gap-2 text-lg'><Check className='text-green-500' /> Dados do veículo</li>
                        <li className='text-sm'> (Marca, Modelo, Ano de Fabricação, Cor e Analise de Risco) </li>
                    </ul>
                    <div className='mt-28'>
                        <p className='text-center text-red-500 text-2xl line-through'>De R$ {prices?.label_api_3 || '--'} por</p>
                        <p className='text-center text-green-500 text-3xl font-bold'>R$ {prices?.api_3 || '--'}</p>
                    </div>
                    <div className='flex items-center justify-center mt-5'>
                        <Button variant="placapedia">
                            <a href="#main_section">Comprar pacote</a>
                        </Button>
                    </div>
                </div> */}
                <motion.div className='max-w-[1440px] w-full md:h-[200px] flex flex-col md:flex-row justify-between border-blue-400 border rounded-xl p-5' variants={item}>
                    <div className='h-full flex flex-col justify-center text-center'>
                        <h2 className='text-xl font-semibold'>Consultar veículo</h2>
                        <h1 className='text-3xl text-blue-500 font-bold'>R$ {prices?.api_2 || '--'}</h1>
                        <p className='text-xs font-light'>Por consultar</p>
                    </div>
                    <div className='flex justify-center flex-col gap-0 md:flex-row md:gap-3'>
                        <ul>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Chassi</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Renavam</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Motor</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='text-blue-600'>Informações Cadastrais</TooltipTrigger>
                                        <TooltipContent>
                                            <p>(Ano, Fabricante, Modelo, Cor, UF, Municipio)</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </li>
                        </ul>
                        <ul>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Restrições</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Débitos</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Multa</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Ano de Licenciamento</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Recalls Pendentes</li>
                        </ul>
                    </div>
                    <div className='flex items-center justify-center mt-5'>
                        <Button variant="placapedia" className='rounded-3xl py-8 uppercase transition-transform hover:scale-105'>
                            <a href="#main_section">Comprar pacote</a>
                        </Button>
                    </div>
                </motion.div>
                <motion.div className='max-w-[1440px] w-full md:h-[200px] flex flex-col md:flex-row justify-between border-blue-400 border rounded-xl p-5' variants={item}>
                    <div className='h-full flex flex-col justify-center text-center'>
                        <h2 className='text-xl font-semibold'>Consultar leilão</h2>
                        <h1 className='text-3xl text-blue-500 font-bold'>R$ {prices?.api_3 || '--'}</h1>
                        <p className='text-xs font-light'>Por consultar</p>
                    </div>
                    <div className='flex justify-center flex-col gap-0 md:flex-row md:gap-3'>
                        <ul className=''>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Leiloeiro</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Chassi</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Remarcação de chassi</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Patio</li>
                        </ul>
                        <ul>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' /> Datas</li>
                            <li className='flex items-center gap-2 text-base lg:text-lg'><Check className='text-green-500' />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='text-blue-600'>Dados do Veículo</TooltipTrigger>
                                        <TooltipContent>
                                            <p>(Marca, Modelo, Ano de Fabricação, Cor e Analise de Risco)</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </li>
                        </ul>
                    </div>
                    <div className='flex items-center justify-center mt-5'>
                        <Button variant="placapedia" className='rounded-3xl py-8 uppercase transition-transform hover:scale-105'>
                            <a href="#main_section">Comprar pacote</a>
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ThirdSection;