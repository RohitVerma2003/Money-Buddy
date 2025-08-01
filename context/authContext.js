import { useNetInfo } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const checkInternet = ()=>{
        const internet = useNetInfo()
        return internet.isConnected
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser?.uid,
                    name: firebaseUser?.displayName,
                    email: firebaseUser?.email
                });
                updateUser(firebaseUser?.uid)
                router.replace("/(tabs)");
            } else {
                setUser(null);
                router.replace('/(auth)/welcome')
            }
        });

        return () => unsubscribe();
    }, []);


    const login = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            return { success: false, error }
        }
    }

    const logout = async () => {
        await signOut(auth);
    }

    const signUp = async ({ name, email, password }) => {
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response?.user, { displayName: name })
            const docRef = doc(firestore, "users", response?.user?.uid);
            await setDoc(docRef, { name, email, uid: response?.user?.uid });
            return { success: true }
        } catch (error) {
            return { success: false, error }
        }
    }

    const updateUser = async (uid) => {
        try {
            if(!checkInternet()) return
            const docRef = doc(firestore, "users", uid);
            const snapShot = await getDoc(docRef);

            if (snapShot.exists()) {
                const data = snapShot.data();
                const userData = {
                    uid: data?.uid,
                    name: data?.name || null,
                    email: data?.email || null,
                }
                setUser(userData);
            }
        } catch (error) {
            console.log("Error in updating the user", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, signUp, updateUser, logout }}>{children}</AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export default useAuth;