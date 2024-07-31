'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CarInformationsSlide from './placa-informations';
import LeilaoInformationsAccordion from './leilao-informations';
import Loading from '@/components/loading';
import { toast } from '@/components/ui/use-toast';
import { addHistoric, IHistoric } from '@/firebase/services';

function LeilaoInformations({ placa }: { placa: string }) {

    const initialized = useRef(false)
    const [data, setData] = useState<any>(null);

    const historic = async ({ objHis }: { objHis: IHistoric }) => {
        const userId = localStorage.getItem('user');
        const resultSting = localStorage.getItem('result');
        const paymentString = localStorage.getItem('payment');

        if (!userId) {
            throw new Error('User ID not found in local storage');
        }

        if (resultSting || paymentString) {
            await addHistoric(userId, objHis);
        }
    };

    const getAllInformations = useCallback(async () => {
        const wasSaved = localStorage.getItem('pdf');
        try {
            const res = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!,
                tipo: "leilao",
                placa: placa
            });
            setData(res.data.dados);
            if (!wasSaved) {
                const pdfCreator = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/api/pdf-generator`, {
                    placa: placa,
                    api: "leilao",
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
            })
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
            <h1>Dados Pesquisa de Leilão</h1>
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
                        <h1 className='font-light text-xl'>Leilão</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <LeilaoInformationsAccordion data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default LeilaoInformations;