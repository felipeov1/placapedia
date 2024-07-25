import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, query, where, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db, provider } from "./conn";

// Create user
export const createUserWithEmail = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addUserInDatabase(name, email, user.uid);
        return user;
    } catch (error) {
        const errorMessage = error;
        console.error(errorMessage);
    }
};
// Login
export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (err) {
        const errorMessage = err;
        console.error(errorMessage);
    }
};

export const createUserWithGoogle = async () => {
    try {
        const userCredential = signInWithPopup(auth, provider);
        const user = (await userCredential).user;

        // if (register) {
        //     addUserInDatabase(user.displayName!, user.email!, user.uid);
        // }

        const dbUser = await getUserByIDInDatabase(user.uid);
        if (!dbUser.userId) {
            addUserInDatabase(user.displayName!, user.email!, user.uid);
        }

        return user.uid;
    } catch (error) {
        const errorMessage = error;
        console.error(errorMessage);
    }
};

export const addUserInDatabase = async (name: string, email: string, userId: string) => {
    try {
        const user = await addDoc(collection(db, 'users'), {
            name,
            email,
            userId,
            historic: []
        });
        return user;
    } catch (error) {
        console.error(error);
    }
};

export type IUser = {
    email: string;
    historic: IHistoric;
    name: string;
    userId: string;
};
export const getUserByIDInDatabase = async (userID: string | null): Promise<any> => {
    if (!userID) {
        throw new Error("UserID is null");
    }

    try {
        const q = query(
            collection(db, 'users'),
            where('userId', '==', userID)
        );
        const querySnapshot = await getDocs(q);

        let data: any = {};
        let docId: string = '';

        querySnapshot.forEach(doc => {
            data = doc.data(); // Chamar doc.data() como uma função
            docId = doc.id;
        });

        return { ...data, id: docId };

    } catch (error) {
        throw error;
    }
};

export interface IHistoric {
    wasPay: boolean,
    placa: string,
    date: Date,
    pdf: string
}
export const addHistoric = async (userID: string | null, newHistoric: IHistoric) => {
    try {

        const user = await getUserByIDInDatabase(userID);
        if (!user) {
            console.error("User not found!");
            return;
        }
        const userDocRef = doc(db, 'users', user.id);

        await updateDoc(userDocRef, {
            historic: arrayUnion(newHistoric) // Uso correto de arrayUnion
        });

        console.log("Historic added successfully!");
        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
};

type Prices = {
    label_api_1: string,
    api_1: string,
    label_api_2: string,
    api_2: string,
    label_api_3: string,
    api_3: string,
}
export const addPricesInDatabase = async () => {
    try {
        const prices = await addDoc(collection(db, 'prices'), {
            label_api_1: '10,97',
            api_1: '3,50',
            label_api_2: '16,90',
            api_2: '7,47',
            label_api_3: '32,20',
            api_3: '19,90',
        });
        return prices;
    } catch (error) {
        console.error(error);
    }
};
export const updatePricesInDatabase = async (documentId: string, updatedValues: Prices) => {
    try {
        const pricesDocRef = doc(db, 'prices', documentId);
        await updateDoc(pricesDocRef, updatedValues);
        console.log('Document successfully updated');
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};
export const getPricesInDatabase = async (id: string) => {
    try {
        const docRef = doc(db, "prices", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return {
                label_api_1: '10,97',
                api_1: '3,50',
                label_api_2: '16,90',
                api_2: '7,47',
                label_api_3: '32,20',
                api_3: '19,90',
            }
        }
    } catch (error) {
        console.error("Erro ao consulmir dados: ", error);
        return {
            label_api_1: '10,97',
            api_1: '3,50',
            label_api_2: '16,90',
            api_2: '7,47',
            label_api_3: '32,20',
            api_3: '19,90',
        }
    }
};

export async function getAuthToken() {
    const user = auth.currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
}