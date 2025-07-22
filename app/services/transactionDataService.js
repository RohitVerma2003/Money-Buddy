import { collection, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import useAuth from '../../context/authContext'

const useTransactionService = () => {
    const { user } = useAuth()
    const [transactionData, setTransactionData] = useState([])
    const [transactionLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.uid) return;

        setLoading(true)
        const colRef = collection(firestore, 'transactions')

        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const thirtyDaysAgoDate = Timestamp.fromDate(thirtyDaysAgo)

        const q = query(colRef, where('uid', '==', user.uid), where('createdAt', '>=', thirtyDaysAgoDate), orderBy('createdAt', 'desc'))

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
            setTransactionData(fetchData)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching transactions:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { transactionData, transactionLoading }
}

export default useTransactionService
