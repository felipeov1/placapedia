import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { useReactToPrint } from "react-to-print";
import { Button } from './ui/button';

type Props = {
    children: React.ReactNode,
    placa: string,
    notFound: boolean,
    seeInfo: boolean
}

function Print({ children, placa, notFound, seeInfo }: Props) {

    const ref = useRef<any>(null);
    const [seeLogo, setSeeLogo] = useState(false);
    const formatedDate = () => {
        const today = new Date();

        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();

        return `${day}/${month < 10 ? '0' + month : month}/${year}`;
    }

    function delay(n: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        });
    };

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: `placapedia-carro-${placa}`,
        bodyClass: 'p-0',
    });
    const onShowImage = async () => {
        setSeeLogo(true);
        await delay(3);
    };

    return (
        <div ref={ref}>
            <div className='mt-5 flex w-full justify-between px-10 items-center'>
                {seeLogo && (
                    <div className='flex items-center gap-2'>
                        <Image src="/logo.svg" alt='logo' width={100} height={100} />
                        <div>
                            <p>www.placapedia.com</p>
                            <p>{formatedDate()}</p>
                        </div>
                    </div>
                )}
                {(notFound == false && seeInfo) && (
                    <Button
                        onClick={async () => {
                            await onShowImage()
                            handlePrint()
                        }}
                        className='bg-red-500 hover:bg-red-700'
                    >Salvar PDF</Button>
                )}
            </div>
            {children}
        </div>
    );
};

export default Print;