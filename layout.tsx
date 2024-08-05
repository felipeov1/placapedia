import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/context";
// import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://placapedia.com'),
  title: "Placapedia - Descubra Tudo Sobre o Seu Veículo com Apenas a Placa!",
  description: "A Solução Completa para Consulta Veicular! Obtenha informações detalhadas sobre chassi, Renavam, multas, histórico de furtos e muito mais, tudo com apenas a placa do veículo.",
  keywords: ['placa', 'veículo', 'procurar veículo', 'procurar placa', 'informações de veículo', 'informações de placa', 'informações de carros'],
  openGraph: {
    images: [{ url: '/logo.png', alt: 'Placapedia' }], // Será 'https://placapedia.com/logo.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <meta name="google-site-verification" content="UVG3ZFL2Z1ANRj0rgv_ZSit8kwRBfa1DKUTAJ621Mes" />
      </Head>
      {/* <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5616238894896233"
          crossOrigin="anonymous"
        ></Script>
      </head> */}
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
