// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function CarInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Placa:</h3>
//                     <p>{data.dados_veiculo.placa}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Chassi:</h3>
//                     <p>{data.dados_veiculo.chassi}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Ano de Fabricação:</h3>
//                     <p>{data.dados_veiculo.anofabricacaomodelo}</p>
//                 </div>
//             </div>

//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Cor:</h3>
//                     <p>{data.dados_veiculo.cor}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Modelo/Marca:</h3>
//                     <p>{data.dados_veiculo.marcamodelo}</p>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default CarInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";
import data from '../../../../../../fake'

function CarInformations({ data }: { data: any }) {
    return (
        <div className='container-fluid'>
            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Placa:</h3>
                    <p>{data.dados_veiculo.placa}</p>
                </div>
                <div className='col-12 col-md-4 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Chassi:</h3>
                    <p>{data.dados_veiculo.chassi}</p>
                </div>
                <div className='col-12 col-md-4'>
                    <h3 className='h5 text-primary font-weight-bold'>Ano de Fabricação:</h3>
                    <p>{data.dados_veiculo.anofabricacaomodelo}</p>
                </div>
            </div>

            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Cor:</h3>
                    <p>{data.dados_veiculo.cor}</p>
                </div>
                <div className='col-12 col-md-6'>
                    <h3 className='h5 text-primary font-weight-bold'>Modelo/Marca:</h3>
                    <p>{data.dados_veiculo.marcamodelo}</p>
                </div>
            </div>
        </div>
    );
}

export default CarInformations;
