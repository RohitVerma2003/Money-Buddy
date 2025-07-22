import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { Text } from "react-native";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";
import useTransactions from "../../context/transactionContext";
import monthlyDataStarter from "../utilities/monthlyDataStarter";
import weeklyDataStarter from "../utilities/weeklyDataStarter";

const useTransactionService = () => {
    const { data } = useTransactions();
    const { user } = useAuth();

    const regularExpenseData = {
        type: data.type,
        kind: 'regular',
        category: data.category,
        description: data.description,
        date: data.date
    };

    const sharedExpense = {
        category: data.category,
        kind: 'shared',
        description: data.description,
        date: data.date,
        sharedAmong: data.friends
    }

    const lendExpense = {
        kind: 'lend',
        description: data.description,
        date: data.date,
        lendingTo: data.lendingTo
    }

    const debtExpense = {
        kind: 'debt',
        description: data.description,
        date: data.date,
        lendingFrom: data.lendingFrom
    }

    const updateWalletService = async (amount, isExpense) => {
        const docRef = doc(firestore, "wallets", user?.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const currentBalance = docSnap.data().balance || 0
            const newBalance = isExpense ? Number(currentBalance) - Number(amount) : Number(currentBalance) + Number(amount)
            await updateDoc(docRef, { balance: Number(parseFloat(newBalance).toFixed(2)), updatedAt: serverTimestamp() })
        } else {
            const balance = isExpense ? Number(-amount) : Number(amount)
            await setDoc(docRef, { balance, uid: user?.uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
        }
    }

    const regularExpenseTransactionService = async (amount) => {
        try {
            const newData = { ...regularExpenseData, uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)) }
            const docRef = doc(collection(firestore, "transactions"))
            await updateWalletService(amount, regularExpenseData?.type === 'Expense')
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }

    }

    const sharedExpenseTransactionService = async (amount) => {
        try {
            const newData = { ...sharedExpense, uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)) }
            const docRef = doc(collection(firestore, "transactions"))
            await updateWalletService(amount, true)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const lendingMoneyTransactionService = async (amount) => {
        try {
            const newData = { ...lendExpense, uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)) }
            const docRef = doc(collection(firestore, "transactions"))
            await updateWalletService(amount, true)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const debtMoneyTransactionService = async (amount) => {
        try {
            const newData = { ...debtExpense, uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)) }
            const docRef = doc(collection(firestore, "transactions"))
            await updateWalletService(amount, false)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const weeklyTransactionStats = async () => {
        try {
            const colRef = collection(firestore, 'transactions')
            const weeklyData = weeklyDataStarter()

            const dateToday = Timestamp.fromDate(new Date())
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            const sevenDaysAgoDate = Timestamp.fromDate(sevenDaysAgo)

            const q = query(colRef, where('uid', '==', user.uid), where('date', '>=', sevenDaysAgoDate), where('date', '<=', dateToday), orderBy('date', 'desc'))

            const querySnapshot = await getDocs(q)
            const transactionData = []

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const transactionDate = data.date?.toDate().toISOString().split('T')[0]

                if (data?.kind === 'shared') {
                    transactionData.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: transactionDate,
                        sharedAmong: Array.isArray(data.sharedAmong)
                            ? data.sharedAmong.map(person => ({
                                name: person?.name || '',
                                amount: parseFloat(person?.amount) || 0
                            }))
                            : []
                    })
                } else {
                    transactionData.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: transactionDate,
                    });
                }

                const dayData = weeklyData.find((day) => day.date === transactionDate)

                if (dayData) {
                    if (data?.kind === 'regular') {
                        if (data?.type === "Income") dayData.income += data?.amount
                        else dayData.expense += data?.amount
                    } else {
                        if (data?.kind === "debt") dayData.income += data?.amount
                        else dayData.expense += data?.amount
                    }
                }
            })

            const stats = weeklyData.flatMap((day) => [
                {
                    value: day.income,
                    label: day.day,
                    spacing: 2,
                    labelWidth: 30,
                    labelTextStyle: { color: 'black' },
                    frontColor: '#A0C878',
                    labelComponent: (item) => <Text className="font-doodle text-center">{day.day}</Text>
                },
                { value: day.expense, frontColor: '#ED6665' }
            ])
            return { success: true, stats, transactionData }
        } catch (error) {
            console.log("Error in fetching weeklyStats: ", error.message)
            return { success: false, error }
        }
    }

    const monthlyTransactionStats = async () => {
        try {
            const colRef = collection(firestore, 'transactions')
            const monthlyData = monthlyDataStarter()

            const dateToday = Timestamp.fromDate(new Date())
            const twelveMonthsAgo = new Date()
            twelveMonthsAgo.setDate(twelveMonthsAgo.getMonth() - 12)

            const q = query(colRef, where('uid', '==', user.uid), where('date', '>=', twelveMonthsAgo), where('date', '<=', dateToday), orderBy('date', 'desc'))

            const querySnapshot = await getDocs(q)
            const transactionData = []

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const transactionDate = data.date?.toDate()

                if (data?.kind === 'shared') {
                    transactionData.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: data.date?.toDate().toISOString().split('T')[0],
                        sharedAmong: Array.isArray(data.sharedAmong)
                            ? data.sharedAmong.map(person => ({
                                name: person?.name || '',
                                amount: parseFloat(person?.amount) || 0
                            }))
                            : []
                    })
                } else {
                    transactionData.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate().toISOString(),
                        date: data.date?.toDate().toISOString().split('T')[0],
                    });
                }

                const monthName = transactionDate.toLocaleString("default" , {month : "short"})
                const shortYear = transactionDate.getFullYear().toString().slice(-2)

                const monthData = monthlyData.find((month) => month.month === `${monthName} ${shortYear}`)

                if (monthData) {
                    if (data?.kind === 'regular') {
                        if (data?.type === "Income") monthData.income += data?.amount
                        else monthData.expense += data?.amount
                    } else {
                        if (data?.kind === "debt") monthData.income += data?.amount
                        else monthData.expense += data?.amount
                    }
                }
            })

            const stats = monthlyData.flatMap((month) => [
                {
                    value: month.income,
                    label: month.month,
                    spacing: 2,
                    labelWidth: 30,
                    labelTextStyle: { color: 'black' },
                    frontColor: '#A0C878',
                    labelComponent: (item) => <Text className="font-doodle text-center w-14">{month.month}</Text>
                },
                { value: month.expense, frontColor: '#ED6665' }
            ])
            return { success: true, stats, transactionData }
        } catch (error) {
            console.log("Error in fetching monthlyStats: ", error.message)
            return { success: false, error }
        }
    }

    return { regularExpenseTransactionService, sharedExpenseTransactionService, lendingMoneyTransactionService, debtMoneyTransactionService, weeklyTransactionStats , monthlyTransactionStats }
}

export default useTransactionService;