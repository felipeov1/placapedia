import { PDFDocument, rgb, PDFPage, RGB } from 'pdf-lib';

const checkText = (txt: string, isMoney = false) => {
    if (txt) {
        return isMoney ? 'R$ ' + txt : txt;
    } else {
        if (isMoney) {
            return 'R$ 0,00'
        }
        return '---';
    }
};
const removeCpfFromName = (name: string) => {
    if (!name) {
        return name;
    }
    const splitName = name.split(' ').slice(1);
    const fullname = splitName.join(' ');
    return fullname;
};

export const drawPDF = async (api: string, page: PDFPage, pdfDoc: PDFDocument, data: any) => {
    const mainPage = page;
    if (api == '1') {
        // Implementação para API 1
    } else if (api == '2') {
        await api2(pdfDoc, mainPage, data);
    } else {
        await apiLeilao(pdfDoc, mainPage, data);
    }
};

const api2 = async (pdfDoc: PDFDocument, mainPage: PDFPage, data: any) => {
    let page = mainPage;
    let height = page.getHeight();

    const texts = [
        { text: 'COMUNICAÇÃO DE VENDA', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Data inclusão: ${checkText(data.datavenda)}` },
        { text: `- Doc. do comprador: ${checkText(data.cpfcnpjcomprador)}` },
        { text: `- Data da venda: ${checkText(data.datavenda)}` },
        { text: `- Comunicação de venda: ${checkText(data.ccomunicacaovenda)}` },

        { text: 'DADOS DO VEÍCULO', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Placa: ${checkText(data.placa)}` },
        { text: `- Chassi: ${checkText(data.chassi)}` },
        { text: `- Renavam: ${checkText(data.renavam)}` },
        { text: `- Restrição 1: ${checkText(data.outras_restricoes_01)}`, size: 9 },
        { text: `- Restrição 2: ${checkText(data.outras_restricoes_02)}`, size: 9 },
        { text: `- Restrição 3: ${checkText(data.outras_restricoes_03)}`, size: 9 },
        { text: `- Restrição 4: ${checkText(data.outras_restricoes_04)}`, size: 9 },
        { text: `- Municipio: ${checkText(data.municipio)}` },
        { text: `- UF: ${checkText(data.uf)}` },
        { text: `- Marca: ${checkText(data.marca)}` },
        { text: `- Modelo: ${checkText(data.modelo)}` },
        { text: `- Modelo Fab: ${checkText(data.marcamodelocompleto)}` },
        { text: `- Tipo: ${checkText(data.tipo)}` },
        { text: `- Carroceria: ${checkText(data.carroceria)}` },
        { text: `- Cor: ${checkText(data.cor)}` },
        { text: `- Categoria: ${checkText(data.veicategoria)}` },
        { text: `- Combustivel: ${checkText(data.combustivel)}` },
        { text: `- Potencia(CV): ${checkText(data.potencia)}` },
        { text: `- Capacidade de carga: ${checkText(data.capacidadecarga)}` },
        { text: `- Nome propretario: ${checkText(removeCpfFromName(data.pronome))}` },
        { text: `- Propretario anterior: ${checkText(data.pronomeanterior)}` },

        { text: 'RESTRIÇÕES', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Furto: ${checkText(data.resfurto)}` },
        { text: `- Guincho: ${checkText(data.resguincho)}` },
        { text: `- Administrativo: ${checkText(data.resadministrativa)}` },
        { text: `- Judicial: ${checkText(data.resjudicial)}` },

        { text: 'GRAVAME', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Financiamento: ${checkText(data.restricaofinan)}` },
        { text: `- Financeira: ${checkText(data.restricaonomeagente)}` },
        { text: `- Arrendatario: ${checkText(data.restricaoarrendatario)}` },
        { text: `- Data de inclusão: ${checkText(data.restricaodatainclusao)}` },

        { text: 'DEBITOS DO VEÍCULO', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Deb dersa: ${checkText(data.debdersa, true)}` },
        { text: `- Deb detran: ${checkText(data.debdetran, true)}` },
        { text: `- Deb cetesb: ${checkText(data.debcetesb, true)}` },
        { text: `- Deb PRF: ${checkText(data.s4hc4mbzw2vr, true)}` },
        { text: `- Deb Municipais: ${checkText(data.debmunicipais, true)}` },
        { text: `- Deb renainf: ${checkText(data.debrenainf, true)}` },
        { text: `- Deb Der: ${checkText(data.debder, true)}` },
        { text: `- Valor total de Multas: ${checkText(data.valortotaldebitomulta, true)}` },
        { text: `- Valor total de IPVA: ${checkText(data.debipva, true)}` },

        { text: 'FATURAMENTO DO VEÍCULO', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- CNPJ/CPF do Faturado: ${checkText(data.cpfcnpjfaturado)}` },
        { text: `- UF Faturado: ${checkText(data.uffaturado)}` },
    ];

    let yposiction = 130;

    texts.forEach((element) => {
        if (yposiction >= height - 50) {
            page = pdfDoc.addPage([595.28, 841.89]);
            height = page.getHeight();
            yposiction = 50;
        }

        page.drawText(element.text, {
            x: 50,
            y: height - yposiction,
            size: element.size || 12,
            color: element.rgb || rgb(0, 0, 0),
        });

        yposiction += 25;
    });
};

const apiLeilao = async (pdfDoc: PDFDocument, mainPage: PDFPage, data: any) => {
    let page = mainPage;
    let height = page.getHeight();

    const returnLeilao = () => {
        let result: { text: string, size?: number, rgb?: RGB }[] = [];
        data.leilao.registro.map((item: any, i: number) => {
            const leilaoArr = [
                { text: '--------' },
                { text: `- Leilão: ${i + 1}`, rgb: rgb(0.95, 0.1, 0.1) },
                { text: `- Leiloeiro: ${checkText(item.leiloeiro)}` },
                { text: `- Lote: ${checkText(item.lote)}` },
                { text: `- Data do Leilão: ${checkText(item.dataleilao)}` },
                { text: `- Situação do chassi: ${checkText(item.situacaogeraldochassi)}` },
                { text: `- Código geral do veículo: ${checkText(item.condicaogeraldoveiculo)}` },
                { text: `- Comitente: ${checkText(item.comitente)}` },
                { text: `- Patio: ${checkText(item.patio)}` },
                { text: `- Marca/Modelo: ${checkText(item.marcamodelo)}` },
                { text: `- Condição do veículo: ${checkText(item.condicaogeraldoveiculo)}` },
            ];
            result.push(...leilaoArr);
        });
        return result;
    };

    const texts = [
        { text: 'DADOS DO VEÍCULO', size: 18, rgb: rgb(0, 0.53, 0.71) },
        { text: `- Placa: ${checkText(data.dados_veiculo.placa)}` },
        { text: `- Chassi: ${checkText(data.dados_veiculo.chassi)}` },
        { text: `- Ano de Fabricação: ${checkText(data.dados_veiculo.anofabricacaomodelo)}` },
        { text: `- Cor: ${checkText(data.dados_veiculo.cor)}` },
        { text: `- Modelo/Marca: ${checkText(data.dados_veiculo.marcamodelo)}` },

        { text: 'LEILÃO', size: 18, rgb: rgb(0, 0.53, 0.71) },
        ...returnLeilao(),
        { text: `- Indice de Risco 0 a 5: ${checkText(data.analise_risco.indicerisco)}` },
        { text: `- Analise de Risco: ${checkText(data.analise_risco.parecer)}` },
    ];

    let yposiction = 130;

    texts.forEach((element) => {
        if (yposiction >= height - 50) {
            page = pdfDoc.addPage([595.28, 841.89]);
            height = page.getHeight();
            yposiction = 50;
        }

        page.drawText(element.text, {
            x: 50,
            y: height - yposiction,
            size: element.size || 12,
            color: element.rgb || rgb(0, 0, 0),
        });

        yposiction += 25;
    });
};
