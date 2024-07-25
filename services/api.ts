import axios from "axios";

export const api = axios.create({
    baseURL: 'https://wdapi2.com.br/consulta/'
});