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
                    <p>{data.chassi}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Renavam:</h3>
                    <p>{data.renavam}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 1:</h3>
                    <p>{data.outras_restricoes_01}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 2:</h3>
                    <p>{data.outras_restricoes_02}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Restrição 3:</h3>
                    <p>{data.outras_restricoes_03}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Municipio:</h3>
                    <p>{data.municipio}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>UF:</h3>
                    <p>{data.uf}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Marca:</h3>
                    <p>{data.marca}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Modelo:</h3>
                    <p>{data.modelo}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Modelo Fab:</h3>
                    <p>{data.marcamodelocompleto}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Tipo:</h3>
                    <p>{data.tipo}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Carroceria:</h3>
                    <p>{data.carroceria}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Cor:</h3>
                    <p>{data.cor}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Categoria:</h3>
                    <p>{data.veicategoria}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Combustivel:</h3>
                    <p>{data.combustivel}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Potencia(CV):</h3>
                    <p>{data.potencia}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Capacidade de carga:</h3>
                    <p>{data.capacidadecarga}</p>
                </div>
            </div>

            <Separator />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Nome propretario:</h3>
                    <p>{data.pronome}</p>
                </div>
                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Propretario anterior:</h3>
                    <p>{data.pronomeanterior}</p>
                </div>
                {/* <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                    <h3 className='text-2xl text-blue-500 font-bold'>Capacidade de carga:</h3>
                    <p>{data.capacidadecarga}</p>
                </div> */}
            </div>
        </div>
    )
}

export default CarInformations;