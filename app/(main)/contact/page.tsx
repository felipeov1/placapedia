"use client";

import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function Contact() {

    useEffect(() => {
        localStorage.removeItem('result');
        localStorage.removeItem('payment');
        localStorage.removeItem('pdf');
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <div className='w-full h-40 bg-blue-500 flex items-center justify-center'>
                <h1 className='text-3xl text-white font-bold'>Entre em contato</h1>
            </div>
            <div className='flex flex-col gap-5 md:flex-row md:gap-0 items-center justify-around px-5 mt-5'>
                <div className='text-center'>
                    <h2 className='text-3xl font-bold text-blue-500'>Email</h2>
                    <p className='text-xl font-bold mt-3'>placapedia@placapedia.com</p>
                </div>
                <div className='text-center'>
                    <h2 className='text-3xl font-bold text-blue-500'>Telefone para contao</h2>
                    <p className='text-xl font-bold mt-3'>(17) 99148-6467</p>
                </div>
                <div className='text-center'>
                    <h2 className='text-3xl font-bold text-blue-500 mb-3'>WhatsApp</h2>
                    <a href="https://api.whatsapp.com/send?phone=5517991486467&text=Ol%C3%A1,%20tudo%20bem?%20Vim%20pelo%20site%20da%20placapedia." className='text-xl font-bold text-blue-300'>(17) 99148-6467</a>
                </div>
            </div>
            <div className='px-5 mt-5 flex flex-col md:flex-row items-center justify-around'>
                <Image src="/logo.png" alt='placapedia' width={300} height={300} />
                <div className='max-w-[500px] flex flex-col gap-3 font-light pb-5'>
                    <p>Agradecemos sinceramente por utilizar nosso site de consulta de informações de veículos. Sua confiança em nossos serviços é muito importante para nós. Estamos comprometidos em fornecer dados precisos e atualizados para ajudar você a tomar decisões informadas sobre veículos.</p>
                    <p>Se você tiver qualquer dúvida ou sugestão, por favor, entre em contato conosco. Estamos sempre aqui para ajudar.</p>
                    <p>Muito obrigado!</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;