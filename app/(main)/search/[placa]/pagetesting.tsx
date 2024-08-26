"use client";

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';
import { AppContext } from '@/context/context';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { getAuthToken } from '@/firebase/services';
import { paymentName } from '@/utils/data';
import { fakeAPICalled_1, fakeAPICalled_2, fakeAPICalled_LEILAO } from '../../../../fake';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CarInformations: React.FC = () => {
    const { user } = useContext(AppContext);
    const params = useParams<{ placa: string }>();

    const [isHovered, setIsHovered] = useState(false);
    const [modalTitle, setModalTitle] = useState('api');
    const [seeInfo, setSeeInfo] = useState<PaymentInfo | null>(null);
    const [data, setData] = useState<Data | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    interface PaymentInfo {
        wasPay: boolean;
        placa: string;
        date: Date;
        api: typeof fakeAPICalled_1 | typeof fakeAPICalled_2 | typeof fakeAPICalled_LEILAO;
    }

    interface Data {
        MARCA: string;
        MODELO: string;
        ano: string;
    }

    const checkPayment = useCallback(async (sessionId: string, api: typeof fakeAPICalled_1 | typeof fakeAPICalled_2 | typeof fakeAPICalled_LEILAO): Promise<PaymentInfo> => {
        try {
            // Simulação de resposta da API de verificação de pagamento
            const status = 'paid'; // ou 'unpaid' para simular não pago
            const objPay: PaymentInfo = { wasPay: status === 'paid', placa: params.placa, date: new Date(), api };
            localStorage.setItem('result', JSON.stringify(objPay));
            return objPay;

        } catch (error) {
            console.error('Erro ao verificar pagamento:', error);
            return { wasPay: false, placa: params.placa, date: new Date(), api };
        }
    }, [params.placa]);

    const handleCheckout = async (name: string, description: string, price: number, api: '1' | '2' | '3') => {
        try {
            // Simulação de resposta da API de checkout
            const response = { data: { id: 'fake-session-id' } };
            const { id } = response.data;
            const paymentObj = { sessionId: id, api };
            localStorage.setItem('payment', JSON.stringify(paymentObj));

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe instance not found');
            }

            console.log(`Redirecionado para o checkout com sessionId: ${id}`);
        } catch (error) {
            console.error('Erro durante o checkout:', error);
            toast({
                title: 'Erro tela de pagamento!',
                description: 'Houve um erro ao tentar abrir a tela de pagamento, tente novamente mais tarde',
            });
        }
    };

    const handlePaymentMethod = async (api: '1' | '2' | '3', method: 'pix' | 'credit_card') => {
        const { name, description, price } = await paymentName(api, params);
        if (method === 'credit_card') {
            await handleCheckout(name, description, price, api);
        }
    };

    const handleCloseModal = () => setModalShow(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const resultSting = localStorage.getItem('result');
            const paymentString = localStorage.getItem('payment');

            let result;
            if (resultSting) {
                result = JSON.parse(resultSting);
                if (params.placa === result.placa) {
                    setSeeInfo(result);
                } else {
                    localStorage.removeItem('result');
                }
            }

            if (paymentString) {
                const payment = JSON.parse(paymentString);
                const res = await checkPayment(payment.sessionId, payment.api);
                if (res.placa === params.placa) {
                    setSeeInfo(res);
                }
                localStorage.removeItem('payment');
            }

            let vehicleData;
            switch (params.placa) {
                case 'INT8C36':
                    vehicleData = fakeAPICalled_2;
                    break;
                case 'AWH4I48':
                    vehicleData = fakeAPICalled_LEILAO;
                    break;
                case 'INT1C45':
                    vehicleData = fakeAPICalled_1;
                    break;
                default:
                    setNotFound(true);
                    break;
            }

        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to avoid setting state on an unmounted component
        };
    }, [params.placa, checkPayment]);


    if (!user) {
        return (
            <div className='text-center mt-5'>
                <div className='alert alert-danger' role='alert'>
                    Não tem permissão de acesso!
                </div>
            </div>
        );
    }

    // if (!data) {
    //     return (
    //         <div className='text-center mt-5'>
    //             <div className='spinner-border' role='status'>
    //                 <span className='visually-hidden'>Carregando...</span>
    //             </div>
    //             <p>Buscando informações do veículo...</p>
    //         </div>
    //     );
    // }

    return (
        <div className='container mt-5'>
            {/* Modal */}
            {modalShow && (
                <div className='modal show d-block' tabIndex={-1} role='dialog'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Qual opção deseja usar?</h5>
                                <button type='button' className='close' onClick={handleCloseModal}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <div className='d-flex flex-column gap-3'>
                                    <button
                                        onClick={() => handlePaymentMethod(modalTitle as '1' | '2' | '3', 'credit_card')}
                                        className='btn btn-primary w-100'
                                    >
                                        Cartão de Crédito
                                    </button>
                                    <button
                                        onClick={() => handlePaymentMethod(modalTitle as '1' | '2' | '3', 'pix')}
                                        className='btn btn-success w-100'
                                    >
                                        Pix
                                    </button>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='text-center mb-5'>
                <h2 className={`text-xl ${notFound ? 'text-danger' : 'text-success'}`}>
                    {notFound ? 'Não achamos um veículo com essa placa' : 'Dados encontrados!'}
                </h2>
                <i className={`bi ${notFound ? 'bi-x-circle' : 'bi-check-circle'} ${notFound ? 'text-danger' : 'text-success'} fs-2`}></i>
            </div>
            <h1 className={`text-center text-3xl font-bold ${notFound ? 'bg-danger text-white' : 'bg-primary text-white'} p-2 rounded-md`}>
                {params.placa}
            </h1>
            <p className='text-xl text-center font-semibold mt-3'>
                {notFound
                    ? 'A Placa Pedia não encontrou informações sobre o veículo...'
                    : 'A Placa Pedia encontrou informações sobre o veículo...'
                }
            </p>

            <div className='d-flex flex-column align-items-center mt-4'>
                {data && (
                    <div className='d-flex flex-wrap justify-center gap-3 mb-4'>
                        <div className={`text-center ${notFound ? 'border-danger' : 'border-success'} border p-3`}>
                            <h5>Marca</h5>
                            <p>{data.MARCA}</p>
                        </div>
                        <div className={`text-center ${notFound ? 'border-danger' : 'border-success'} border p-3`}>
                            <h5>Modelo</h5>
                            <p>{data.MODELO}</p>
                        </div>
                        <div className={`text-center ${notFound ? 'border-danger' : 'border-success'} border p-3`}>
                            <h5>Ano</h5>
                            <p>{data.ano}</p>
                        </div>
                    </div>
                )}

                {!seeInfo ? (
                    <div
                        className={`card ${isHovered ? 'bg-warning' : 'bg-light'} border`}
                        style={{ width: '18rem' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
                        <div className='card-body text-center'>
                            <h5 className='card-title'>Escolha a forma de pagamento</h5>
                            <button
                                className='btn btn-primary'
                                onClick={() => {
                                    setModalTitle('1');
                                    setModalShow(true);
                                }}
                            >
                                Consultar placa
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className='text-center mt-3'>
                        <strong>Status:</strong> {seeInfo.wasPay ? 'Pago' : 'Não pago'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CarInformations;
