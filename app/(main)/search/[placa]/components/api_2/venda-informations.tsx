// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function VendaInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Data inclusão:</h3>
//                     <p>{data.datavenda}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Doc. do comprador:</h3>
//                     <p>{data.cpfcnpjcomprador}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Data da venda:</h3>
//                     <p>{data.datavenda}</p>
//                 </div>
//             </div>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Comunicação de venda:</h3>
//                     <p>{data.ccomunicacaovenda}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default VendaInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";

function VendaInformations({ data }: { data: any }) {
    return (
        <div className="container mt-4 overflow-auto">
            <Separator />
            <div className="row mt-3 mb-3">
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Data inclusão:</h3>
                    <p className="d-inline"> {data.datavenda}</p>
                </div>
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Doc. do comprador:</h3>
                    <p className="d-inline">{data.cpfcnpjcomprador}</p>
                </div>
                <div className="col-md-4 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Data da venda:</h3>
                    <p className="d-inline">{data.datavenda}</p>
                </div>
            </div>
            <Separator />
            <div className="row mt-3 mb-3">
                <div className="col-md-12 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Comunicação de venda:</h3>
                    <p className="d-inline">{data.ccomunicacaovenda}</p>
                </div>
            </div>
        </div>
    );
}

export default VendaInformations;
