"use client";

import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import $ from 'jquery'; // Importar jQuery
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();
    const { user, signOut } = useContext(AppContext);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.remove('navbar-transparent');
                    navbar.classList.add('navbar-colored');
                } else {
                    navbar.classList.remove('navbar-colored');
                    navbar.classList.add('navbar-transparent');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = () => {
        signOut();
        router.push('/');
    };

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light navbar-transparent fixed-top p-0">
            <div className="container">
                <Link className="navbar-brand mx-auto" href="/">
                    <Image src="/logo.svg" alt="Logo" height={45} width={200} />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-lg-center" id="navbarNav">
                    <ul className="navbar-nav">
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" href="/home">Minha Conta</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Consultar Veículo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contato</Link>
                        </li>
                        {!user && (
                            <li className="nav-item">
                                <Link className="nav-link" href="/login">Login</Link>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <span onClick={handleClose} className="nav-link cursor-pointer">Sair</span>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="btns-acess">
                    {!user && (
                        <Link href="/pagina-de-login" className="btn btn-primary" style={{ fontWeight: 500 }}>
                            <i className="fa-solid fa-user" style={{ fontWeight: 500 }}></i> Fazer Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
