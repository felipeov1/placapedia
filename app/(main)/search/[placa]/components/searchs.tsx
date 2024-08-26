// "use client";

// import React, { useContext } from 'react';
// import { cn } from '@/lib/utils';
// import { AppContext } from '@/context/context';

// type Props = {
//     searchMethod: "1" | "2" | "3",
//     setSearchMethod: React.Dispatch<React.SetStateAction<"1" | "2" | "3">>
// };

// function SearchsMethod({ searchMethod, setSearchMethod }: Props) {

//     const { prices } = useContext(AppContext);

//     return (
//         <div>
//             <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
//                 {/* <div className={cn(`flex w-36 h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
//                     searchMethod == "1" && "bg-slate-200"
//                 )}
//                     onClick={() => setSearchMethod("1")}
//                 >
//                     <h1 className="text-center text-xl font-bold">Consulta 1.0</h1>
//                     <p className="font-bold text-blue-500">R$ {prices?.api_1}</p>
//                     <div className='hidden md:block'>
//                         <ul className="my-3 flex flex-col text-xs">
//                             <li>- Chassi</li>
//                             <li>- Renavam</li>
//                             <li>- Motor</li>
//                             <li>- Informações Cadastrais</li>
//                             <li>- Restrições</li>
//                         </ul>
//                     </div>
//                     <div className='text-xs block md:hidden'>
//                         <span>Chassi, Renavam, Motor, Informações Cadastrais, Restrições</span>
//                     </div>
//                 </div> */}
//                 <div className={cn(`flex h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
//                     searchMethod == "2" && "bg-slate-200"
//                 )}
//                     onClick={() => setSearchMethod("2")}
//                 >
//                     <h1 className="text-center text-xl font-bold">Consultar veículo</h1>
//                     <p className="font-bold text-blue-500">R$ {prices?.api_2 || "---"}</p>
//                     <div className='hidden md:block'>
//                         <ul className="my-3 flex flex-col text-xs">
//                             <li>- Chassi</li>
//                             <li>- Renavam</li>
//                             <li>- Motor</li>
//                             <li>- Informações Cadastrais</li>
//                             <li>- Restrições</li>
//                             <li>- Débitos</li>
//                             <li>- Multa</li>
//                             <li>- Ano de Licenciamento</li>
//                             <li>- Recalls Pendentes</li>
//                         </ul>
//                     </div>
//                     <div className='text-xs block md:hidden'>
//                         <span>Chassi, Renavam, Motor, Informações Cadastrais, Restrições, Débitos, Multa, etc...</span>
//                     </div>
//                 </div>
//                 <div className={cn(`flex h-44 md:h-72 cursor-pointer flex-col items-center rounded-md border bg-slate-100 p-3 shadow-md transition-colors hover:bg-slate-200`,
//                     searchMethod == "3" && "bg-slate-200"
//                 )}
//                     onClick={() => setSearchMethod("3")}
//                 >
//                     <h1 className="text-center text-xl font-bold">Consultar Leião</h1>
//                     <p className="font-bold text-blue-500">R$ {prices?.api_3 || "---"}</p>
//                     <div className='hidden md:block'>
//                         <ul className="my-3 flex flex-col text-xs">
//                             <li>- Leiloeiro</li>
//                             <li>- Chassi</li>
//                             <li>- Remarcação de chassi</li>
//                             <li>- Patio</li>
//                             <li>- Datas</li>
//                             <li>- Dados do veículo</li>
//                         </ul>
//                     </div>
//                     <div className='text-xs block md:hidden'>
//                         <span>Leiloeiro, Chassi, Remarcação de chassi, Patio, Datas, Dados do veículo</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchsMethod;

import React, { useContext } from 'react';
import { AppContext } from '@/context/context';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../search-page.css';


type Props = {
    searchMethod: "2" | "3"; // Removendo '1'
    setSearchMethod: React.Dispatch<React.SetStateAction<"2" | "3">>;
};

function SearchsMethod({ searchMethod, setSearchMethod }: Props) {
    const { prices } = useContext(AppContext);

    return (
        <div className="container-plan-option container-fluid mt-4">
            <h1 className="text-center mb-5">Escolha uma opção</h1> 
            <div className="container-cards-options d-flex justify-content-center">
                <div
                    className={`modalSelect selectVeichle col-12 col-md-6 mb-3 p-3  rounded cursor-pointer flex-wrap ${searchMethod === "2" ? 'border-select' : 'border-no-select'}`}
                    onClick={() => setSearchMethod("2")}
                >
                    <div className="d-flex align-items-start mb-2">
                        <input type="checkbox" checked={searchMethod === "2"} readOnly className="ckeck-box mr-2" />
                        <div>
                            <h3 className="mb-1 mt-4">Consultar veículo</h3>
                            <ul className="list-unstyled text-left">
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Renavam
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Motor
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Informações Cadastrais
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Restrições
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Débitos
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Multa
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Ano de Licenciamento
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-4'>
                                    Recalls Pendentes
                                </li>
                                <p className="priceModal font-weight-bold mb-2">R$ {prices?.api_2 || "---"}</p>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className={`modalSelect selectLeilao col-12 col-md-6 mb-3 p-3 border rounded cursor-pointer  ${searchMethod === "3" ? 'border-select' : 'border-no-select'}`}
                    onClick={() => setSearchMethod("3")}
                >
                    <div className="d-flex align-items-start mb-2">
                        <input type="checkbox" checked={searchMethod === "3"} readOnly className="ckeck-box mr-2" />
                        <div>
                            <h3 className=" mb-1 mt-4">Consultar Leilão</h3>
                            <ul className="list-unstyled text-left">
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Leiloeiro
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Remarcação de chassi
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Pátio
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Datas
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Dados do Veículo
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Lote
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-2'>
                                    Comitente
                                </li>
                                <li className='d-flex align-items-center justify-content-left mb-4'>
                                    Análise de Risco Detalhada
                                </li>
                                <p className="priceModal font-weight-bold mb-2">R$ {prices?.api_3 || "---"}</p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SearchsMethod;