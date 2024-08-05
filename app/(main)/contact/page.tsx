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
            <div className='title-contact-page d-flex justify-content-center mt-5'>
                <h1 className='text-center'>Tem dúvidas? Entre em contato para que possamos ajudar você.</h1>
            </div>
            <div className='px-5 mt-5 mb-5'>
                <div className='contact-grid d-flex gap-5 justify-content-center'>
                    <a href="https://wa.me/5517991486467" target="_blank" rel="noopener noreferrer" className='contact-link'>
                        <div className='contact-box text-center'>
                            <i className="icon-mode bi bi-whatsapp"></i>
                            <div className='text-title'>WhatsApp</div>
                            <div className='text'>Entre em contato pelo WhatsApp</div>
                            <i className="arrow bi bi-arrow-right"></i>
                        </div>
                    </a>
                    <a href="tel:+5517991486467" target="_blank" rel="noopener noreferrer" className='contact-link'>
                        <div className='contact-box text-center'>
                            <i className="icon-mode bi bi-phone"></i>
                            <div className='text-title'>Ligar</div>
                            <div className='text'>Ligue para nós</div>
                            <i className="arrow bi bi-arrow-right"></i>
                        </div>
                    </a>
                    <a href="mailto:placapedia@placapedia.com" target="_blank" rel="noopener noreferrer" className='contact-link'>
                        <div className='contact-box text-center'>
                            <i className="icon-mode bi bi-envelope"></i>
                            <div className='text-title'>Email</div>
                            <div className='text'>Envie um e-mail</div>
                            <i className="arrow bi bi-arrow-right"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                <div className='d-flex justify-content-center' style={{ width: '65%' }}>
                    <div className='text-center'>
                        <h2>Agradecemos a sua visita!</h2>
                        <p>Obrigado por utilizar o nosso site de consulta de informações sobre veículos. Sua confiança em nossos serviços é fundamental para nós. Estamos dedicados a fornecer dados precisos e atualizados, ajudando você a tomar decisões informadas sobre a compra, venda ou manutenção do seu veículo.</p>
                        <p>Se tiver dúvidas, sugestões ou precisar de assistência adicional, nossa equipe está à disposição para ajudar. Entre em contato conosco através de nossos canais de atendimento e receberá suporte personalizado e eficiente.</p>
                        <p><strong>Muito obrigado por escolher nossos serviços!</strong></p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Contact;
