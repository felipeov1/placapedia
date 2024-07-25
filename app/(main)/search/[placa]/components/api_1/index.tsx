"use client";

import React, { useEffect, useState } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import CarInformationsSlide from './placa-informations';
import Loading from '@/components/loading';
import axios from 'axios';

function Api1Informations({ placa }: { placa: string }) {

    const [data, setData] = useState<any[]>([]);
    const [withoutData, setWithoutData] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://wdapi2.com.br/consulta/${placa}/${process.env.NEXT_PUBLIC_TOKEN_1}`);
            if (!res.data) {
                setWithoutData(true);
            }
            setData(res.data);
        };
        getData();
    }, [placa]);

    if (!data) {
        return (
            <Loading />
        );
    };

    if (withoutData) {
        return (
            <Loading text='Não foi possivel encontrar o veiculo que deseja, por favor entre em contato com o suporte' />
        );
    };

    return (
        <div className='flex flex-col gap-2 max-w-[95%] lg:max-w-[1020px] min-w-[80%]'>
            <h1 className='font-semibold text-xl'>Dados Pesquisa 1.0</h1>
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

            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Restrições</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <RestricoesInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}

            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Licenciamento</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <LicenciamentoInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}

            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Gravame</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <GravameInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}

            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-5">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Debitos do veículo</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <DebVeiculoInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}

            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-6">
                    <AccordionTrigger>
                        <h1 className='font-light text-xl'>Comunicação de venda</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <VendaInformations data={data} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}
        </div>
    );
};

export default Api1Informations;