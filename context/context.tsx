"use client";
import { useEffect, useState, ReactNode, createContext, SetStateAction } from "react";
import { createUserWithEmail, getPricesInDatabase, getUserByIDInDatabase, loginUser } from "@/firebase/services";
import { DocumentData } from "firebase/firestore";

interface HistoricItem {
    placa: string;
    wasPaid: boolean;
    date: string;
    pdf: string
}

interface UserData {
    name: string;
    email: string;
    historic: HistoricItem[];
    userId: string;
}

interface Prices {
    label_api_1: string;
    api_1: string;
    label_api_2: string;
    api_2: string;
    label_api_3: string;
    api_3: string;
}

interface AuthContext {
    placa: string;
    setPlaca: (e: string) => void;
    signUp: ({ name, email, password }: { name: string, email: string, password: string }) => void;
    signIn: ({ email, password }: { email: string, password: string }) => void;
    user: string;
    setUser: (e: string) => void;
    userData: UserData;
    signOut: () => void;
    prices: Prices | DocumentData;
}

const objPrice = {
    label_api_1: '10,97',
    api_1: '3,50',
    label_api_2: '16,90',
    api_2: '7,47',
    label_api_3: '32,20',
    api_3: '19,90',
}
export const AppContext = createContext<AuthContext>({
    placa: '',
    setPlaca: (e: string) => { },
    signUp: ({ name, email, password }: { name: string, email: string, password: string }) => { },
    signIn: ({ email, password }: { email: string, password: string }) => { },
    user: '',
    setUser: (e: string) => { },
    userData: {
        name: '',
        email: '',
        historic: [
            {
                placa: '',
                wasPaid: false,
                date: '',
                pdf: ''
            }
        ],
        userId: ''
    },
    signOut: () => { },
    prices: objPrice
});

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [placa, setPlaca] = useState('');
    const [user, setUser] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        historic: [],
        userId: ''
    });
    const [prices, setPrices] = useState<Prices | DocumentData>(objPrice);

    const signIn = async ({ email, password }: { email: string, password: string }) => {
        if (!email || !password) {
            console.log("falta informações");
            return;
        }
        try {
            const user = await loginUser(email, password);
            if (!user) {
                console.log("Falha ao criar usuário");
                return;
            }
            localStorage.setItem("user", user.uid);
            setUser(user.uid);
        } catch (error) {
            console.error("Erro ao registrar usuário", error);
        }
    };

    const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        if (!name || !email || !password) {
            console.log("Faltam informações");
            return;
        }
        try {
            const user = await createUserWithEmail(name, email, password);
            if (!user) {
                console.log("Falha ao criar usuário");
                return;
            }
            localStorage.setItem("user", user.uid);
            setUser(user.uid);
        } catch (error) {
            console.error("Erro ao registrar usuário", error);
        }
    };

    const signOut = () => {
        if (!user) {
            return;
        }
        setUser("");
        setUserData({
            name: '',
            email: '',
            historic: [],
            userId: ''
        });
        setPlaca('');
        localStorage.removeItem('user');
        localStorage.removeItem('result');
    };

    useEffect(() => {
        const getUser = async () => {
            const userId = localStorage.getItem("user");
            if (!userId) {
                console.log("No user ID found in localStorage");
                return;
            }
            try {
                const res = await getUserByIDInDatabase(userId);
                if (!res || !res.userId) {
                    console.log("No user found in database");
                    return;
                }
                const pricesData = await getPricesInDatabase('txhDtXbyGm5o1k5S2TLO');
                setPrices(pricesData);
                setUser(res.userId);
                setUserData(res);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        getUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                placa,
                setPlaca: element => setPlaca(element),
                signUp,
                signIn,
                user,
                setUser,
                userData,
                signOut,
                prices
            }}
        >
            {children}
        </AppContext.Provider>
    );
};