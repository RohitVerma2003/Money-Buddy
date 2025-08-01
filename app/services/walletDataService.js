import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import useAuth from '../../context/authContext'
import useInternet from '../../context/internetContext'

const useWalletService = () => {
    const { user } = useAuth()
    const {connected} = useInternet()
    const [walletData, setWalletData] = useState([])
    const [walletAmount, setWalletAmount] = useState(0)
    const [walletLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.uid || !connected) return;

        setLoading(true)
        const colRef = collection(firestore, 'wallets')
        const q = query(colRef, where('uid', '==', user.uid), orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString(), 
                    updatedAt: data.updatedAt?.toDate().toISOString()
                };
            });
            setWalletData(fetchData)
            if (fetchData.length != 0) setWalletAmount(fetchData[0]?.balance)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching wallet:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { walletData, walletLoading , walletAmount }
}

export default useWalletService
