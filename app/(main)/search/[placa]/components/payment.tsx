// import React, { Dispatch, SetStateAction, useState } from 'react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';
// import Pix from './pix';
// import SearchsMethod from './searchs';

// interface ObjToPay {
//     api: '1' | '2' | '3',
//     method: 'pix' | 'credit_card'
// };

// type Props = {
//     handleChangeTitle: (e: string) => void,
//     handleObjToPay: (e: ObjToPay) => void,
//     setModal: Dispatch<SetStateAction<boolean>>
// };

// function PaymenteForm({ handleChangeTitle, handleObjToPay, setModal }: Props) {

//     const [searchMethod, setSearchMethod] = useState<'1' | '2' | '3'>('1');
//     const [method, setMethod] = useState<'pix' | 'credit_card'>('pix');
//     const [page, setPage] = useState(0);

//     const handleClick = (pass?: boolean) => {
//         if (pass) {
//             handleObjToPay({
//                 api: searchMethod,
//                 method: method
//             })
//             setPage(0);
//             return;
//         }
//         setPage(page + 1);
//         handleChangeTitle(page == 1 ? 'pix' : 'pay');
//     };

//     return (
//         <div className='mt-5 w-full'>
//             {page == 0 && (
//                 <div className='w-full'>
//                     <SearchsMethod searchMethod={searchMethod} setSearchMethod={setSearchMethod} />
//                     <div className='flex items-center justify-end mt-5'>
//                         <div>
//                             <Button onClick={() => handleClick()} variant="placapedia">Próximo</Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {page == 1 && (
//                 <div>
//                     <div className='flex flex-col md:flex-row items-center justify-center gap-3'>
//                         <div
//                             className={cn('w-36 h-36 flex flex-col items-center justify-center border rounded-md shadow-md cursor-pointer transition-colors bg-slate-100 hover:bg-slate-200',
//                                 method == "pix" && "bg-slate-200"
//                             )}
//                             onClick={() => setMethod('pix')}
//                         >
//                             <Image src="/pix.svg" alt='Pix' width={70} height={70} />
//                             <h2 className='text-xl text-blue-400'>Pix</h2>
//                         </div>
//                         <div
//                             className={cn('w-36 h-36 flex flex-col items-center justify-center border rounded-md shadow-md cursor-pointer transition-colors bg-slate-100 hover:bg-slate-200',
//                                 method == "credit_card" && "bg-slate-200"
//                             )}
//                             onClick={() => setMethod('credit_card')}
//                         >
//                             <Image src="/credit_card.svg" alt='Cartão de crédito' width={70} height={70} />
//                             <h2 className='text-xl text-center text-blue-400'>Cartão de Crédito</h2>
//                         </div>
//                     </div>
//                     <div className='flex items-center justify-end mt-5'>
//                         <div>
//                             <Button onClick={() => handleClick(method == 'pix' ? false : true)} variant="placapedia">Próximo</Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {page == 2 && (
//                 <Pix api={searchMethod} setModal={setModal} />
//             )}
//         </div>
//     );
// };

import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Pix from './pix';
import SearchsMethod from './searchs';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../search-page.css';

interface ObjToPay {
    api: '2' | '3'; // Removendo '1'
    method: 'pix' | 'credit_card';
}

type Props = {
    handleChangeTitle: (e: string) => void;
    handleObjToPay: (e: ObjToPay) => void;
    setModal: Dispatch<SetStateAction<boolean>>;
};

function PaymenteForm({ handleChangeTitle, handleObjToPay, setModal }: Props) {
    const [searchMethod, setSearchMethod] = useState<'2' | '3'>('2'); // Removendo '1'
    const [method, setMethod] = useState<'pix' | 'credit_card'>('pix');
    const [page, setPage] = useState(0);

    const handleClick = (pass?: boolean) => {
        if (pass) {
            handleObjToPay({
                api: searchMethod,
                method: method
            });
            setPage(0);
            return;
        }
        setPage(page + 1);
        handleChangeTitle(page === 1 ? 'Pagamento' : 'Plano');
    };


    return (
        <div className="container-fluid mt-4">
            {page === 0 && (
                <div>
                    <SearchsMethod searchMethod={searchMethod} setSearchMethod={setSearchMethod} />
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            onClick={() => handleClick()}
                            className="btn btnNext btn-primary"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
            {page === 1 && (
                <div>
                    <h1 className="text-center mb-5">Escolha a forma de pagamento</h1>
                    <div className="d-flex flex-wrap justify-content-center text-center">
                        <div
                            className={`card-pix col-12 col-sm-6 col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center p-3 border rounded cursor-pointer ${method === 'pix' ? 'border-select' : 'border-no-select'}`}
                            onClick={() => setMethod('pix')}
                        >
                            <Image src="/pix.svg" alt="Pix" width={70} height={70} className="svg-colored" />
                            <h2 className="mt-2">Pix</h2>
                        </div>
                        <div
                            className={`col-12 col-sm-6 col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center p-3 border rounded cursor-pointer ${method === 'credit_card' ? 'border-select' : 'border-no-select'}`}
                            onClick={() => setMethod('credit_card')}
                        >
                            <Image src="/credit_card.svg" alt="Cartão de Crédito" width={70} height={70} className="svg-colored" />
                            <h2 className="mt-2">Cartão de Crédito</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button
                            onClick={() => handleClick(method === 'pix' ? false : true)}
                            className="btn btnNext btn-primary"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
            {page === 2 && (
                <Pix api={searchMethod} setModal={setModal} />
            )}
        </div>
    );
}

export default PaymenteForm;