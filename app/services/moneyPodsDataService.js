import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
import useAuth from '../../context/authContext'
import useInternet from '../../context/internetContext'

const useMoneyPodsDataService = () => {
    const { user } = useAuth()
    const {connected} = useInternet()
    const [moneyPodsData, setMoneyPodsData] = useState([])
    const [moneyPodsLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.uid || !connected) return;

        setLoading(true)
        const colRef = collection(firestore, 'money_pods')

        const q = query(colRef, where('uid', '==', user.uid) , orderBy('createdAt' , 'desc'))

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
