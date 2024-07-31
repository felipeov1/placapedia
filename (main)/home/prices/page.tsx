"use client";

import React, { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Timestamp } from 'firebase/firestore';
import { AppContext } from '@/context/context';
import { getUserByIDInDatabase, updatePricesInDatabase, getPricesInDatabase } from '@/firebase/services';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';

type IData = {
    name: string,
    email: string,
    historic: {
        placa: string,
        wasPay: boolean,
        date: Timestamp
    }[],
    userId: string
};

function Prices() {

    const { user } = useContext(AppContext);
    const router = useRouter();
    const [userData, setUserData] = useState<IData | null>(null);

    const [search_01Old, setSearch_01Old] = useState("");
    const [search_01, setSearch_01] = useState("");
    const [search_02Old, setSearch_02Old] = useState("");
    const [search_02, setSearch_02] = useState("");
    const [search_03Old, setSearch_03Old] = useState("");
    const [search_03, setSearch_03] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const obj = {
            label_api_1: search_01Old,
            api_1: search_01,
            label_api_2: search_02Old,
            api_2: search_02,
            label_api_3: search_03Old,
            api_3: search_03,
        };
        try {
            await updatePricesInDatabase('txhDtXbyGm5o1k5S2TLO', obj);
            toast({
                title: 'Valores editados com sucesso',
                description: 'Verifique os novos valores na pagina principal'
            });
        } catch (error) {
            toast({
                title: 'Erro ao tentar editar preços',
                description: 'Desculpe, houve um erro, tente mais tarde, se não conseguir, edite diretamento no banco de dados'
            });
        }
    };

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const res = await getUserByIDInDatabase(user);

                if (!res || !res.userId) {
                    toast({
                        title: 'Ops! Houve um erro.',
                        description: 'Desculpe houve um erro ao tentar acessar seu usuário, tente mais tarde!'
                    });
                    return;
                };

                const pricesValues = await getPricesInDatabase('txhDtXbyGm5o1k5S2TLO');
                setSearch_01Old(pricesValues.label_api_1);
                setSearch_02Old(pricesValues.label_api_2);
                setSearch_03Old(pricesValues.label_api_3);

                setSearch_01(pricesValues.api_1);
                setSearch_02(pricesValues.api_2);
                setSearch_03(pricesValues.api_3);

                setUserData(res);
                localStorage.removeItem('result');
                localStorage.removeItem('payment');
            }
        }
        getUser();
    }, [user]);

    if (!userData) {
        return (
            <Loading />
        )
    };

    if (userData.email !== 'admin_placapedia@placapedia.com') {
        return;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold'>Mudar Preço das consultas</h1>
                <p className='max-w-[500px] text-sm mb-5'>Lembre-se de sempre colocar 00 nos valores mesmo sendo um valor inteiro, ex: R$ 100,00 <br /> <span className='text-red-500'>Atenção: Não coloque nada além de números</span></p>
                {/* <div className='flex items-center gap-5'>
                    <div>
                        <Label htmlFor='1_old'>Consulta 1.0 Valor Antigo</Label>
                        <Input type='text' placeholder='3,50' id='1_old' value={search_01Old} onChange={e => setSearch_01Old(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='1'>Consulta 1.0</Label>
                        <Input type='text' placeholder='3,50' id='1' value={search_01} onChange={e => setSearch_01(e.target.value)} />
                    </div>
                </div> */}
                <div className='flex items-center gap-5'>
                    <div>
                        <Label htmlFor='2_old'>Consulta 2.0 Valor Antigo</Label>
                        <Input type='text' placeholder='3,50' id='2_old' value={search_02Old} onChange={e => setSearch_02Old(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='1'>Consulta 2.0</Label>
                        <Input type='text' placeholder='3,50' id='1' value={search_02} onChange={e => setSearch_02(e.target.value)} />
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <div>
                        <Label htmlFor='3_old'>Consulta Leilão Valor Antigo</Label>
                        <Input type='text' placeholder='3,50' id='3_old' value={search_03Old} onChange={e => setSearch_03Old(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor='3'>Consulta Leilão</Label>
                        <Input type='text' placeholder='3,50' id='3' value={search_03} onChange={e => setSearch_03(e.target.value)} />
                    </div>
                </div>
                <div className='mt-5 flex justify-end gap-3'>
                    <Button type='button' onClick={() => router.replace('/home')} variant="destructive">Voltar</Button>
                    <Button variant="placapedia" type='submit'>Editar</Button>
                </div>
            </form>
        </div>
    );
};

export default Prices;