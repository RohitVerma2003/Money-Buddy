import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import useAuth from './authContext';

export const InternetContext = createContext();

export const InternetProvider = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [connected, setConnected] = useState(null)

    const getData = async () => {
        try {
            const value = AsyncStorage.getAllKeys().then(keys => {
                return AsyncStorage.multiGet(keys).then(result => {
                    return result
                });
            });
            return value;
        } catch (e) {
            console.error('Error reading value', e);
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, [])

    useEffect(() => {
        const fun = async () => {
            if (connected === null) return;
            const value = await getData()

            if (connected === false) {
                router.replace('/utilities/NoInternet');
            } else {
                if (user === undefined) return;
                if (user) {
                    router.replace('/(tabs)');
                } else if (!value || value.length === 0) {
                    router.replace('/welcome');
                }
            }
        }

        fun()
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