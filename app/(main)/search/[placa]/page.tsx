
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
import { Span } from "next/dist/trace";
// import 'bootstrap/dist/css/bootstrap.min.css';
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
        let isMounted = true;

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
                if (token && isMounted) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/api_externas/main`, {
                        placa: params.placa
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (isMounted) {
                        setData(res.data.formatedRes);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    toast({
                        title: 'Erro nos dados!',
                        description: 'Houve um erro ao tentar procurar o veículo'
                    });
                    setNotFound(true);
                }
            }
        };
        fetchData();

        return () => {
            isMounted = false;
        };

    }, [params.placa, modal, checkPayment]);

    if (!user) {
        return (
            <div className='text-center mt-5'>
                <p className='text-danger'>Não tem permissão de acesso!</p>
            </div>
        )
    };

    if (!data) {
        return (
            <div className='text-center mt-5'>
                <div className='spinner-border' role='status'></div>
                <p className='text-dark'>Carregando...</p>
            </div>
        );
    };

    return (
        <Dialog open={modal} onOpenChange={(open) => handleCloseModal(open)}>
            <Print placa={params.placa} notFound={notFound} seeInfo={seeInfo?.wasPay ? true : false}>
                <div className='teste container-fluid min-vh-100 '>
                    <div className='d-flex flex-column align-items-center justify-content-center gap-4'>
                        <div className='d-flex align-items-center gap-4'>
                            <h2 className={`title-search-page fs-3 ${notFound ? 'text-danger' : ''}`}
                                style={{ color: notFound ? '' : '#02024B' }}>
                                {notFound ? 'Não achamos um veículo com essa placa' : 'Encontramos todas as informações do veículo!'}
                            </h2>


                        </div>
                        {notFound ? (
                            <p className='fs-4 text-center fw-semibold text-danger'>
                                A Placa <span className='text-success'>Pedia</span> não encontrou informações sobre o veículo...
                            </p>
                        ) : (
                            <p className='subtitle-search-page fs-5 text-center'>
                                Com nosso sistema eficiente, conseguimos obter todas as informações detalhadas sobre o veículo de forma rápida e precisa. A Placapedia está aqui para fornecer os dados que você precisa com a máxima confiança e agilidade.
                            </p>

                        )}
                    </div>
                    <div className='w-full d-flex flex-column flex-wrap items-center justify-content-center align-content-center mt-5'>
                        {data && (
                            <div className="box-free-infos container-fluid" style={{ borderRadius: '8px' }}>
                                <div className="free-infos flex-wrap d-flex align-items-center justify-content-center" style={{ width: '100%' }}>
                                    <div className="div-plate position-relative" style={{ flexShrink: 0, marginRight: '20px' }}>
                                        <Image className='license-plate-image' src={'/blank-license-plate.webp'} alt="placa-imagem" width={400} height={150} />
                                        <p className='numberPlate'>
                                            {params.placa}
                                        </p>

                                    </div>
                                    <div className="infos-free  d-flex flex-row ms-5" style={{ flexShrink: 0, gap: '30px' }}>
                                        <div className="d-flex flex-column align-items-start p-3">
                                            <label className='fs-6'>MARCA</label>
                                            <span className='input-data fw-bold' 
                                            >{data.MARCA}</span>
                                        </div>
                                        <div
                                            className="d-flex flex-column align-items-start p-3"
                                           
                                        >
                                            <label className='fs-6'>MODELO</label>
                                            <span className='input-data fw-bold'>{data.MODELO}</span>
                                        </div>
                                        <div className="year d-flex flex-column align-items-start p-3">
                                            <label className='fs-6'>ANO</label>
                                            <span className='input-data fw-bold'>{data.ano}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!seeInfo ? (
                            <div className='d-flex justify-content-center'>
                                <ProtectedInfoCard
                                    isHovered={isHovered}
                                    setIsHovered={setIsHovered}
                                    notFound={notFound}
                                />
                            </div>
                        ) : (
                            <>
                                {
                                    seeInfo?.wasPay && (
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
                                    )
                                }
                            </>
                        )}
                        {/* <LeilaoInformations placa={params.placa} /> */}
                        {/* <Api2Informations placa={params.placa} /> */}
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
    title: string;
    value: string;
    notFound: boolean
}
const InfoCard: React.FC<InfoCardProps> = ({ title, value, notFound }) => ( // Componente de informaçõa principais
    <span className={cn('text-center p-4 rounded-md bg-blue-500 text-white font-bold text-xl',
        notFound && "bg-rose-500"
    )}>
        <h1>{title}: <span>{notFound ? '---' : value}</span></h1>
    </span>
);

interface ProtectedInfoCardProps {
    isHovered: boolean;
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    notFound: boolean
};
const ProtectedInfoCard: React.FC<ProtectedInfoCardProps> = ({ isHovered, setIsHovered, notFound }) => (
    <div className="protected-info d-flex align-items-center justify-content-center bg-cover rounded " style={{ backgroundImage: 'url("/protected_bg.svg")', border: '2px solid' }}>
        <DialogTrigger
            className={cn('btn-show-info d-flex w-90 z-50 align-items-center cursor-pointer gap-3 p-3 px-md-10 py-md-7 transition-transform rounded text-white', notFound && 'bg-danger hover:bg-danger-dark')}
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
