// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function LicenciamentoInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Ultimo Licenciamento:</h3>
//                     <p>{data.licdata}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Licenciamento em Aberto:</h3>
//                     <p>{data.existedebitodelicenciamento}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LicenciamentoInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";

function LicenciamentoInformations({ data }: { data: any }) {
    return (
        <div className="container mt-4 overflow-auto">
            <Separator />
            <div className="row mt-3 mb-3">
                <div className="col-md-6 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Ultimo Licenciamento:</h3>
                    <p className="d-inline">{data.licdata}</p>
                </div>
                <div className="col-md-6 mb-3">
                    <h3 className="h5 text-primary font-weight-bold d-inline">Licenciamento em Aberto:</h3>
                    <p className="d-inline">{data.existedebitodelicenciamento}</p>
                </div>
            </div>
        </div>
    );
}

export default LicenciamentoInformations;
