import { getPricesInDatabase } from "@/firebase/services";

const paymentName = async (api: '1' | '2' | '3', params: { placa: string }) => {

    const prices = await getPricesInDatabase('txhDtXbyGm5o1k5S2TLO');
    function transformToStripeAmount(value: string): number {
        // Remove a vírgula e converte para número
        const numericValue = parseFloat(value.replace(',', '.'));
        // Multiplica por 100 e retorna o valor
        return Math.round(numericValue * 100);
    }

    switch (api) {
        case '2':
            return {
                name: `Veículo ${params.placa}, pesquisa 2.0`,
                description: `A placa pedia vai liberar as informações do veículo ${params.placa}, ao realizar o pagamento.`,
                price: transformToStripeAmount(prices?.api_2)
            };
        case '3':
            return {
                name: `Veículo ${params.placa}, pesquisar dados de leilão`,
                description: `A placa pedia vai liberar as informações do veículo ${params.placa}, ao realizar o pagamento.`,
                price: transformToStripeAmount(prices?.api_3)
            };
        default:
            return {
                name: `Veículo ${params.placa}, pesquisa 2.0`,
                description: `A placa pedia vai liberar as informações do veículo ${params.placa}, ao realizar o pagamento.`,
                price: transformToStripeAmount(prices?.api_2)
            };
    }
}

export {
    paymentName
}