import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import useAuth from '../../context/authContext'

const useMoneyPodsDataService = () => {
    const { user } = useAuth()
    const [moneyPodsData, setMoneyPodsData] = useState([])
    const [moneyPodsLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.uid) return;

        setLoading(true)
        const colRef = collection(firestore, 'money_pods')

        const q = query(colRef, where('uid', '==', user.uid))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    docId : doc.id,
                    createdAt : data.createdAt?.toDate().toISOString().split("T")[0],
                    updatedAt : data.updatedAt?.toDate().toISOString().split("T")[0],
                }
            });
            setMoneyPodsData(fetchData)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching money pods:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { moneyPodsData, moneyPodsLoading }
}

export default useMoneyPodsDataService
