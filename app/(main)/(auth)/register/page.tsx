"use client";

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { createUserWithGoogle } from '@/firebase/services';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

function RegisterPage() {

    const router = useRouter();
    const { signUp, setUser } = useContext(AppContext);
    const [seePassword, setSeePassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name ?? !email ?? !password) {
            toast({
                title: 'Preecha os dados',
                description: 'Preencha todos os dados para fazer login, nome, email e senha.'
            });
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Senhas incorretas!',
                description: 'As senhas não são iguais.'
            });
            return;
        }
        signUp({
            name,
            email,
            password
        });
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

    return (
        <div className='w-full mt-5 overflow-y-auto flex items-center justify-center'>
            <div className='max-w-[90%] md:max-w-[700px]'>

                <div className='text-center'>
                    <h1 className='text-xl font-bold'>Criar minha conta</h1>
                    <p className='font-light'>Digite seus dados para se cadastrar</p>
                </div>

                <form className='flex flex-col justify-center gap-5' onSubmit={handleSubmit}>
                    <div className='mt-5'>
                        <Label htmlFor='name'>Nome</Label>
                        <Input
                            type='text'
                            placeholder='Nome Completo'
                            id='name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            type='email'
                            placeholder='email@dominio.com'
                            id='email'
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                        />
                    </div>
                    <div>
                        <Label htmlFor='confirmPassword'>Confirme sua senha</Label>
                        <Input
                            type={seePassword ? 'text' : 'password'}
                            placeholder='Repita sua senha'
                            id='confirmPassword'
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div className='flex justify-end'>
                            <div>
                                <p onClick={() => setSeePassword(!seePassword)} className='cursor-pointer transition-colors hover:text-blue-400'>{
                                    seePassword ? 'Ocultar senhas' : 'Ver senhas'
                                }</p>
                            </div>
                        </div>
                    </div>
                    <Link className='text-center' href="/login">Já tenho conta!</Link>
                    <Button type='submit' variant="placapedia" className='w-full'>Cadastrar</Button>
                </form>

                <div className='flex flex-col items-center justify-center'>
                    <Separator className='mt-8' />
                    <span className='p-2 bg-white mt-[-20px]'>Cadastrar com</span>
                </div>

                <div className='flex items-center justify-center gap-3 mt-4'>
                    <Button onClick={handleGoogleLogin} variant="ghost" className='py-3'>
                        <Image src="/google.svg" alt="google" width={40} height={40} />
                    </Button>
                    {/* <Button variant="ghost" className='py-3'>
                        <Image src="/facebook.svg" alt="facebook" width={40} height={40} />
                    </Button> */}
                </div>

                <p className='text-center mt-4 mb-4'>Ao clicar em continuar, você concorda com nossos <br /> <a href="" className='text-blue-400'>Termos de Serviço e Política de Privacidade</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;