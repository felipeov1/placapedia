"use client";

import React, { useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Menu } from 'lucide-react';

import { AppContext } from '@/context/context';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';

function Header() {

    const router = useRouter();
    const { user, signOut } = useContext(AppContext);

    const handleClose = () => {
        signOut();
        router.push('/');
    };

    return (
        <Sheet>
            <div className='w-full flex justify-center bg-white h-20 shadow-sm z-50'>
                {/* DESKTOP */}
                <nav className='max-w-[1440px] flex items-center justify-between px-4 w-full'>
                    <Link href="/">
                        <Image src="/logo.svg" alt="logo" width={100} height={100} />
                    </Link>
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-10'>
                            {user && (
                                <li>
                                    <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/home">Minha Conta</Link>
                                </li>
                            )}

                            <li>
                                <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/">Consultar veiculo</Link>
                            </li>

                            {/* <li>
                                <Link className='font-bold text-placapedia transition-colors hover:text-placapedia_dark' href="/about">Sobre</Link>
                            </li> */}

                            <li>
                                <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/contact">Contato</Link>
                            </li>

                            {!user && (
                                <li>
                                    <Link className='font-bold text-blue-500 cursor-pointer transition-colors hover:text-blue-700' href="/login">Login</Link>
                                </li>
                            )}

                            {user && (
                                <li>
                                    <span onClick={handleClose} className='font-bold text-red-500 cursor-pointer transition-colors hover:text-red-600'>Sair</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* MOBILE */}
                    <div className='block md:hidden'>
                        <SheetTrigger><Menu /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <ul className='flex flex-col items-center gap-10 mt-10'>
                                    {user && (
                                        <li>
                                            <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/home">Minha Conta</Link>
                                        </li>
                                    )}

                                    <li>
                                        <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/">Consultar veiculo</Link>
                                    </li>

                                    {/* <li>
                                        <Link className='font-bold text-placapedia transition-colors hover:text-blue-700' href="/about">Sobre</Link>
                                    </li> */}

                                    <li>
                                        <Link className='font-bold text-blue-500 transition-colors hover:text-blue-700' href="/contact">Contato</Link>
                                    </li>

                                    {!user && (
                                        <li>
                                            <Link className='font-bold text-blue-500 cursor-pointer transition-colors hover:text-blue-700' href="/login">Login</Link>
                                        </li>
                                    )}

                                    {user && (
                                        <li>
                                            <span onClick={handleClose} className='font-bold text-red-500 cursor-pointer transition-colors hover:text-red-600'>Sair</span>
                                        </li>
                                    )}
                                </ul>
                            </SheetHeader>
                        </SheetContent>
                    </div>
                </nav>
            </div>
        </Sheet >
    );
};

export default Header;