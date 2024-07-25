import React from 'react';
import { NotebookText, ShieldBan, TrafficCone } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion"

type Props = {
    variants: {
        hidden: { y: number, opacity: number },
        visible: {
            y: number,
            opacity: number
        }
    }
};

function Cards() {

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className='md:max-w-[800px] w-full flex items-center justify-center gap-3'
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="w-40 h-40 bg-slate-100 p-1 rounded-sm flex flex-col items-center" variants={item}>
                <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-300" />
                    <NotebookText className="w-6 h-6 text-blue-500 absolute" />
                </div>
                <h3 className="text-base font-bold text-blue-900 mt-1">Dados cadastrais</h3>
                <p className="text-xs font-light text-center text-blue-500 mt-1">Dados de cadastro do veículo como Renavam, Chassi, motor, ano, modelo, cor e muito mais.</p>
            </motion.div>

            <motion.div className="w-40 h-40 bg-slate-100 p-1 rounded-sm flex flex-col items-center" variants={item}>
                <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-300" />
                    <ShieldBan className="w-6 h-6 text-blue-500 absolute" />
                </div>
                <h3 className="text-base font-bold text-blue-900 mt-1">Restrições</h3>
                <p className="text-xs font-light text-center text-blue-500 mt-1">Veja se o carro que você tem interrese tem algum tipo de restrição.</p>
            </motion.div>

            <motion.div className="w-40 h-40 bg-slate-100 p-1 rounded-sm flex flex-col items-center" variants={item}>
                <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-300" />
                    <TrafficCone className="w-6 h-6 text-blue-500 absolute" />
                </div>
                <h3 className="text-base font-bold text-blue-900 mt-1">Multa</h3>
                <p className="text-xs font-light text-center text-blue-500 mt-1">Te oferecemos também a opção de ver se tem algum débito para você não ser pego de surpresa.</p>
            </motion.div>

            <motion.div className="w-40 h-40 bg-slate-100 p-1 rounded-sm flex flex-col items-center" variants={item}>
                <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-300" />
                    <Image src="/ladrao.svg" alt="ladrão" width={31} height={31} className="absolute" />
                </div>
                <h3 className="text-base font-bold text-blue-900 mt-1">Furto/Roubo</h3>
                <p className="text-xs font-light text-center text-blue-500 mt-1">Tenha acesso a informações e descubra se o carro tem algum B.O</p>
            </motion.div>

        </motion.div>
    );
};

export default Cards;