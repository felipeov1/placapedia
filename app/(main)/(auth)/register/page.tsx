"use client";

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setAlertMessage('Preencha todos os dados para se cadastrar: nome, email e senha.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        if (password !== confirmPassword) {
            setAlertMessage('As senhas não são iguais.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        signUp({ name, email, password });
        router.replace('/home');
    };

    const handleGoogleLogin = async () => {
        const res = await createUserWithGoogle();
        if (!res) {
            setAlertMessage('Erro ao tentar fazer login! Tente novamente mais tarde.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        localStorage.setItem("user", res);
        setUser(res);
        router.replace('/home');
    };

    return (
        <div className='container w-100 d-flex align-items-center justify-content-center min-vh-90 mt-4'>
            <div id='containerRegister' className=' w-md-50 p-4 p-md-5 border rounded shadow-sm bg-light'>
                {showAlert && (
                    <div className="alert alert-danger position-fixed bottom-0 end-0 m-3" role="alert">
                        {alertMessage}
                    </div>
                )}
                <div className='text-center mb-4'>
                    <h1 className='h3 font-weight-bold'>Criar minha conta</h1>
                    <p className='text-muted'>Digite seus dados para se cadastrar.</p>
                </div>

                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor='name'>Nome</Label>
                        <Input
                            type='text'
                            placeholder='Nome Completo'
                            id='name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className='form-control'
                        />
                    </div>
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
                    <div>
                        <Label htmlFor='confirmPassword'>Confirme sua senha</Label>
                        <Input
                            type={seePassword ? 'text' : 'password'}
                            placeholder='Repita sua senha'
                            id='confirmPassword'
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <Link className='d-block text-center mb-3 text-black' href="/login">Já tenho conta!</Link>
                    <Button id='btn-enter-members' type='submit' variant="placapedia" className='w-100'>Cadastrar</Button>
                </form>

                <div className='d-flex flex-column align-items-center '>
                    <Separator className='my-3' />
                    <span className='bg-white px-3 rounded-pill shadow-sm'>Cadastrar com</span>
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
                    <a href="#" className='text-black'>Termos de Serviço e Política de Privacidade</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
