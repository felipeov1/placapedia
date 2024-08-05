import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import Image from 'next/image';

function ThirdSection({ prices }: { prices: any }) {
    return (
        <section id='third_section' className="container mt-5 mb-5">
            <motion.div
                className='text-center mb-5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
            >
                <h2 className='display-7 font-weight-600'>Faça uma consulta e descubra o passado completo do veículo!</h2>
            </motion.div>

            <div className='row justify-content-center'>
                {/* Tabela da esquerda */}
                <div className='col-md-4 mb-4'>
                    <div className='card-table-price card mx-auto p-3' style={{ maxWidth: '1000px' }}>
                        <div className='card-body text-center'>
                            <h2 className='card-title' style={{ textTransform: 'uppercase' }}>Consultar Veículo
                            </h2>
                            <p>Confira informações detalhadas sobre o carro, incluindo multas, restrições e dados cadastrais.</p>
                            <h2 className='text-price'>R$ {prices?.api_2 || '--'}</h2>
                            <p className='per-consult'>POR CONSULTA</p>
                            <ul className='list-unstyled mt-4'>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Renavam
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Motor
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Informações Cadastrais
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Restrições
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Débitos
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Multa
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Ano de Licenciamento
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Recalls Pendentes
                                </li>
                            </ul>
                        </div>
                        <a href="" className='text-center mb-2'>Ver exemplo de conuslta</a>
                        <div className='text-center'>
                            <Button variant="placapedia" id='btn-buy-plan'>
                                <a href="#main_section" className='text-decoration-none'>Adquirir Agora</a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabela da direita */}
                <div className='col-md-4 mb-4'>
                    <div className='card-table-price card mx-auto p-3' style={{ maxWidth: '1000px', height: '100%' }}>
                        <div className='card-body text-center'>
                            <h2 className='card-title' style={{ textTransform: 'uppercase' }}>Consultar leilão
                            </h2>
                            <p>Veja o histórico de leilões do veículo, incluindo datas e detalhes sobre avarias e condições.</p>
                            <h2 className='text-price' style={{ marginTop: "40px" }}>R$ {prices?.api_3 || '--'}</h2>
                            <p className='per-consult'>POR CONSULTA</p>
                            <ul className='list-unstyled mb-5 mt-5'>

                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Leiloeiro
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Remarcação de chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Pátio
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Datas
                                </li>
                                <li className='d-flex align-items-center justify-content-center mb-2'>
                                    <Check className='text-success me-2' /> Dados do Veículo
                                </li>

                            </ul>
                        </div>
                        <a href=""  className='text-center mb-2'>Ver exemplo de conuslta</a>
                        <div className='text-center'>
                            <Button variant="placapedia" id='btn-buy-plan'>
                                <a href="#main_section" className='text-decoration-none'>Adquirir Agora</a>
                            </Button>
                        </div>
                    </div>
                </div>
                <p className='talk-with-us-plan d-flex justify-content-center'>Ficou com dúvida?&nbsp;<a href="https://api.whatsapp.com/send?phone=5517991486467&text=Ol%C3%A1,%20tudo%20bem?%20Vim%20pelo%20site%20da%20placapedia%20e%20preciso%20de%20ajuda." target="_blank">Fale com a gente</a></p>
                <div className='d-flex justify-content-center gap-3'>
                    <Image src="/visa-logo.svg" alt="cartão visa" width={80} height={80} />
                    <Image src="/mastercard-logo.svg" alt="cartão mastercard" width={80} height={80} />
                    <Image src="/amex-logo.svg" alt="cartão american express" width={80} height={80} />
                    <Image src="/pix-logo.svg" alt="pix" width={90} height={80} />
                </div>
                <p className='talk-with-us-plan d-flex justify-content-center'>Para visualizar todas formas de pagamento acesse o carrinho de compras</p>

            </div>
            {/* Linha horizontal e avaliações */}
            <div className='container mt-5'>
                {/* Linha horizontal */}
                <div className='d-flex justify-content-center'>
                    <hr style={{ width: '80%', borderTop: '2px solid #ccc' }} />
                </div>

                {/* Avaliações */}
                <div className='reviews-card d-flex flex-row justify-content-between align-items-start mt-4'>
                    {[{
                        comment: '"Ótimo serviço! Relatórios rápidos e precisos, ajudaram muito na compra do meu carro."',
                        person: '— Carlos M.'
                    }, {
                        comment: '"A Placapedia oferece uma consulta de placas eficiente e confiável. Recomendo!"',
                        person: '— Ana S.'
                    }, {
                        comment: '"Fiz uma consulta de placa antes de comprar um carro e o histórico negativo me fez mudar de ideia. Excelente serviço!"',
                        person: '— João R.'

                    }].map((review, index) => (
                        <div className='d-flex flex-column align-items-center text-center mx-3' key={index}>
                            <div className='d-flex mb-2'>
                                {[...Array(5)].map((_, starIndex) => (
                                    <svg
                                        key={starIndex}
                                        className='bi bi-star-fill'
                                        width='24'
                                        height='24'
                                        fill='currentColor'
                                        viewBox='0 0 16 16'
                                        color='yellow'
                                    >
                                        <path d='M3.612 15.443a.5.5 0 0 1-.735-.545L4.03 11.3.896 8.675a.5.5 0 0 1 .295-.845l3.63-.527 1.629-3.293a.5.5 0 0 1 .894.046l1.503 3.283 3.932.573a.5.5 0 0 1 .277.853l-2.846 2.71.673 3.65a.5.5 0 0 1-.724.528L8 13.187l-3.8 1.995a.5.5 0 0 1-.588-.68z' />
                                    </svg>
                                ))}
                            </div>
                            <p>{review.comment}</p>
                            <p>{review.person}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

export default ThirdSection;

