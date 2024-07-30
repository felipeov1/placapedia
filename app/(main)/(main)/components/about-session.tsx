"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const cardsData = [
    {
        id: 1,
        title: "Relátorios Detalhados",
        text: "Obtenha um relatório completo e detalhado do veículo com nosso serviço de Relatórios Detalhados. Este relatório inclui uma análise minuciosa da situação atual do veículo, abrangendo aspectos críticos como histórico de roubo ou furto, restrições legais e pendências judiciais. Através de uma visão aprofundada, você terá acesso a todas as informações necessárias para uma avaliação precisa, garantindo segurança e transparência na compra ou na manutenção do veículo. Este serviço é ideal para quem busca um entendimento completo do histórico e da situação legal do carro, oferecendo um panorama claro e confiável."
    },
    {
        id: 2,
        title: "Características",
        text: "Descubra todas as informações essenciais sobre o veículo com nosso serviço de Características Detalhadas. Este relatório oferece uma visão abrangente e precisa, incluindo o modelo e o ano de fabricação, o que é crucial para entender a idade e as possíveis atualizações do carro. Saiba a cor original e a placa registrada, facilitando a identificação e a verificação de possíveis alterações. A quilometragem atual do veículo é detalhada para avaliar o uso e o desgaste, e ainda fornecemos informações adicionais que podem impactar o valor e a condição geral, como histórico de manutenção e modificações. Esse serviço é ideal para quem busca uma compra segura e bem-informada, com transparência total sobre todos os aspectos do veículo."
    },
    {
        id: 3,
        title: "Leilões",
        text: "Nosso serviço de Leilões oferece um panorama completo sobre a participação do veículo em leilões, incluindo um histórico detalhado de sinistros. Compreenda o envolvimento do veículo em leilões passados e obtenha uma visão clara sobre quaisquer registros de sinistros associados. Esta análise é fundamental para avaliar o estado geral e a história do veículo, permitindo decisões informadas para compra ou venda. Garanta uma visão abrangente do histórico do carro e descubra informações cruciais para uma negociação segura e transparente."
    },
    {
        id: 4,
        title: "Proprietários",
        text: "Nossa análise de Proprietários fornece um relatório completo sobre o histórico de posse do veículo. Inclui informações detalhadas sobre os proprietários atuais e anteriores, permitindo que você conheça o percurso do carro ao longo dos anos. Compreenda a evolução da propriedade do veículo, identifique qualquer alteração significativa e obtenha uma visão geral sobre as condições em que o carro foi mantido. Estes dados são essenciais para garantir a transparência e confiança na compra ou venda do veículo, proporcionando uma visão clara e detalhada da sua história de propriedade."
    },
    {
        id: 5,
        title: "Atendimento personalizado",
        text: "Nosso serviço de Atendimento Personalizado oferece suporte exclusivo através de uma equipe de especialistas dedicados a esclarecer todas as suas dúvidas e auxiliar na interpretação dos resultados. Com um atendimento atencioso e individualizado, garantimos que você receba orientações precisas e compreensíveis sobre as informações do seu relatório. Nossa equipe está disponível para responder a perguntas específicas, oferecer recomendações baseadas em suas necessidades e assegurar que você compreenda completamente os dados fornecidos. Aproveite o atendimento especializado para maximizar o valor das informações recebidas e tomar decisões informadas com confiança."
    }
];

function AboutSession() {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (id) => {
        if (selectedCard === id) {
            setSelectedCard(null); // Deselect if already selected
        } else {
            setSelectedCard(id);
        }
    };

    const selectedCardData = cardsData.find(card => card.id === selectedCard);

    return (
        <div id='about_section' className="container-fluid pt-5 pb-5">
            <motion.div
                className='text-center w-100'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <h3 className='small-text-info text-muted mt-5'>SERVIÇOS PLACAPEDIA</h3>
                <h1 className='main-text-info font-weight-bold'>A Melhor Solução para Verificação de Placas</h1>
                <h1 className='main-text-info font-weight-bold'>Relatórios Completos e Precisos</h1>
                <div className="row mt-5 justify-content-center">
                    {cardsData.map(card => (
                            <div
                            key={card.id}
                                className={`col-md-12 mb-4 d-flex flex-column align-items-center card-container ${selectedCard === card.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(card.id)}
                            >
                                <h5 id='card-title-services'>{card.title}</h5>
                            </div>
                    ))}
                </div>
                {selectedCardData && (
                    <div className="container selected-card-info mt-2">
                        <div id='description-card' className="card-text">
                            <p>{selectedCardData.text}</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default AboutSession;
