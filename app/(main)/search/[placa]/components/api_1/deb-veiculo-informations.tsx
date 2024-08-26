// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function DebVeiculoInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb dersa:</h3>
//                     <p>R$ {data.debdersa || '0,00'}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb detran:</h3>
//                     <p>R$ {data.debdetran || '0,00'}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb cetesb:</h3>
//                     <p>R$ {data.debcetesb || '0,00'}</p>
//                 </div>
//             </div>

//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb PRF:</h3>
//                     <p>R$ 0,00</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb Municipais:</h3>
//                     <p>R$ {data.debmunicipais || '0,00'}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Deb renainf:</h3>
//                     <p>R$ {data.debrenainf || '0,00'}</p>
//                 </div>
//             </div>

//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Valor total de Multas:</h3>
//                     <p></p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Valor total de IPVA:</h3>
//                     <p></p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DebVeiculoInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";

function DebVeiculoInformations({ data }: { data: any }) {
    return (
        <div className='container-fluid'>
            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb dersa:</h3>
                    <p>R$ {data.debdersa || '0,00'}</p>
                </div>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb detran:</h3>
                    <p>R$ {data.debdetran || '0,00'}</p>
                </div>
                <div className='col-12 col-md-4'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb cetesb:</h3>
                    <p>R$ {data.debcetesb || '0,00'}</p>
                </div>
            </div>

            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb PRF:</h3>
                    <p>R$ 0,00</p>
                </div>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb Municipais:</h3>
                    <p>R$ {data.debmunicipais || '0,00'}</p>
                </div>
                <div className='col-12 col-md-4'>
                    <h3 className='h5 text-primary font-weight-bold'>Deb renainf:</h3>
                    <p>R$ {data.debrenainf || '0,00'}</p>
                </div>
            </div>

            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Valor total de Multas:</h3>
                    <p></p>
                </div>
                <div className='col-12 col-md-6'>
                    <h3 className='h5 text-primary font-weight-bold'>Valor total de IPVA:</h3>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default DebVeiculoInformations;
