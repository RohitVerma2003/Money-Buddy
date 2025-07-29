import { collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";
import useMoneyPodTransaction from "../../context/moneyPodTransactionContext";

const useMoneyPodTransactionService = () => {
    const { data } = useMoneyPodTransaction();
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

    const updateMoneyPodService = async (amount, isExpense, podUid) => {
        const docRef = doc(firestore, "money_pods", podUid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const currentBalance = isExpense ? docSnap.data().expense : docSnap.data().income
            const newBalance = Number(currentBalance) + Number(amount)

            if (isExpense) {
                await updateDoc(docRef, { expense: Number(parseFloat(newBalance).toFixed(2)), updatedAt: serverTimestamp() })
            } else {
                await updateDoc(docRef, { income: Number(parseFloat(newBalance).toFixed(2)), updatedAt: serverTimestamp() })
            }
        }
    }
    const updateMoneyPodTransactionDelete = async (amount, isExpense, podUid) => {
        const docRef = doc(firestore, "money_pods", podUid)
        const docSnap = await getDoc(docRef)
        console.log(amount , isExpense , podUid)

        if (docSnap.exists()) {
            const currentIncome = docSnap.data().income
            const currentExpense = docSnap.data().expense

            const newIncome = isExpense ? currentIncome - Number(parseFloat(amount).toFixed(2)) : currentIncome
            const newExpense = isExpense ? currentExpense : currentExpense - Number(parseFloat(amount).toFixed(2))

            await updateDoc(docRef, { expense: Number(parseFloat(newExpense).toFixed(2)), income: Number(parseFloat(newIncome).toFixed(2)), updatedAt: serverTimestamp() })
        }
    }

    const deleteMoneyPodTransaction = async (amount, podUid, id, isExpense) => {
        try {
            const docRef = doc(firestore, "money_pod_transactions", id)
            await updateMoneyPodTransactionDelete(amount, !isExpense, podUid)
            await updateWalletService(amount, !isExpense)
            await deleteDoc(docRef)

            return { success: true }
        } catch (error) {
            console.log("Error in deleting the money pod transaction: ", error)
            return { success: false, error: error.message }
        }

    }

    const regularMoneyPodExpenseTransactionService = async (amount, podUid) => {
        try {
            const newData = { ...regularExpenseData, user_uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)), pod_uid: podUid }
            const docRef = doc(collection(firestore, "money_pod_transactions"))
            await updateMoneyPodService(amount, regularExpenseData?.type === 'Expense', podUid)
            await updateWalletService(amount, regularExpenseData?.type === 'Expense')
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }

    }

    const sharedMoneyPodExpenseTransactionService = async (amount, podUid) => {
        try {
            const newData = { ...sharedExpense, user_uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)), pod_uid: podUid }
            const docRef = doc(collection(firestore, "money_pod_transactions"))
            await updateMoneyPodService(amount, true, podUid)
            await updateWalletService(amount, true)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const lendingMoneyPodTransactionService = async (amount, podUid) => {
        try {
            const newData = { ...lendExpense, user_uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)), pod_uid: podUid }
            const docRef = doc(collection(firestore, "money_pod_transactions"))
            await updateMoneyPodService(amount, true, podUid)
            await updateWalletService(amount, true)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const debtMoneyPodTransactionService = async (amount, podUid) => {
        try {
            const newData = { ...debtExpense, user_uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)), pod_uid: podUid }
            const docRef = doc(collection(firestore, "money_pod_transactions"))
            await updateMoneyPodService(amount, false, podUid)
            await updateWalletService(amount, false)
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    return { regularMoneyPodExpenseTransactionService, sharedMoneyPodExpenseTransactionService, lendingMoneyPodTransactionService, debtMoneyPodTransactionService, deleteMoneyPodTransaction }
}

export default useMoneyPodTransactionService;