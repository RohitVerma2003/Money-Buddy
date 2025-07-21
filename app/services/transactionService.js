import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";
import useTransactions from "../../context/transactionContext";

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
            await updateDoc(docRef, { balance: Number(newBalance), updatedAt: serverTimestamp() })
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

    return { regularExpenseTransactionService, sharedExpenseTransactionService, lendingMoneyTransactionService, debtMoneyTransactionService }
}

export default useTransactionService;