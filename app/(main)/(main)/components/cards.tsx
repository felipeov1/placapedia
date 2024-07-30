import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';


function ImagesSection() {
    return (
        <section id="images-section-cards" className="mt-1 mb-3">
            <p id='how-card-section' className="text-center mb-2">COMO CONSULTAR O HISTÓRICO DO VEÍCULO EM APENAS 4 PASSOS</p>
            <h2 className="main-text-cards text-center mb-4">Tenha o Histórico do Veículo e Evite Problemas Futuros</h2>
            <div className="cards-container d-flex justify-content-center">
                <div id='card-container' className="col-md-3 mb-4 d-flex flex-column align-items-center">
                    <div className="circle-number mb-2">
                        <span>01</span>
                    </div>
                    <div className="image-description">
                        <p><strong>Cadastre-se</strong></p>
                        <p>Crie sua conta agora mesmo para ter acesso exclusivo ao histórico completo do veículo.</p>
                    </div>
                </div>
                <div id='card-container' className="col-md-3 mb-4 d-flex flex-column align-items-center">
                    <div className="circle-number mb-2">
                        <span>02</span>
                    </div>
                    <div className="image-description">
                        <p><strong>Faça uma Pesquisa Gratuita</strong></p>
                        <p>Realize uma consulta inicial de forma <strong>totalmente gratuita</strong>. Digite a placa do veículo e <strong>descubra</strong>  informações em segundos.</p>
                    </div>
                </div>
                <div id='card-container' className="col-md-3 mb-4 d-flex flex-column align-items-center">
                    <div className="circle-number mb-2">
                        <span>03</span>
                    </div>
                    <div className="image-description">
                        <p><strong>Invista na Consulta Detalhada</strong></p>
                        <p>Escolha o plano ideal e faça o pagamento de forma segura. <strong>Invista</strong> em uma <strong>análise detalhada</strong> e obtenha informações exclusivas e sem estresse no futuro. </p>
                    </div>
                </div>
                <div id='card-container' className="col-md-3 mb-4 d-flex flex-column align-items-center">
                    <div className="circle-number mb-2">
                        <span>04</span>
                    </div>
                    <div className="image-description">
                        <p><strong>Receba uma Análise Completa</strong></p>
                        <p>Receba uma análise detalhada do veículo e <strong>evite dores de cabeça</strong> no futuro. Tenha todas as informações necessárias para <strong>decisões seguras</strong> e sem surpresas.</p>
                    </div>
                </div>
            </div>
            <div className='btn-cta-cards d-flex justify-content-center mt-2'>
                <Link href="/register" id='btn-cta-card'>Consultar Agora</Link>
            </div>
        </section>
    );
}

export default ImagesSection;
