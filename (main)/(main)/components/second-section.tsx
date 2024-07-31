import React from 'react';
import Image from 'next/image';

import { NotebookText, ShieldBan, TrafficCone } from 'lucide-react';

function SecondSection() {
    return (
        <section id='second_section' className="w-full h-full px-5 flex flex-col items-center">
            <div className='max-w-[1140px] flex items-center justify-around'>
                <div className="hidden md:block w-[50%]">
                    <Image src="/second_car.png" alt="second_car" width={600} height={600} />
                </div>

                <div className="w-[100%] md:w-[50%]">
                    <h2 className="text-4xl mb-2 text-blue-500 text-center font-bold">Veja o que você consegue ver com nossas consultas!</h2>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center md:gap-x-5">
                            <div className="w-56 h-56 bg-slate-200 p-3 rounded-sm flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-300" />
                                    <NotebookText className="w-12 h-12 text-blue-500 absolute" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-500 mt-3">Dados cadastrais</h3>
                                <p className="text-sm font-light text-blue-500 mt-2">Dados de cadastro do veículo como Renavam, Chassi, motor, ano, modelo, cor e muito mais.</p>
                            </div>

                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-y-2 md:gap-y-0 md:gap-x-5">
                            <div className="w-56 h-56 bg-slate-200 p-3 rounded-sm flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-300" />
                                    <TrafficCone className="w-12 h-12 text-blue-500 absolute" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-500 mt-3">Multa</h3>
                                <p className="text-sm font-light text-blue-500 mt-2">Te oferecemos também a opção de ver se tem algum débito para você não ser pego de surpresa.</p>
                            </div>
                            <div className="w-56 h-56 bg-slate-200 p-3 rounded-sm flex flex-col items-center md:mt-10">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-300" />
                                    <Image src="/ladrao.svg" alt="ladrão" width={48} height={48} className="absolute" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-500 mt-3">Furto/Roubo</h3>
                                <p className="text-sm font-light text-blue-500 mt-2">Tenha acesso a informações e descubra se o carro tem algum B.O</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SecondSection;