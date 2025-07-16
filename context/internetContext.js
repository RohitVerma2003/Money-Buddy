import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import useAuth from './authContext';

export const InternetContext = createContext();

export const InternetProvider = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [connected, setConnected] = useState(null)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if (connected === null) return;

        if (connected === false) {
            router.replace('/utilities/NoInternet');
        } else {
            if (user === undefined) return;
            if (user) {
                router.replace('/(tabs)');
            } else {
                router.replace('/welcome');
            }
        }
    }, [connected, user]);

    return (
        <InternetContext.Provider value={{ connected }}>{children}</InternetContext.Provider>
    )
}

const useInternet = () => {
    const context = useContext(InternetContext);
    return context;
}

export default useInternet;