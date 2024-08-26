
"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/loading';
import { toast } from '@/components/ui/use-toast';
import { addHistoric, getAuthToken, IHistoric } from '@/firebase/services';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../search-page.css';


function Api2Informations({ placa }: { placa: string }) {
    const initialized = useRef(false);
    // const [data, setData] = useState<any>({});
    const [data, setData] = useState<any>(null); // Inicialize como null

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const historic = async ({ objHis }: { objHis: IHistoric }) => {
        const userId = localStorage.getItem('user');
        if (!userId) {
            throw new Error('User ID not found in local storage');
        }
        await addHistoric(userId, objHis);
    };

    const getAllInformations = useCallback(async () => {
        const wasSaved = localStorage.getItem('pdf');
        try {
            const res = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!,
                tipo: "estadual",
                placa: placa
            });

            console.log('Dados recebidos da API:', res.data.dados); // Adiciona o log dos dados recebidos

            setData(res.data.dados);
            if (!wasSaved) {
                const pdfCreator = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pdf-generator`, {
                    placa: placa,
                    api: "2",
                    data: res.data.dados
                });
                if (!pdfCreator.data.url) {
                    setAlertMessage('Erro ao salvar PDF: Não podemos salvar o PDF no seu histórico!');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                }
                const objHistoric = { wasPay: true, placa: placa, date: new Date(), pdf: `${pdfCreator.data.url!}` };
                await historic({ objHis: objHistoric });
                localStorage.setItem('pdf', 'true');
            }
        } catch (error) {
            setAlertMessage('Houve um erro ao consultar dados: Se houver perdas, por favor entre em contato para o reembolso.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }, [placa]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            getAllInformations();
        }
    // }, [placa, getAllInformations]);
    }, [ getAllInformations]);

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
            <div className='title-search-result d-flex mb-3'>
                <h6 className='fw-semibold  mt-2 mb-2'>DADOS DA CONSULTA BASE ESTADUAL</h6>
            </div>

            <div className='accordion' id='accordionExample'>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingOne'>
                        <button
                            className='accordion-button'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseOne'
                            aria-expanded='true'
                            aria-controls='collapseOne'
                        >
                            Comunicação de venda
                        </button>
                    </h2>
                    <div
                        id='collapseOne'
                        className='accordion-collapse collapse show'
                        aria-labelledby='headingOne'
                    >
                        <div className='accordion-body mt-3 mb-3'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table '>Data inclusão:</h4>
                                        <p className=' data-table'>{data.datavenda}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Doc. do comprador:</h4>
                                        <p className=' data-table'>{data.cpfcnpjcomprador}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Data da venda:</h4>
                                        <p className=' data-table'>{data.datavenda}</p>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Comunicação de venda:</h4>
                                        <p className=' data-table'>{data.ccomunicacaovenda}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingTwo'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseTwo'
                            aria-expanded='false'
                            aria-controls='collapseTwo'
                        >
                            Dados do Veículo
                        </button>
                    </h2>
                    <div
                        id='collapseTwo'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingTwo'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Placa:</h4>
                                        <p className=' data-table'>{data.placa}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Chassi:</h4>
                                        <p className=' data-table'>{data.chassi}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Renavam:</h4>
                                        <p className=' data-table'>{data.renavam}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Restrição 1:</h4>
                                        <p className=' data-table'>{data.outras_restricoes_01}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Restrição 2:</h4>
                                        <p className=' data-table'>{data.outras_restricoes_02}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Restrição 3:</h4>
                                        <p className=' data-table'>{data.outras_restricoes_03}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Municipio:</h4>
                                        <p className=' data-table'>{data.municipio}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>UF:</h4>
                                        <p className=' data-table'>{data.uf}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Marca:</h4>
                                        <p className=' data-table'>{data.marca}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Modelo:</h4>
                                        <p className=' data-table'>{data.modelo}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Modelo Fab:</h4>
                                        <p className=' data-table'>{data.marcamodelocompleto}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Tipo:</h4>
                                        <p className=' data-table'>{data.tipo}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Carroceria:</h4>
                                        <p className=' data-table'>{data.carroceria}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Cor:</h4>
                                        <p className=' data-table'>{data.cor}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Categoria:</h4>
                                        <p className=' data-table'>{data.veicategoria}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Combustível:</h4>
                                        <p className=' data-table'>{data.combustivel}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Potência (CV):</h4>
                                        <p className=' data-table'>{data.potencia}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Capacidade de carga:</h4>
                                        <p className=' data-table'>{data.capacidadecarga}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Nome do Proprietário:</h4>
                                        <p className=' data-table'>{data.pronome}</p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='data-item'>
                                        <h4 className='  title-data-table'>Proprietário Anterior:</h4>
                                        <p className=' data-table'>{data.pronomeanterior}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingThree'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseThree'
                            aria-expanded='false'
                            aria-controls='collapseThree'
                        >
                            Restrições
                        </button>
                    </h2>
                    <div
                        id='collapseThree'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingThree'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Furto:</h4>
                                        <p className=' data-table'>{data.resfurto}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Guincho:</h4>
                                        <p className=' data-table'>{data.resguincho}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Administrativo:</h4>
                                        <p className=' data-table'>{data.resadministrativa}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Judicial:</h4>
                                        <p className=' data-table'>{data.resjudicial}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingFour'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseFour'
                            aria-expanded='false'
                            aria-controls='collapseFour'
                        >
                            Licenciamento
                        </button>
                    </h2>
                    <div
                        id='collapseFour'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingFour'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Ultimo Licenciamento:</h4>
                                        <p className=' data-table'>{data.licdata}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Licenciamento em Aberto:</h4>
                                        <p className=' data-table'>{data.existedebitodelicenciamento}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingFive'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseFive'
                            aria-expanded='false'
                            aria-controls='collapseFive'
                        >
                            Gravame
                        </button>
                    </h2>
                    <div
                        id='collapseFive'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingFive'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Financiamento:</h4>
                                        <p className=' data-table'>{data.restricaofinan}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Financeira:</h4>
                                        <p className=' data-table'>{data.restricaonomeagente}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Arrendatario:</h4>
                                        <p className=' data-table'>{data.restricaoarrendatario}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Data de inclusão:</h4>
                                        <p className=' data-table'>{data.restricaodatainclusao}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingSix'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseSix'
                            aria-expanded='false'
                            aria-controls='collapseSix'
                        >
                            Débitos do veículo
                        </button>
                    </h2>
                    <div
                        id='collapseSix'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingSix'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb dersa:</h4>
                                        <p className=' data-table'>R$ {data.debdersa || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb detran:</h4>
                                        <p className=' data-table'>R$ {data.debdetran || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb cetesb:</h4>
                                        <p className=' data-table'>R$ {data.debcetesb || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb PRF:</h4>
                                        <p className=' data-table'>R$ {data.debpolrodfed || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb Municipais:</h4>
                                        <p className=' data-table'>R$ {data.debmunicipais || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>Deb renainf:</h4>
                                        <p className=' data-table'>R$ {data.debrenainf || '0,00'}</p>
                                    </div>
                                </div>
                                <div className='data-item'>
                                    <h4 className='   title-data-table'>Deb Der:</h4>
                                    <p className=' data-table'>R$ {data.debder || '0,00'}</p>
                                </div>
                            </div>
                            <div className='data-item'>
                                <h4 className='   title-data-table'>Valor total de Multas:</h4>
                                <p className=' data-table'>R$ {data.valortotaldebitomulta || '0,00'}</p>
                            </div>
                            <div className='data-item'>
                                <h4 className='   title-data-table'>Valor total de IPVA:</h4>
                                <p className=' data-table'>R$ {data.debipva || '0,00'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingSeven'>
                        <button
                            className='accordion-button collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#collapseSeven'
                            aria-expanded='false'
                            aria-controls='collapseSeven'
                        >
                            Dados de Faturamento do veículo
                        </button>
                    </h2>
                    <div
                        id='collapseSeven'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingSeven'
                    >
                        <div className='accordion-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>CNPJ/CPF do Faturado:</h4>
                                        <p className=' data-table'>{data.cpfcnpjfaturado}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='data-item'>
                                        <h4 className='   title-data-table'>UF Faturado:</h4>
                                        <p className=' data-table'>{data.uffaturado}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Api2Informations;


// return (
//     <div className='container containerData2 mt-4 mb-5'>
//         <div className='title-search-result  d-flex mb-3 '>
//             <h6 className='fw-semibold  m-2'>TIPO DE CONSULTA:</h6>
//             <h6 className='fw-semibold  mt-2 mb-2'>BASE ESTADUAL</h6>
//         </div>

//         <div className='accordion' id='accordionExample'>
//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingOne'>
//                     <button
//                         className='accordion-button'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseOne'
//                         aria-expanded='true'
//                         aria-controls='collapseOne'
//                     >
//                         Comunicação de venda
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseOne'
//                     className='accordion-collapse collapse show'
//                     aria-labelledby='headingOne'
//                 >
//                     <div className='accordion-body'>
//                         <VendaInformations data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingTwo'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseTwo'
//                         aria-expanded='false'
//                         aria-controls='collapseTwo'
//                     >
//                         Dados do Veículo
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseTwo'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingTwo'
//                 >
//                     <div className='accordion-body'>
//                         <CarInformationsSlide data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingThree'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseThree'
//                         aria-expanded='false'
//                         aria-controls='collapseThree'
//                     >
//                         Restrições
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseThree'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingThree'
//                 >
//                     <div className='accordion-body'>
//                         <RestricoesInformations data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingFour'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseFour'
//                         aria-expanded='false'
//                         aria-controls='collapseFour'
//                     >
//                         Licenciamento
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseFour'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingFour'
//                 >
//                     <div className='accordion-body'>
//                         <LicenciamentoInformations data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingFive'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseFive'
//                         aria-expanded='false'
//                         aria-controls='collapseFive'
//                     >
//                         Gravame
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseFive'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingFive'
//                 >
//                     <div className='accordion-body'>
//                         <GravameInformations data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingSix'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseSix'
//                         aria-expanded='false'
//                         aria-controls='collapseSix'
//                     >
//                         Débitos do veículo
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseSix'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingSix'
//                 >
//                     <div className='accordion-body'>
//                         <DebVeiculoInformations data={data} />
//                     </div>
//                 </div>
//             </div>

//             <div className='accordion-item'>
//                 <h2 className='accordion-header' id='headingSeven'>
//                     <button
//                         className='accordion-button collapsed'
//                         type='button'
//                         data-bs-toggle='collapse'
//                         data-bs-target='#collapseSeven'
//                         aria-expanded='false'
//                         aria-controls='collapseSeven'
//                     >
//                         Dados de Faturamento do veículo
//                     </button>
//                 </h2>
//                 <div
//                     id='collapseSeven'
//                     className='accordion-collapse collapse'
//                     aria-labelledby='headingSeven'
//                 >
//                     <div className='accordion-body'>
//                         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//                             <div className='row row-cols-1 row-cols-md-3 mt-3 mb-3'>
//                                 <div className='col mb-2'>
//                                     <h3 className='h6 '>CNPJ/CPF do Faturado:</h3>
//                                     {/* <p>{data.cpfcnpjfaturado}</p> */}
//                                 </div>
//                                 <div className='col mb-2'>
//                                     <h3 className='h6 '>UF Faturado:</h3>
//                                     {/* <p>{data.uffaturado}</p> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     </div>
// );