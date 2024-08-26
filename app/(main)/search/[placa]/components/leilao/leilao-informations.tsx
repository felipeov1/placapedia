// import React from 'react';

// import { Separator } from "@/components/ui/separator";

// function LeilaoInformations({ data }: { data: any }) {
//     return (
//         <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
//             {data.leilao.registro.map((car: any, i: number) => (
//                 <div key={i}>
//                     <h2>Leilão: {i + 1}</h2>
//                     <Separator />
//                     <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Leiloeiro:</h3>
//                             <p>{car.leiloeiro}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Lote:</h3>
//                             <p>{car.lote}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Data do Leilão:</h3>
//                             <p>{car.dataleilao}</p>
//                         </div>
//                     </div>

//                     <Separator />
//                     <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Situação do chassi:</h3>
//                             <p>{car.situacaogeraldochassi}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Código geral do veículo:</h3>
//                             <p>{car.condicaogeraldoveiculo}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Comitente:</h3>
//                             <p>{car.comitente}</p>
//                         </div>
//                     </div>

//                     <Separator />
//                     <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Patio:</h3>
//                             <p>{car.patio}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Marca/Modelo:</h3>
//                             <p>{car.marcamodelo}</p>
//                         </div>
//                         <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                             <h3 className='text-2xl text-blue-500 font-bold'>Condição do veículo:</h3>
//                             <p>{car.condicaogeraldoveiculo}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <Separator />
//             <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Indice de Risco 0 a 5:</h3>
//                     <span className='text-sm font-light'>De 0 (valor mínino) a 5 (valor máximo)</span>
//                     <p>{data.analise_risco.indicerisco}</p>
//                 </div>
//                 <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
//                     <h3 className='text-2xl text-blue-500 font-bold'>Analise de Risco:</h3>
//                     <p>{data.analise_risco.parecer}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LeilaoInformations;

import React from 'react';
import { Separator } from "@/components/ui/separator";

function LeilaoInformations({ data }: { data: any }) {
    return (
        <div className='container-fluid'>
            {data.leilao.registro.map((car: any, i: number) => (
                <div key={i} className='mb-4'>
                    <h2>Leilão: {i + 1}</h2>
                    <Separator />
                    <div className='row mt-3 mb-3'>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Leiloeiro:</h3>
                            <p>{car.leiloeiro}</p>
                        </div>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Lote:</h3>
                            <p>{car.lote}</p>
                        </div>
                        <div className='col-12 col-md-4'>
                            <h3 className='h5 text-primary font-weight-bold'>Data do Leilão:</h3>
                            <p>{car.dataleilao}</p>
                        </div>
                    </div>

                    <Separator />
                    <div className='row mt-3 mb-3'>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Situação do chassi:</h3>
                            <p>{car.situacaogeraldochassi}</p>
                        </div>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Código geral do veículo:</h3>
                            <p>{car.condicaogeraldoveiculo}</p>
                        </div>
                        <div className='col-12 col-md-4'>
                            <h3 className='h5 text-primary font-weight-bold'>Comitente:</h3>
                            <p>{car.comitente}</p>
                        </div>
                    </div>

                    <Separator />
                    <div className='row mt-3 mb-3'>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Patio:</h3>
                            <p>{car.patio}</p>
                        </div>
                        <div className='col-12 col-md-4 mb-3 mb-md-0'>
                            <h3 className='h5 text-primary font-weight-bold'>Marca/Modelo:</h3>
                            <p>{car.marcamodelo}</p>
                        </div>
                        <div className='col-12 col-md-4'>
                            <h3 className='h5 text-primary font-weight-bold'>Condição do veículo:</h3>
                            <p>{car.condicaogeraldoveiculo}</p>
                        </div>
                    </div>
                </div>
            ))}
            <Separator />
            <div className='row mt-3 mb-3'>
                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                    <h3 className='h5 text-primary font-weight-bold'>Indice de Risco 0 a 5:</h3>
                    <span className='d-block text-muted'>De 0 (valor mínimo) a 5 (valor máximo)</span>
                    <p>{data.analise_risco.indicerisco}</p>
                </div>
                <div className='col-12 col-md-6'>
                    <h3 className='h5 text-primary font-weight-bold'>Analise de Risco:</h3>
                    <p>{data.analise_risco.parecer}</p>
                </div>
            </div>
        </div>
    );
}

export default LeilaoInformations;
