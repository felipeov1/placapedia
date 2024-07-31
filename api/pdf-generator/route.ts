import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import { drawPDF } from '@/utils/drawPDF';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/firebase/conn';
// https://pdf-lib.js.org/

const generatePDF = async ({ placa, api, data }: { placa: string, api: string, data: any }) => {

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { height } = page.getSize()

    const jpgImage = await pdfDoc.embedPng('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAADAFBMVEVnf4YDBRGc7/Z3h5eHmaMfNUcSKDgVJDIrM0R+jp2BkZ0eMkQDDxyWqLEbLUEWLDsFFyVxgY4LHC0JErsNIDBpeYYaKDsgMDxHVmOnucK1w83s//+LnakAEB/w/P1WZXEhNUP1+/wtO0Ric4HE0tYkO0w0Q02DlaWsvccxRFuwwMymtb4tZoxsfo07TVzX4+eUo63O29/K1tuZq7hYi5q3yNJeb3zp8vjF/v/L3Odca3fW5O52ho4oYIbU3+NMXGbm9//Z6euhsryfrroqPVF/lZ42R1bj7fEjNkozbZTP4Ob3+fnu9Pi8zdbv+v06ZoTh5ut6ipmTqLtyhJR6hpIhQF48dpzAy9Dk9PzE1eDd9P4aKTImUXTL3fEjNkcnSmbU6PJAqNhh0O8cKT5AeqVt3fo/U2JCSlCnuMk3SFY7TFsABxcCEibi7/oRICbI2OPy9/s5cphQYWxKu+ckVYe90N0DECOQorPEz9xJZ4UmWX8eSHC5x8uzvMcfSpEdJDX5//950u1te4dCUVm3y9sqYpOessft8PQ9bIsiM0c5T1NLd5bAxc04Rlnc6vV7jZLK2do3e5IvQU6txNnl8fcfQV8iWo7Y7P20xNoyWHUXP4vM4u/j/v9PtdRDn9TR/v9uyOkhMEMoW2w6SVdamrZbYWkmcqgRIzUUJz0TUXOlvdJps7192Oq73vRxvtowfbe+6fpZkK6yub8sP05Dh7WCi5sYO2CGiIwWIjNRnKpZw+MLXIFl1PAgQZdcqNJkpsOqtcO1u8QZKTXp9vsGGS/h4uJ1c3a01esnaoQiZHUvTHBGhp9FYH04kMRBnMCEjZg+lcIrZaLB8v0zNz7x///3//+cmZ0eQmiQkpkjN0nn9Pnf7PwmY4Y9st6p8f9qeYqJ1vKI4foMGS1adH98gI6Alqq+zt07XnlufYsWJjkSRWR6mKPCzdbf2NgqSFEdMkWTp7woQVGNnLBtkqqe1/ZrmLROdJULExwtXp2ou9CDe4AnCgAXAAMAAgBHcExHcEygeD0ZAAABAHRSTlMCAQH//wP//wr/////////////Af///////////3T//v//////////////////8f//////Gv////////7///////7///7/9v////////////////8d////+///////zP/+///i//7//////2L+/f//////////bv////////8b4///Hv///////7f////y/P//7fH/A6D//2P/Fv///////vya9f7F//z78f8W///+/v///97+/9P/yhf/Fv8Z/P8RMIEq/f7//+7x/vEU//8L////SA4a/8j/5Dbn8f//e/7+55YVgkr/CO3vUN76MfCBgOOU///f3P14///e/gAAgWYIxgAACgFJREFUeNrs2Hlck/cdwHHC85DHHE8uE3IQSUhCEgghl4mGhEAISMxIJDDGERSslEtuuaphkyGHA4GKyhxUcVqwtt5at25T1/Kam0c9Vp2dR9XW2XZ9tbuvf7Lf84i6/jX/eKT/5MNfvF688n3n+/x+XBGhb7iIMCAMCAPCgDAgDAgDwoAwIAwIA8KAMCAMCAMIfr3IyAg80jcCiIx6Njcqcv4B2Pht19/7JdYHIRJpvgFRoU/e3Xx8q4wfCAT2fPjx2VDk/AKiQr99kCARpAmqlFVVQPH68wkIA5BCl/8Jrews7Bzq0sAwm7KM/xEwzSMALEBmyzw5pHGhepinlLHrXp/fMxAVaq+q9+tFXcc0GXZqShpFevxsiDTPAJvNXBzUW6rocgqbwt/6XIfguQEkUmRk5MLIhV/ryackDLCoxxYchXukUoRnh/Ih5tbFBAJI/+froiLABpQOs0JGt6NuvQoAGFu//TyvHvG8368WXPwZ1o8e9wus7z7t4kJsA0qb2YvWNnA4bAjfAIEA0raP/vHqhQsXXn3cr0G3b/8G9MbtN7A+X/VlKLSoZtgrarS68pWIBNKyyZnEASJCfz16qPvln4NewnoH9Bre6tW7QJeuJH3+JQbo9LrEKAprKRhgL2GAiNAfjx66//KzXppr3Vy7dp1e/mcAsFmL0xA+EqgDzwBiJBMGiAp9fOZe91v379+79xaoG29q6p11r627c+fOarCF96+c+B22gcJgUC8RaDso+Votedn3iQP8eF/31N3doKX/09273VPgGYD5U9OXMEBtUaHhGBIIcC16CtGA97sPLY3ZGIMXi3/ETE5O7t79tzNXVq++ND19ogIAfpCtMKQhGhebA85APsGAqUPXYjbGxn3raXFxsbHjk5NHTh++cunw9GEM0OMcNcp4na5qhK3i+Zl7iQRceQoAc7EAIC5uiS+2ZOm+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');

    // Gerando imagem
    page.drawImage(jpgImage, {
        x: 25,
        y: height - 100,
        width: 100,
        height: 100,
        opacity: 1,
    });

    // URL
    page.drawText('https://placapedia.com', {
        x: 120,
        y: height - 40,
        size: 12
    });
    // Data
    page.drawText(`Data: ${new Date().toLocaleString()}`, {
        x: 120,
        y: height - 60,
        size: 12,
        color: rgb(0, 0, 0)
    });

    // Titulo
    page.drawText(`Placa do Veículo: ${placa}`, {
        x: 50,
        y: height - 100,
        size: 18,
        color: rgb(0, 0, 0)
    });

    let type = '';
    if (api == '1') {
        type = 'Consulta 1.0';
    } else if (api == '2') {
        type = 'Consulta Veículo';
    } else {
        type = 'Consulta Leilão';
    }

    // Tipo de pesquisa
    page.drawText(type, {
        x: 300,
        y: height - 100,
        size: 18,
        color: rgb(0, 0, 0)
    });

    // Impremir todos os dados no pdf
    await drawPDF(api, page, pdfDoc, data);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

export async function POST(req: NextRequest) {

    const body = await req.json();

    if (!body) {
        return NextResponse.json({ erro: 'Not body found!' }, { status: 400 });
    }

    if (!body.placa) {
        return NextResponse.json({ erro: 'The attribute placa is required!' }, { status: 400 });
    }

    if (!body.api) {
        return NextResponse.json({ erro: 'The attribute api is required!' }, { status: 400 });
    }

    if (!body.data) {
        return NextResponse.json({ erro: 'The attribute data is required!' }, { status: 400 });
    }

    try {

        const pdfBytes = await generatePDF({ placa: body.placa, api: body.api, data: body.data });

        const metadata = {
            contentType: 'application/pdf',
        };
        const storageRef = ref(storage, `${body.placa + '-' + new Date().toDateString()}.pdf`);
        await uploadBytes(storageRef, pdfBytes, metadata);
        const url = await getDownloadURL(storageRef)

        return NextResponse.json({ url }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro on server', msg: error }, { status: 500 });
    }

}