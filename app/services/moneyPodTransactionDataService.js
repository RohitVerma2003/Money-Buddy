import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import useAuth from '../../context/authContext'

const useMoneyPodTransactionService = (podUid) => {
    const { user } = useAuth()
    const [moneyPodTransactionData, setMoneyPodTransactionData] = useState([])
    const [moneyPodTransactionLoading, setMoneyPodTransactionLoading] = useState(true)

    useEffect(() => {
        if (!user?.uid) return;

        setMoneyPodTransactionLoading(true)
        const colRef = collection(firestore, 'money_pod_transactions')

        const q = query(colRef, where('user_uid', '==', user.uid), where('pod_uid', '==', podUid) , orderBy('createdAt' , 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchData = snapshot.docs.map((doc) => {
                const data = doc.data();
                if (data?.kind === 'shared') {
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: data.date?.toDate().toISOString().split("T")[0],
                        sharedAmong: Array.isArray(data.sharedAmong)
                            ? data.sharedAmong.map(person => ({
                                name: person?.name || '',
                                amount: parseFloat(person?.amount) || 0
                            }))
                            : []
                    }
                } else {
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: data.date?.toDate().toISOString().split("T")[0],
                    };
                }
            });
            setMoneyPodTransactionData(fetchData)
            setMoneyPodTransactionLoading(false)
        }, (error) => {
            console.error('Error fetching transactions:', error)
            setMoneyPodTransactionLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { moneyPodTransactionData, moneyPodTransactionLoading }
}

export default useMoneyPodTransactionService
