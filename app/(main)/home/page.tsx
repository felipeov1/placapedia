"use client";

import React, { useContext, useState, useCallback, useEffect } from 'react';
import { AppContext } from '@/context/context';
import { getUserByIDInDatabase, IUser } from '@/firebase/services';
import { Timestamp } from 'firebase/firestore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type IData = {
    name: string,
    email: string,
    historic: {
        placa: string,
        wasPay: boolean,
        date: Timestamp,
        pdf: string
    }[],
    userId: string
};

// Função para converter Timestamp para uma string legível
const formatDate = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // Formatação de data e hora
};

function HomePage() {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [userData, setUserData] = useState<IData | null>(null);
    const [saldo, setSaldo] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showInfoBox, setShowInfoBox] = useState<boolean>(false);

    const getValueRest = useCallback(async () => {
        try {
            const saldo = await axios.post('https://api-v2.anycar.com.br/integracao/saldo', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!
            });
            setSaldo(saldo.data.dados.valor);
        } catch (error) {
            setAlertMessage('Houve um erro ao tentar consultar o saldo da conta!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }, []);

    const filteredHistoric = userData && userData.historic.filter(item =>
        item.placa.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownload = (pdf: string) => {
        if (!pdf) {
            setAlertMessage('Parece que houve um problema e não conseguimos salvar o arquivo PDF da sua busca!');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const res = await getUserByIDInDatabase(user);
                if (!res || !res.userId) {
                    setAlertMessage('Desculpe, houve um erro ao tentar acessar seu usuário, tente mais tarde!');
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                    return;
                }
                if (res.email === 'admin_placapedia@placapedia.com') {
                    await getValueRest();
                }
                setUserData(res);
                localStorage.removeItem('result');
                localStorage.removeItem('payment');
                localStorage.removeItem('pdf');
            }
        };
        getUser();
    }, [user, getValueRest]);

    if (!user) {
        return null;
    };

    if (!userData) {
        return (
            <div className='text-center mt-5'>
                <div className='spinner-border' role='status'></div>
                <p className='visually-hidden text-dark'>Carregando...</p>
            </div>
        );
    };

    return (
        <div className='container-fluid boxSearch'>
            {/* Alert */}
            {showAlert && (
                <div className="alert alert-danger position-fixed bottom-0 end-0 m-3" role="alert">
                    {alertMessage}
                </div>
            )}
            {/* TITLE */}
            <div className='flex flex-column gap-4 w-100 px-3 mb-4'>
                <div>
                    <h1 className='title-history-page'>Olá <strong>{userData && userData.name?.split(' ')[0]}</strong>, veja seu histórico de pesquisas</h1>
                    <p className='description-history-page font-light'>Visualize o histórico completo das suas pesquisas e faça a gestão necessária</p>
                </div>
                <div className='container-search-history d-flex w-100 align-items-center'>
                    <input
                        className='input-serach-license-plate-history form-control w-20 md:w-72'
                        type='text'
                        placeholder='Buscar por placa/chassi'
                        id='search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className='container-buttons-action d-flex gap-2 ms-3 mt-3'>
                        <button
                            className='btn-function btn btn-primary flex items-center gap-1 transition-transform hover:scale-105'
                            onClick={() => setShowInfoBox(!showInfoBox)}
                        >
                            Ver meus dados
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className='btn-function btn btn-primary flex items-center gap-1 transition-transform hover:scale-105'
                        >
                            Pesquisar placa
                        </button>
                        {userData.email === 'admin_placapedia@placapedia.com' && (
                            <button
                                onClick={() => router.push("/home/prices")}
                                className='btn-function btn btn-primary flex items-center gap-1 transition-transform hover:scale-105'
                            >
                                Mudar preços
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <hr className='hr-hitory-page' />
            {/* HISTORIC */}
            <div className='container-fluid align-items-center justify-content-center'>
                <div className='mt-14 w-90 md:max-h-400 overflow-y-auto pb-4'>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th className="w-24 md:w-100 text-center">Placa/Chassi</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Data</th>
                                <th className='text-center'>Arquivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistoric && filteredHistoric.slice(0).reverse().map((item, index) => (
                                <tr key={index}>
                                    <td className="font-medium">{item.placa}</td>
                                    <td className={item.wasPay ? 'text-success' : 'text-danger'}>
                                        {item.wasPay ? 'Pago' : 'Não Pago'}
                                    </td>
                                    <td>{formatDate(item.date)}</td>
                                    <td>
                                        <button id="btn-download-pdf" className='btn' onClick={() => handleDownload(item.pdf)}>
                                            <a href={item.pdf}>
                                                Download PDF
                                            </a>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredHistoric && filteredHistoric.length <= 0 && (
                        <h2 className='text-center mt-2'>Você não tem histórico</h2>
                    )}
                </div>
            </div>
            {/* INFO BOX */}
            {showInfoBox && (
                <>
                    <div className="overlay" onClick={() => setShowInfoBox(false)}></div>
                    <div className="info-box">
                        <span className="close-icon" onClick={() => setShowInfoBox(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>                        
                        </span>
                        <h5 className="text-primary">MEUS DADOS</h5>
                        <div className='mt-3'>
                            <label htmlFor='name'>Nome</label>
                            <input className='form-control' type='text' id='name' disabled value={userData ? userData.name : ''} />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor='email'>E-mail</label>
                            <input className='form-control' type='email' id='email' disabled value={userData ? userData.email : ''} />
                        </div>
                        {userData.email === 'admin_placapedia@placapedia.com' && (
                            <div className='mt-3'>
                                <label htmlFor='saldo'>Valor restante da API AnyCar</label>
                                <input className='form-control' type='text' id='saldo' disabled value={saldo ? saldo : ''} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
