"use client";

import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppContext } from '@/context/context';
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();
    const { user, signOut } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = () => {
        signOut();
        router.push('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light navbar-transparent fixed-top p-0">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <Image src="/logo-placapedia.png" alt="Logo" height={45} width={200} />
                </Link>

                <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={menuOpen} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-between ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Consultar Veículo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contato</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" href="/home">Minha Conta</Link>
                            </li>
                        )}
                    </ul>
                    <div className="btns-acess ms-auto">
                        {user ? (
                            <button id='btn-left' className="btn btn-secondary" style={{ fontWeight: 500 }} onClick={handleClose}>
                                Sair
                            </button>
                        ) : (
                            <>
                                <Link href="/register" id='btn-register' className="btn btn-secondary" style={{ fontWeight: 500 }}>
                                    <i className="fa-solid fa-user-plus" style={{ fontWeight: 500 }}></i> Registrar
                                </Link>
                                <Link href="/login" id='btn-login' className="btn btn-primary" style={{ fontWeight: 500 }}>
                                    <i className="fa-solid fa-user" style={{ fontWeight: 500 }}></i> Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
