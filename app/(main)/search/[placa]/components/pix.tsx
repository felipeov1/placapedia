// 'use client';

// import { Button } from '@/components/ui/button';
// import { toast } from '@/components/ui/use-toast';
// import axios from 'axios';
// import { LoaderCircle } from 'lucide-react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { AppContext } from '@/context/context';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import '../search-page.css';

// type Props = {
//     api: '1' | '2' | '3',
//     setModal: Dispatch<SetStateAction<boolean>>
// };

// function Pix({ api, setModal }: Props) {

//     const { prices } = useContext(AppContext);
//     const params = useParams<{ placa: string }>();
//     const router = useRouter();
//     const [data, setData] = useState<any>(null);
//     const [txid, setTxid] = useState<any>(null);

//     const handleClickConfirmPayment = async () => {
//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pix?txid=${txid}`);
//             if (res.data.status) {
//                 const objPay = { wasPay: 'paid', placa: params.placa, date: new Date(), api };
//                 localStorage.setItem('result', JSON.stringify(objPay));
//                 setModal(false);
//                 router.refresh();
//             } else {
//                 toast({
//                     title: 'Pagamento não efetuado',
//                     description: 'Se houve pagamento, espere algums minutos e tente novamente.'
//                 });
//             }
//         } catch (error) {
//             toast({
//                 title: 'Erro ao tentar confirmar pagamento',
//                 description: 'Desculpe o incomodo, se houver prejuizo, por favor entre em contato e peça o reenbolso'
//             });
//         }
//     };

//     useEffect(() => {
//         const getPix = async (price: string) => {
//             try {
//                 const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pix`, {
//                     price
//                 });
//                 setData(res.data);
//                 setTxid(res.data.cobranca.txid);
//             } catch (error) {
//                 toast({
//                     title: 'Erro ao criar pix',
//                     description: 'Desculpe, houve um erro ao tentarmos criar o pix de pagamento, tente novamente mais tarde'
//                 })
//             }
//         };
//         const getPrice = (api: "1" | "2" | "3") => {
//             if (api == "2") {
//                 return prices.api_2.replace(",", ".");
//             }
//             return prices.api_3.replace(",", ".");
//         }
//         getPix(getPrice(api));
//     }, [api, prices]);

//     if (!data) {
//         return (
//             <div className='text-center flex items-center justify-center gap-5 p-5'>
//                 <h1>Criando pix para pagamento</h1>
//                 <LoaderCircle className='text-base animate-spin' />
//             </div>
//         );
//     };

//     return (
//         <div className='w-full h-80 flex items-center justify-center flex-col'>
//             <h3 className='text-center text-2xl text-blue-500 font-bold'>R$
//                 {api == '2' && ` ${prices?.api_2}`}
//                 {api == '3' && ` ${prices?.api_3}`}
//             </h3>
//             <p className='text-center'>Após o pagamento, clique em <strong>Confirmar meu pagamento</strong>, para liberar os dados</p>
//             {data && (
//                 <>
//                     <Image src={data.qrcode.imagemQrcode} alt='pix qrCode' width={200} height={200} />
//                 </>
//             )}
//             <div className='mt-5'>
//                 <Button onClick={handleClickConfirmPayment} className='bg-blue-500 hover:bg-blue-800'>Confirmar meu pagamento</Button>
//             </div>
//         </div>
//     );
// };

// export default Pix;



'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/context';
import '../search-page.css';

type Props = {
    api:  '2' | '3',
    setModal: Dispatch<SetStateAction<boolean>>
};

function Pix({ api, setModal }: Props) {
    const { prices } = useContext(AppContext);
    const params = useParams<{ placa: string }>();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [txid, setTxid] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleClickConfirmPayment = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pix?txid=${txid}`);
            if (res.data.status) {
                const objPay = { wasPay: 'paid', placa: params.placa, date: new Date(), api };
                localStorage.setItem('result', JSON.stringify(objPay));
                setModal(false);
                router.refresh();
            } else {
                setAlertMessage('Pagamento não efetuado. Se houve pagamento, espere alguns minutos e tente novamente.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            setAlertMessage('Erro ao tentar confirmar pagamento. Desculpe o incômodo, se houver prejuízo, por favor entre em contato e peça o reembolso.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    useEffect(() => {
        const getPix = async (price: string) => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pix`, { price });
                setData(res.data);
                setTxid(res.data.cobranca.txid);
            } catch (error) {
                setAlertMessage('Erro ao criar pix. Desculpe, houve um erro ao tentarmos criar o pix de pagamento, tente novamente mais tarde.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        };

        const getPrice = (api: '2' | '3') => {
            if (api === '2') {
                return prices.api_2.replace(',', '.');
            }
            return prices.api_3.replace(',', '.');
        };

        getPix(getPrice(api));
    }, [api, prices]);

    if (!data) {
        return (
            <div className="text-center flex items-center justify-center gap-5 p-5">
                <h1>Criando pix para pagamento</h1>
                <LoaderCircle className="text-base animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-80 flex items-center justify-center flex-col">
            {showAlert && (
                <div className="alert alert-danger position-fixed bottom-0 end-0 m-3" role="alert">
                    {alertMessage}
                </div>
            )}
            <h3 className="text-center text-2xl text-blue-500 font-bold">R$
                {api === '2' && ` ${prices?.api_2}`}
                {api === '3' && ` ${prices?.api_3}`}
            </h3>
            <p className="text-center">Após o pagamento, clique em <strong>Confirmar meu pagamento</strong> para liberar os dados</p>
            {data && (
                <Image src={data.qrcode.imagemQrcode} alt="pix qrCode" width={200} height={200} />
            )}
            <div className="mt-5">
                <Button onClick={handleClickConfirmPayment} className="bg-blue-500 hover:bg-blue-800">
                    Confirmar meu pagamento
                </Button>
            </div>
        </div>
    );
}

export default Pix;
