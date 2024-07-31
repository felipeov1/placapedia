"use client";

import React, { useEffect, useRef } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { motion, useAnimation, useInView } from 'framer-motion';

function AboutSession() {

    const controls = useAnimation();
    const ref = useRef(null)
    const isInView = useInView(ref)

    const item = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <div
            id='about_section'
            className="w-full h-full overflow-x-hidden flex items-center justify-center px-10"
        >
            <motion.div
                className='w-full max-w-[1440px]'
                initial={"hidden"}
                animate={controls}
                variants={item}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
                ref={ref}
            >
                <div
                    className='w-full'
                >
                    <h1 className='text-2xl font-bold text-blue-500'>A placapedia oferece</h1>
                    <div className='mt-5'>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Relatórios detalhados</AccordionTrigger>
                                <AccordionContent>Histórico completo do veículo, incluindo: Situação: Roubo/furto, restrições, pendências judiciais, etc.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Características</AccordionTrigger>
                                <AccordionContent>Modelo, ano, cor, placa, quilometragem e muito mais.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Leilões</AccordionTrigger>
                                <AccordionContent>Participação em leilões e histórico de sinistro.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Proprietários</AccordionTrigger>
                                <AccordionContent>Dados do atual e anteriores proprietários.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Atendimento personalizado</AccordionTrigger>
                                <AccordionContent>Equipe de especialistas para esclarecer dúvidas e auxiliar na interpretação dos resultados.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Tecnologia de ponta</AccordionTrigger>
                                <AccordionContent>Ferramentas avançadas para garantir a precisão das informações.</AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Preço acessível</AccordionTrigger>
                                <AccordionContent>Investimento em tranquilidade com um custo que cabe no seu bolso.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutSession;