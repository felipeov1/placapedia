"use client";

import React, { useContext } from 'react';
import { cn } from '@/lib/utils';
import { AppContext } from '@/context/context';

type Props = {
    searchMethod: "1" | "2" | "3",
    setSearchMethod: React.Dispatch<React.SetStateAction<"1" | "2" | "3">>
};

function SearchsMethod({ searchMethod, setSearchMethod }: Props) {

    const { prices } = useContext(AppContext);

    return (
        <div>
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
                {/* <div className={cn(`flex w-36 h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
                    searchMethod == "1" && "bg-slate-200"
                )}
                    onClick={() => setSearchMethod("1")}
                >
                    <h1 className="text-center text-xl font-bold">Consulta 1.0</h1>
                    <p className="font-bold text-blue-500">R$ {prices?.api_1}</p>
                    <div className='hidden md:block'>
                        <ul className="my-3 flex flex-col text-xs">
                            <li>- Chassi</li>
                            <li>- Renavam</li>
                            <li>- Motor</li>
                            <li>- Informações Cadastrais</li>
                            <li>- Restrições</li>
                        </ul>
                    </div>
                    <div className='text-xs block md:hidden'>
                        <span>Chassi, Renavam, Motor, Informações Cadastrais, Restrições</span>
                    </div>
                </div> */}
                <div className={cn(`flex h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
                    searchMethod == "2" && "bg-slate-200"
                )}
                    onClick={() => setSearchMethod("2")}
                >
                    <h1 className="text-center text-xl font-bold">Consultar veículo</h1>
                    <p className="font-bold text-blue-500">R$ {prices?.api_2 || "---"}</p>
                    <div className='hidden md:block'>
                        <ul className="my-3 flex flex-col text-xs">
                            <li>- Chassi</li>
                            <li>- Renavam</li>
                            <li>- Motor</li>
                            <li>- Informações Cadastrais</li>
                            <li>- Restrições</li>
                            <li>- Débitos</li>
                            <li>- Multa</li>
                            <li>- Ano de Licenciamento</li>
                            <li>- Recalls Pendentes</li>
                        </ul>
                    </div>
                    <div className='text-xs block md:hidden'>
                        <span>Chassi, Renavam, Motor, Informações Cadastrais, Restrições, Débitos, Multa, etc...</span>
                    </div>
                </div>
                <div className={cn(`flex h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
                    searchMethod == "3" && "bg-slate-200"
                )}
                    onClick={() => setSearchMethod("3")}
                >
                    <h1 className="text-center text-xl font-bold">Consultar Leião</h1>
                    <p className="font-bold text-blue-500">R$ {prices?.api_3 || "---"}</p>
                    <div className='hidden md:block'>
                        <ul className="my-3 flex flex-col text-xs">
                            <li>- Leiloeiro</li>
                            <li>- Chassi</li>
                            <li>- Remarcação de chassi</li>
                            <li>- Patio</li>
                            <li>- Datas</li>
                            <li>- Dados do veículo</li>
                        </ul>
                    </div>
                    <div className='text-xs block md:hidden'>
                        <span>Leiloeiro, Chassi, Remarcação de chassi, Patio, Datas, Dados do veículo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchsMethod;