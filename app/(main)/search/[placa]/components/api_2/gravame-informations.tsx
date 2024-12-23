// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function GravameInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Financiamento:</h3>
//                     <p>{data.restricaofinan}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Financeira:</h3>
//                     <p>{data.restricaonomeagente}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Arrendatario:</h3>
//                     <p>{data.restricaoarrendatario}</p>
//                 </div>
//             </div>

//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Data de inclusão:</h3>
//                     <p>{data.restricaodatainclusao}</p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default GravameInformations;


import React from 'react';
import { Separator } from "@/components/ui/separator";

function GravameInformations({ data }: { data: any }) {
    return (
        <div className="container mt-4 overflow-auto">
            <Separator />
            <div className="row mt-3 mb-3 text-center">
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Financiamento:</h3>
                    <p className="d-inline">{data.restricaofinan}</p>
                </div>
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Financeira:</h3>
                    <p className="d-inline">{data.restricaonomeagente}</p>
                </div>
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Arrendatario:</h3>
                    <p className="d-inline">{data.restricaoarrendatario}</p>
                </div>
            </div>
    
            <Separator />
            <div className="row mt-3 mb-3 text-center">
                <div className="col-md-12 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Data de inclusão:</h3>
                    <p className="d-inline">{data.restricaodatainclusao}</p>
                </div>
            </div>
        </div>
    );
}

export default GravameInformations;
