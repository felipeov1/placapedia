"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import CarInformationsSlide from './placa-informations';
import RestricoesInformations from './resticoes-informations';
import LicenciamentoInformations from './licenciamento-informations';
import GravameInformations from './gravame-informations';
import DebVeiculoInformations from './deb-veiculo-informations';
import VendaInformations from './venda-informations';
import axios from 'axios';
import Loading from '@/components/loading';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { addHistoric, getAuthToken, IHistoric } from '@/firebase/services';

function Api2Informations({ placa }: { placa: string }) {

    const initialized = useRef(false)
    const [data, setData] = useState<any>({});

    const historic = async ({ objHis }: { objHis: IHistoric }) => {
        const userId = localStorage.getItem('user');
        if (!userId) {
            throw new Error('User ID not found in local storage');
        }
        await addHistoric(userId, objHis);
    };

    const getAllInformations = useCallback(async () => {
        const wasSaved = localStorage.getItem('pdf');
        try {
            const res = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!,
                tipo: "estadual",
                placa: placa
            });
            setData(res.data.dados);
            if (!wasSaved) {
                const pdfCreator = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pdf-generator`, {
                    placa: placa,
                    api: "2",
                    data: res.data.dados
                });
                if (!pdfCreator.data.url) {
                    toast({
                        title: 'Erro ao salvar PDF',
                        description: 'Não podemos salvar o PDF no seu hístorico!'
                    });
                }
                const objHistoric = { wasPay: true, placa: placa, date: new Date(), pdf: `${pdfCreator.data.url!}` };
                await historic({ objHis: objHistoric });
                localStorage.setItem('pdf', 'true');
            }
        } catch (error) {
            toast({
                title: 'Houve um erro ao consultar dados',
                description: 'Houve um erro ao nos dados, se houver perdas, por favor entre em contato para o reenbolso.'
            });
        }
    }, [placa]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            getAllInformations();
        }
    }, [placa, getAllInformations]);

    if (!data) {
        return (
            <Loading />
        );
    };

    return (
        <div className='flex flex-col gap-2 max-w-[95%] lg:max-w-[1020px] min-w-[80%]'>
            <h1 className='font-semibold text-xl'>Dados Pesquisa 2.0</h1>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-6">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Comunicação de venda</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <VendaInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Dados do Veículo</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <CarInformationsSlide data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Restrições</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <RestricoesInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Licenciamento</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <LicenciamentoInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Gravame</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <GravameInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-5">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Debitos do veículo</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <DebVeiculoInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-6">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Dados de Faturamento do veículo</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='w-full h-full overflow-y-auto overflow-x-hidden'>
                            <Separator />
                            <div className='grid grid-cols-1 md:grid-cols-3 mt-3 mb-3'>
                                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                                    <h3 className='text-2xl text-blue-500 font-bold'>CNPJ/CPF do Faturado:</h3>
                                    <p>{data.cpfcnpjfaturado}</p>
                                </div>
                                <div className='flex flex-row gap-2 md:gap-0 md:flex-col items-center text-center md:text-left'>
                                    <h3 className='text-2xl text-blue-500 font-bold'>UF Faturado:</h3>
                                    <p>{data.uffaturado}</p>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Api2Informations;