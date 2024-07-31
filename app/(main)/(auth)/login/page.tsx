"use client";

import React, { FormEvent, useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { createUserWithGoogle } from '@/firebase/services';
import { toast } from '@/components/ui/use-toast';

function LoginPage() {
    const router = useRouter();
    const { signIn, placa, user, setUser } = useContext(AppContext);
    const [seePassword, setSeePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!email || !password) {
            toast({
                title: 'Preencha os dados',
                description: 'Preencha todos os dados para fazer login, email e senha.'
            });
            return;
        }
        signIn({ email, password });
        router.replace('/home');
    };

    const handleGoogleLogin = async () => {
        const res = await createUserWithGoogle();

        if (!res) {
            toast({
                title: 'Erro ao tentar fazer login!',
                description: 'Desculpe, houve um erro, tente novamente mais tarde.'
            });
            return;
        }

        localStorage.setItem("user", res);
        setUser(res);
        router.replace('/home');
    };

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    return (
        <div className=' d-flex align-items-center justify-content-center min-vh-100 mt-4'>
            <div className='w-80 w-md-50 p-4 p-md-5 border rounded shadow-sm bg-light'>
                <div className='text-center mb-5'>
                    <h1 className='h3 font-weight-bold'>Acessar conta</h1>
                    <p className='text-muted'>Digite seu email e senha para acessar a área de membros.</p>
                </div>

                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            type='email'
                            placeholder='email@dominio.com'
                            id='email'
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <div>
                        <Label htmlFor='password'>Senha</Label>
                        <Input
                            type={seePassword ? 'text' : 'password'}
                            placeholder='Insira a senha'
                            id='password'
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='form-control'
                        />
                        <div className='d-flex justify-content-end mt-1'>
                            <p onClick={() => setSeePassword(!seePassword)} className='cursor-pointer text-dark'>
                                {seePassword ? 'Ocultar senha' : 'Ver senha'}
                            </p>
                        </div>
                    </div>
                    <Link className='d-block text-center mb-3 text-dark' href="/register">Não tenho conta!</Link>
                    <Button id='btn-enter-members' type='submit' variant="placapedia" className='w-100'>Entrar</Button>
                </form>

                <div className='d-flex flex-column align-items-center'>
                    <Separator className='my-4' />
                    <span className='bg-white px-3 py-1 rounded-pill shadow-sm'>Ou continuar com</span>
                </div>

                <div className='d-flex justify-content-center gap-3 mt-4'>
                    <Button id='btn-google' onClick={handleGoogleLogin} variant="ghost" className='py-3'>
                        <Image src="/google.svg" alt="google" width={40} height={40} />
                    </Button>
                    {/* <Button variant="ghost" className='py-3'>
                        <Image src="/facebook.svg" alt="facebook" width={40} height={40} />
                    </Button> */}
                </div>

                <p className='text-center mt-4 text-muted'>
                    Ao clicar em continuar, você concorda com nossos <br />
                    <a href="#" className='text-dark'>Termos de Serviço e Política de Privacidade</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;