"use client";

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AppContext } from '@/context/context';
import { cn } from '@/lib/utils';
import { Text, HandCoins, ArrowDownToLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast"
import Loading from '@/components/loading';


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

    const { toast } = useToast();
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [userData, setUserData] = useState<IData | null>(null);
    const [saldo, setSaldo] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getValueRest = useCallback(async () => {
        try {
            const saldo = await axios.post('https://api-v2.anycar.com.br/integracao/saldo', {
                apiKey: process.env.NEXT_PUBLIC_TOKEN_2!
            });
            setSaldo(saldo.data.dados.valor);
        } catch (error) {
            toast({
                title: 'Não foi possivel achar o saldo',
                description: 'Houve um erro ao tentar consultar o saldo da conta!'
            });
        }
    }, [toast]);

    const filteredHistoric = userData && userData.historic.filter(item =>
        item.placa.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDonwload = (pdf: string) => {
        if (!pdf) {
            toast({
                title: 'Ops! Sem arquivo PDF',
                description: 'Parece que ouve algo de ruim e não conseguimos salvar o arquivo PDF da sua busca!'
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
                }
                if (res.email == 'admin_placapedia@placapedia.com') {
                    await getValueRest();
                }
                setUserData(res);
                localStorage.removeItem('result');
                localStorage.removeItem('payment');
                localStorage.removeItem('pdf');
            }
        }
        getUser();
    }, [user, toast, getValueRest]);

    if (!user) {
        return;
    };

    if (!userData) {
        return (
            <Loading />
        )
    };

    return (
        <div className='pb-9'>
            <Dialog>
                {/* TITLE */}
                <div className='flex flex-col gap-4 w-full px-3'>
                    <div>
                        <h1 className='text-xl lg:text-2xl font-bold'>Olá <strong>{userData && userData.name?.split(' ')[0]}</strong>, o que você quer ver aqui hoje?</h1>
                        <p className='font-light'>Seu histórico de pesquisa</p>
                    </div>
                    <div className='flex flex-col items-start md:flex-row md:items-center'>
                        <DialogTrigger>
                            <Button className='mt-3 md:mt-0 flex items-center gap-1 transition-transform hover:scale-105' variant="placapedia"><Text /> Ver meus dados</Button>
                        </DialogTrigger>
                        <Button onClick={() => router.push('/')} className='md:ml-5 mt-3 md:mt-0 flex items-center gap-1 transition-transform hover:scale-105' variant="placapedia">Pesquisar placa</Button>
                        {userData.email === 'admin_placapedia@placapedia.com' && (
                            <Button onClick={() => router.push("/home/prices")} className='mt-3 md:ml-5 md:mt-0 flex items-center gap-1 transition-transform hover:scale-105' variant="placapedia"><HandCoins />Mudar preços</Button>
                        )}
                    </div>
                </div>
                {/* SEARCH */}
                <div className='flex items-center justify-end mt-10'>
                    <div>
                        <Label htmlFor='search'>Pesquisar histórico</Label>
                        <Input className='w-full md:w-72' type='text' placeholder='PLACA/CHASSI' id='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </div>
                {/* HISTORIC */}
                <div className='w-full flex items-center justify-center'>
                    <div className='mt-14 max-w-[90%] md:max-h-[400px] overflow-y-auto pb-4'>
                        <Table className='w-full md:w-[700px] text-center'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-24 md:w-[100px] text-center">Placa/Chassi</TableHead>
                                    <TableHead className='text-center'>Status</TableHead>
                                    <TableHead className='text-center'>Data</TableHead>
                                    <TableHead className='text-center'>Arquivo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredHistoric && filteredHistoric.slice(0).reverse().map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.placa}</TableCell>
                                        <TableCell className={cn(item.wasPay ? 'text-green-500' : 'text-red-500')}>
                                            {item.wasPay ? 'Pago' : 'Não Pago'}
                                        </TableCell>
                                        <TableCell>{formatDate(item.date)}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDonwload(item.pdf)}>
                                                <a href={item.pdf}>
                                                    <span className='hidden md:block'>Download PDF</span>
                                                    <span className='block md:hidden'><ArrowDownToLine /></span>
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredHistoric && filteredHistoric.length <= 0 && (
                            <h2 className='text-center mt-2'>Você não tem histórico</h2>
                        )}
                    </div>
                </div>
                {/* MODAL INFO */}
                <DialogContent className='w-[90%] rounded-md md:w-full'>
                    <DialogHeader>
                        <DialogTitle className='text-[#4285F4]'>MEUS DADOS</DialogTitle>
                        <span className='text-sm font-light'>Seus dados estão seguros conosco!</span>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Label htmlFor='name'>Nome</Label>
                                <Input type='text' id='name' disabled value={userData ? userData.name : ''} />
                            </div>
                            <div className='mt-5'>
                                <Label htmlFor='name'>E-mail</Label>
                                <Input type='email' id='name' disabled value={userData ? userData.email : ''} />
                            </div>
                            {
                                userData.email === 'admin_placapedia@placapedia.com' && (
                                    <div className='mt-5'>
                                        <Label htmlFor='name'>Valo restante da api anyCar</Label>
                                        <Input type='email' id='name' disabled value={saldo ? saldo : ''} />
                                    </div>
                                )
                            }
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default HomePage;