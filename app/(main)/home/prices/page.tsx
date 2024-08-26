"use client";

import React, { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Timestamp } from 'firebase/firestore';
import { AppContext } from '@/context/context';
import { getUserByIDInDatabase, updatePricesInDatabase, getPricesInDatabase } from '@/firebase/services';
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

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
            setAlertMessage('Valores editados com sucesso. Verifique os novos valores na página principal.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setAlertMessage('Erro ao tentar editar preços. Desculpe, houve um erro. Tente mais tarde, se não conseguir, edite diretamente no banco de dados.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const res = await getUserByIDInDatabase(user);

                if (!res || !res.userId) {
                    setAlertMessage('Desculpe, houve um erro ao tentar acessar seu usuário. Tente mais tarde!');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                    return;
                };

                const pricesValues = await getPricesInDatabase('txhDtXbyGm5o1k5S2TLO');
                setSearch_02Old(pricesValues.label_api_2);
                setSearch_03Old(pricesValues.label_api_3);

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
            <div className='text-center mt-5'>
                <div className='spinner-border' role='status'></div>
                <p className='visually-hidden text-dark'>Carregando...</p>
            </div>
        );
    };

    if (userData.email !== 'admin_placapedia@placapedia.com') {
        return;
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <div className='w-full max-w-4xl p-6 bg-white rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <h1 className='text-2xl font-bold mb-4 text-center'>Mudar Preço das Consultas</h1>
                    <p className='text-sm mb-5 text-center'>Lembre-se de sempre colocar 00 nos valores mesmo sendo um valor inteiro, ex: R$ 100,00 <br /> <span className='text-danger'>Atenção: Não coloque nada além de números</span></p>

                    <div className="container text-center">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            <div className="col">
                                <div className="mb-3">
                                    <Label htmlFor='2_old' className="form-label">Consulta 2.0 Valor Antigo</Label>
                                    <Input type='text' className="form-control" placeholder='3,50' id='2_old' value={search_02Old} onChange={e => setSearch_02Old(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Label htmlFor='1' className="form-label">Consulta 2.0</Label>
                                    <Input type='text' className="form-control" placeholder='3,50' id='1' value={search_02} onChange={e => setSearch_02(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Label htmlFor='3_old' className="form-label">Consulta Leilão Valor Antigo</Label>
                                    <Input type='text' className="form-control" placeholder='3,50' id='3_old' value={search_03Old} onChange={e => setSearch_03Old(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <Label htmlFor='3' className="form-label">Consulta Leilão</Label>
                                    <Input type='text' className="form-control" placeholder='3,50' id='3' value={search_03} onChange={e => setSearch_03(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 d-flex justify-content-end gap-3'>
                            <Button type='button' onClick={() => router.replace('/home')} className="btn btn-return">Voltar</Button>
                            <Button variant="placapedia" type='submit' className="btn btn-edit">Editar</Button>
                        </div>
                    </div>
                </form>
            </div>

            {showAlert && (
                <div className="alert alert-danger fixed bottom-0 end-0 m-3" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default Prices;
