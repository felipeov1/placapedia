import React from 'react';

import { Separator } from "@/components/ui/separator";

function CarInformations({ data }: { data: any }) {
    return (
        <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Placa:</h3>
                    <p>{data.placa}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Chassi:</h3>
                    <p>{data.extra.chassi}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Combustivel:</h3>
                    <p>{data.extra.combustivel}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 1:</h3>
                    <p>{data.extra.restricao_1}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 2:</h3>
                    <p>{data.extra.restricao_2}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 3:</h3>
                    <p>{data.extra.restricao_3}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 4:</h3>
                    <p>{data.extra.restricao_4}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Municipio:</h3>
                    <p>{data.extra.municipio}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>UF:</h3>
                    <p>{data.extra.uf}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Marca:</h3>
                    <p>{data.MARCA}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Modelo:</h3>
                    <p>{data.MODELO}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Motor:</h3>
                    <p>{data.extra.motor}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Carroceria:</h3>
                    <p>{data.extra.tipo_carroceria}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Cor:</h3>
                    <p>{data.cor}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Categoria:</h3>
                    <p>{data.extra['s.especie']}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Potencia(CV):</h3>
                    <p>{data.extra.cap_maxima_tracao}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Tipo:</h3>
                    <p>{data.extra.tipo_veiculo}</p>
                </div>
            </div>
        </div>
    )
}

export default CarInformations;