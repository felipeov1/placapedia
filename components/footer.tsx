"use client";

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import React, { useState } from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const [message, setMessage] = useState<string>(''); // Define o tipo do estado

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const phoneNumber = '5517991486467'; // Número do WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <footer className="footer-section mt-4">
            <div className="container">
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 mb-50">
                            <div className="footer-widget">

                                <div className="footer-logo">
                                    <a href="/"><Image src="/logo-placapedia-laranja.webp" alt="Logo" height={55} width={200} /></a>
                                </div>
                                <div className='text-white'>CNPJ 35635897/0001-04</div>

                                <div className="footer-text">
                                    <p>Oferecemos um serviço especializado em consulta de placas de veículos. Fornecemos relatórios completos e precisos sobre o histórico e estado dos veículos, garantindo informações confiáveis para que você tome decisões informadas. Nosso sistema é fácil de usar e acessível, com dados atualizados para uma análise detalhada.</p>
                                </div>

                            </div>
                        </div>
                        <div id="fast-acess" className="col-xl-4 col-lg-4 col-md-6 mb-30 d-flex justify-content-center">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Acesso Rápidio</h3>
                                </div>
                                <ul id='pages-ul'>
                                    <li><a href="#">Consultar</a></li>
                                    <li><a href="#">Contato</a></li>
                                    <li><a href="#">Login</a></li>
                                    <li><a href="#">Registrar</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3>Mensagem Rápida</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Digite suas dúvidas ou solicitações e entraremos em contato rapidamente.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form onSubmit={handleSendMessage}>
                                        <input
                                            type="text"
                                            placeholder="Digite sua mensagem"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}

                                        />
                                        <button><i className="bi bi-send-fill" style={{ fontSize: "20px" }}></i></button>
                                    </form>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div className="copyright-text">
                                <p>Copyright &copy; {currentYear}, Todos Direitos Reservados. {/* {*<a href="https://codepen.io/anupkumar92/">Anup</a>*} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

// Desvende os segredos por trás das placas de veículos!

// Nossa missão: ser sua fonte de verdade no mercado automotivo, te ajudando a:

// Evitar surpresas: Descubra se o veículo possui restrições, pendências ou histórico de leilão.
// Fazer um bom negócio: Tenha segurança na compra ou venda de um carro com informações completas.
// Tomar decisões conscientes: Proteja seu patrimônio e evite dores de cabeça no futuro.

export default Footer;

