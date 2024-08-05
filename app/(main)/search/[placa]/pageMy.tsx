"use client";

import React, { useState, useContext, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';
import { AppContext } from '@/context/context';
import { paymentName } from '@/utils/data';
import { ListChecks, LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import PaymenteForm from './components/payment';
import Loading from '@/components/loading';
import Api_1_Informations from './components/api_1';
import Api2Informations from './components/api_2';
import LeilaoInformations from './components/leilao';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import Print from '@/components/print';
import { cn } from '@/lib/utils';
import { getAuthToken } from '@/firebase/services';
import Image from 'next/image';
import './search-page.css';


interface PaymentInfo {
    wasPay: boolean;
    placa: string;
    date: Date;
    api: '1' | '2' | '3';
};

interface Data {
    MARCA: string;
    MODELO: string;
    ano: string;
};



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CarInformations: React.FC = () => {
    const { user } = useContext(AppContext);
    const params = useParams<{ placa: string }>();

    const [isHovered, setIsHovered] = useState(false);
    const [modalTitle, setModalTitle] = useState('api');
    const [seeInfo, setSeeInfo] = useState<PaymentInfo | null>(null);
    const [data, setData] = useState<Data | null>(null);
    const [notFound, setNotFound] = useState(false);

    const [modal, setModal] = useState(false);

    // Verificando se houve pagamento pelo stripe
    const checkPayment = useCallback(async (sessionId: string, api: '1' | '2' | '3'): Promise<PaymentInfo> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/verificar`, { sessionId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { status } = response.data;

            const objPay: PaymentInfo = { wasPay: status === 'paid', placa: params.placa, date: new Date(), api };
            localStorage.setItem('result', JSON.stringify(objPay));
            return objPay;

        } catch (error) {
            console.error('Erro ao verificar pagamento:', error);
            return { wasPay: false, placa: params.placa, date: new Date(), api };
        }
    }, [params.placa]);

    // Criando link de pagamento do Stripe
    const handleCheckout = async (name: string, description: string, price: number, api: '1' | '2' | '3') => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/create`, {
                dynamicParam: params.placa,
                name,
                description,
                price
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { id } = response.data;

            const paymentObj = { sessionId: id, api };
            localStorage.setItem('payment', JSON.stringify(paymentObj));

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe instance not found');
            }

            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) {
                throw new Error(`Error during Stripe checkout: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro durante o checkout:', error);
            toast({
                title: 'Erro tela de pagamento!',
                description: 'Houve um erro ao tentar abrir a tela de pagamento, tente novamente mais tarde',
            });
        }
    };

    // Verificando qual vai ser o metodo de pagamento
    const handlePaymentMethod = async (api: '1' | '2' | '3', method: 'pix' | 'credit_card') => {
        const { name, description, price } = await paymentName(api, params);
        if (method === 'credit_card') {
            await handleCheckout(name, description, price, api);
        }
    };

    // Abrir modal de opções
    const handleCloseModal = (isOpen: boolean) => {
        setModal(isOpen);
        setModalTitle('api');
    };

    useEffect(() => {
        const fetchData = async () => {

            const resultSting = localStorage.getItem('result');
            const paymentString = localStorage.getItem('payment');

            let result;
            if (resultSting) {
                result = JSON.parse(resultSting);
                if (params.placa == result.placa) {
                    setSeeInfo(result);
                } else {
                    localStorage.removeItem('result');
                }
            }

            if (paymentString) {
                const payment = JSON.parse(paymentString);
                const res = await checkPayment(payment.sessionId, payment.api);
                if (res.placa == params.placa) {
                    setSeeInfo(res);
                }
                localStorage.removeItem('payment');
            }

            try {
                const token = await getAuthToken();
                if (token) {
                    const res = await axios.post('http://localhost:5000/api_externas', {
                        placa: params.placa
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setData(res.data.formatedRes);
                }
            } catch (error) {
                toast({
                    title: 'Erro nos dados!',
                    description: 'Houve um erro ao tentar procurar o veículo'
                });
                setNotFound(true);
            }
        };
        fetchData();
    }, [params.placa, modal, checkPayment]);

    if (!user) {
        return <Loading text='Não tem permissão de acesso!'  />;
    };

    if (!data) {
        return (
            <div className='mt-10'>
                <Loading text='Buscando informações do veículo' />
            </div>
        );
    };

    return (
        <Dialog open={modal} onOpenChange={(open) => handleCloseModal(open)}>
            <Print placa={params.placa} notFound={notFound} seeInfo={seeInfo?.wasPay ? true : false}>
                <div className='container-fluid'>
                    <div className="text-center mb-4">
                        <h2 className={`text-xl ${notFound ? 'text-danger' : 'text-success'}`}>
                            {notFound ? 'Não achamos um veículo com essa placa' : 'Dados encontrados!'}
                        </h2>
                    </div>
                    <div className="text-center mb-4">
                        <p className={`text-xl font-semibold ${notFound ? 'text-danger' : 'text-primary'}`}>
                            A Placa <span className="text-success">Pedia</span> {notFound ? 'não encontrou informações sobre o veículo...' : 'encontrou informações sobre o veículo...'}
                        </p>
                    </div>

                    <div className="container-fluid mt-5">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8">
                                <div className={`d-flex ${notFound ? 'bg-danger' : 'bg-light'} p-4 rounded justify-content-around`}>
                                    {data && (
                                        <div className="d-flex align-items-center">
                                            <div className="position-relative" style={{ width: '350px', height: '100px' }}>
                                                <Image
                                                    src="/blank-license-plate.png"
                                                    alt="Placa"
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}
                                                    width={350}
                                                    height={100}
                                                />
                                                <h1 className="numberPlate position-absolute top-50 start-50 translate-middle text-3xl font-bold text-dark mt-2" style={{ zIndex: 2 }}>
                                                    {params.placa}
                                                </h1>
                                            </div>
                                        </div>
                                    )}
                                    <div className="align-content-center mt-2">
                                        <div className="d-flex flex-row gap-3">
                                            <div className="info-box">
                                                <h5 className="info-title">Marca</h5>
                                                <div className='infoBack'>
                                                    <InfoCard notFound={notFound} value={data.MARCA} />
                                                </div>
                                            </div>
                                            <div className="info-box">
                                                <h5 className="info-title">Modelo</h5>
                                                <div className='infoBack'>
                                                    <InfoCard notFound={notFound} value={data.MODELO} />
                                                </div>
                                            </div>
                                            <div className="info-box">
                                                <h5 className="info-title">Ano de fabricação</h5>
                                                <div className='infoBack'>
                                                    <InfoCard notFound={notFound} value={data.ano} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">
                                {!seeInfo ? (
                                    <ProtectedInfoCard
                                        isHovered={isHovered}
                                        setIsHovered={setIsHovered}
                                        notFound={notFound}
                                    />
                                ) : (
                                    <div className="col-12 mb-4">
                                        {seeInfo?.wasPay && (
                                            <>
                                                {Number(seeInfo.api) === 1 && (
                                                    <Api_1_Informations placa={params.placa} />
                                                )}
                                                {Number(seeInfo.api) === 2 && (
                                                    <Api2Informations placa={params.placa} />
                                                )}
                                                {Number(seeInfo.api) === 3 && (
                                                    <LeilaoInformations placa={params.placa} />
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Print>
            <PaymentDialog
                modalTitle={modalTitle}
                setModalTitle={setModalTitle}
                handlePaymentMethod={handlePaymentMethod}
                setModal={setModal}
            />
        </Dialog>
    );
};

interface InfoCardProps {
    value: string;
    notFound: boolean
}
const InfoCard: React.FC<InfoCardProps> = ({ value, notFound }) => (
    <div className={` text-center rounded-md ${notFound ? 'bg-rose-500' : 'bg-blue-500'} text-dark font-bold p-2`}>
        <h1><span className='infosData'>{notFound ? '---' : value}</span></h1>
    </div>
);

interface ProtectedInfoCardProps {
    isHovered: boolean;
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    notFound: boolean
};
const ProtectedInfoCard: React.FC<ProtectedInfoCardProps> = ({ isHovered, setIsHovered, notFound }) => (
    <div className="protectedInfos d-flex align-items-center bg-cover border rounded shadow-md justify-content-center" style={{ backgroundImage: 'url("/protected_bg.svg")' }}>
        <DialogTrigger
            className={`d-flex max-w-90 z-50 align-items-center cursor-pointer gap-3 p-3 md-px-10 md-py-7 transition-transform rounded text-white ${notFound ? 'bg-danger hover-bg-danger-dark' : 'bg-primary hover-bg-primary-dark'} ${!notFound && 'hover-scale-125'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="d-none d-md-block">
                {isHovered ? <LockKeyholeOpen /> : <LockKeyhole />}
            </div>
            {notFound ? 'Não há dados!' : 'Liberar informações do veículo'}
        </DialogTrigger>
    </div>
);

// Modal com todoas as escolhas de pagamento
interface PaymentDialogProps {
    modalTitle: string;
    setModalTitle: React.Dispatch<React.SetStateAction<string>>;
    handlePaymentMethod: (api: '1' | '2' | '3', method: 'pix' | 'credit_card') => void;
    setModal: Dispatch<SetStateAction<boolean>>
};
const PaymentDialog: React.FC<PaymentDialogProps> = ({ modalTitle, setModalTitle, handlePaymentMethod, setModal }) => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                {modalTitle === 'api' && "Quais das nossas informações você deseja?"}
                {modalTitle === 'pay' && "Qual forma de pagamento?"}
                {modalTitle === 'pix' && "Pagamento via Pix"}
            </DialogTitle>
            <DialogDescription>
                <PaymenteForm
                    handleChangeTitle={setModalTitle}
                    handleObjToPay={(e) => handlePaymentMethod(e.api, e.method)}
                    setModal={setModal}
                />
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
);

export default CarInformations;