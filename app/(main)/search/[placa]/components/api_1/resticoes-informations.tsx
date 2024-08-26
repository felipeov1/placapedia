// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function RestricoesInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Furto:</h3>
//                     <p>{data.resfurto}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Guincho:</h3>
//                     <p>{data.resguincho}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Administrativo:</h3>
//                     <p>{data.resadministrativa}</p>
//                 </div>
//             </div>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Judicial:</h3>
//                     <p>{data.resjudicial}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RestricoesInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";

function RestricoesInformations({ data }: { data: any }) {
    return (
        <div className='container-fluid'>
            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-4 d-flex flex-column align-items-center text-center text-md-left'>
                    <h3 className='h5 text-primary font-weight-bold'>Furto:</h3>
                    <p>{data.resfurto}</p>
                </div>
                <div className='col-12 col-md-4 d-flex flex-column align-items-center text-center text-md-left'>
                    <h3 className='h5 text-primary font-weight-bold'>Guincho:</h3>
                    <p>{data.resguincho}</p>
                </div>
                <div className='col-12 col-md-4 d-flex flex-column align-items-center text-center text-md-left'>
                    <h3 className='h5 text-primary font-weight-bold'>Administrativo:</h3>
                    <p>{data.resadministrativa}</p>
                </div>
            </div>
            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-4 d-flex flex-column align-items-center text-center text-md-left'>
                    <h3 className='h5 text-primary font-weight-bold'>Judicial:</h3>
                    <p>{data.resjudicial}</p>
                </div>
            </div>
        </div>
    );
}

export default RestricoesInformations;
