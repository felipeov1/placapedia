'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CarInformationsSlide from './placa-informations';
import LeilaoInformationsAccordion from './leilao-informations';
import Loading from '@/components/loading';
import { toast } from '@/components/ui/use-toast';
import { addHistoric, IHistoric } from '@/firebase/services';
import data from '../../../../../../fake'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../search-page.css';

function LeilaoInformations({ placa }: { placa: string }) {
    const initialized = useRef(false)
    const [data, setData] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const historic = async ({ objHis }: { objHis: IHistoric }) => {
        const userId = localStorage.getItem('user');
        const resultSting = localStorage.getItem('result');
        const paymentString = localStorage.getItem('payment');

        if (!userId) {
            throw new Error('User ID not found in local storage');
        }

        if (resultSting || paymentString) {
            await addHistoric(userId, objHis);
        }
    };

    const getAllInformations = useCallback(async () => {
        const wasSaved = localStorage.getItem('pdf');
        try {
            const res = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!,
                tipo: "leilao",
                placa: placa
            });
            setData(res.data.dados);
            if (!wasSaved) {
                const pdfCreator = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pdf-generator`, {
                    placa: placa,
                    api: "leilao",
                    data: res.data.dados
                });
                if (!pdfCreator.data.url) {
                    setAlertMessage('Erro ao salvar PDF. Não podemos salvar o PDF no seu histórico!');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                } else {
                    const objHistoric = { wasPay: true, placa: placa, date: new Date(), pdf: `${pdfCreator.data.url!}` };
                    await historic({ objHis: objHistoric });
                    localStorage.setItem('pdf', 'true');
                }
            }
        } catch (error) {
            setAlertMessage('Houve um erro ao consultar dados. Se houver perdas, por favor entre em contato para o reembolso.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }, [placa]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            getAllInformations();
        }
    }, [placa, getAllInformations]);

    useEffect(() => {
        const accordions = document.querySelectorAll('.accordion-button');
        accordions.forEach(button => {
            const handleClick = () => {
                const targetId = button.getAttribute('data-bs-target');
                if (targetId) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        if (targetElement.classList.contains('show')) {
                            targetElement.classList.remove('show');
                            targetElement.classList.add('collapse');
                        } else {
                            targetElement.classList.remove('collapse');
                            targetElement.classList.add('show');
                        }
                    }
                }
            };

            button.addEventListener('click', handleClick);

            return () => {
                button.removeEventListener('click', handleClick);
            };
        });
    }, []);

    if (!data) {
        return (
            <Loading />
        );
    };

    return (
        <div className='container containerData2 mt-4 mb-5'>
            {showAlert && (
                <div className="alert alert-danger position-fixed bottom-0 end-0 m-3" role="alert">
                    {alertMessage}
                </div>
            )}
            <div className='title-search-result d-flex mb-3' >
                <h6 className='fw-semibold  mt-2 mb-2'>DADOS DA CONSULTA LEILÃO</h6>
            </div>

            <div className='accordion' id='accordionExample2'>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingLeilaoTwo'>
                        <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseLeilaoOne'
                            aria-expanded='true'
                            aria-controls='collapseLeilaoOne'
                        >
                            Dados do Veículo
                        </button>
                    </h2>
                    <div
                        id='collapseLeilaoOne'
                        className='accordion-collapse collapse show'
                        aria-labelledby='headingLeilaoOne'
                    >
                        <div className='accordion-body mt-3 mb-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table '>Placa:</h4>
                                        {/* <p className=' data-table'>44343</p> */}
                                        <p className=' data-table'>{data.dados_veiculo.placa}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Chassi:</h4>
                                        {/* <p className=' data-table'>55544</p> */}
                                        <p className=' data-table'>{data.dados_veiculo.chassi}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Ano de Fabricação:</h4>
                                        {/* <p className=' data-table'>2005</p> */}
                                        <p className=' data-table'>{data.dados_veiculo.anofabricacaomodelo}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Cor:</h4>
                                        {/* <p className=' data-table'>vermelho</p> */}
                                        <p className=' data-table'>{data.dados_veiculo.cor}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Modelo/Marca:</h4>
                                        {/* <p className=' data-table'>honda</p> */}
                                        <p className=' data-table'>{data.dados_veiculo.marcamodelo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingLeilaoThree'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseLeilaoThree'
                            aria-expanded='false'
                            aria-controls='collapseLeilaoThree'
                        >
                            Dados do Leilão
                        </button>
                    </h2>
                    <div
                        id='collapseLeilaoThree'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingLeilaoThree'
                    >
                        <div className='accordion-body'>
                            {data.leilao.registro.map((car: any, i: number) => (
                                <div key={i} className='mb-4'>
                                    <h2>Leilão: {i + 1}</h2>

                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Leiloeiro:</h4>
                                                {/* <p className=' data-table'>leiloeiro</p> */}
                                                <p className=' data-table'>{car.leiloeiro}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Lote:</h4>
                                                {/* <p className=' data-table'>55544</p> */}
                                                <p className=' data-table'>{car.lote}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Data do Leilão:</h4>
                                                {/* <p className=' data-table'>18/01/2005</p> */}
                                                <p className=' data-table'>{car.dataleilao}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Situação do chassi:</h4>
                                                {/* <p className=' data-table'>334345</p> */}
                                                <p className=' data-table'>{car.situacaogeraldochassi}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Código geral do veículo:</h4>
                                                {/* <p className=' data-table'>444233232</p> */}
                                                <p className=' data-table'>{car.condicaogeraldoveiculo}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Comitente:</h4>
                                                {/* <p className=' data-table'>eeeee</p> */}
                                                <p className=' data-table'>{car.comitente}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Patio:</h4>
                                                {/* <p className=' data-table'>eeew</p> */}
                                                <p className=' data-table'>{car.patio}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Marca/Modelo:</h4>
                                                {/* <p className=' data-table'>ecedss</p> */}
                                                <p className=' data-table'>{car.marcamodelo}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='data-item'>
                                                <h4 className='  title-data-table'>Condição do veículo:</h4>
                                                {/* <p className=' data-table'>ededed</p> */}
                                                <p className=' data-table'>{car.condicaogeraldoveiculo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeilaoInformations;