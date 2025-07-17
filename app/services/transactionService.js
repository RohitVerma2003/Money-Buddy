import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
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

    const regularExpenseTransactionService = async (amount) => {
        try {
            const newData = { ...regularExpenseData, uid: user?.uid, createdAt: serverTimestamp(), amount: Number(parseFloat(amount).toFixed(2)) }
            const docRef = doc(collection(firestore, "transactions"))
            await setDoc(docRef, newData, { merge: true })
            return { success: true, transaction: { ...newData, id: docRef?.id } }
        } catch (error) {
            return { success: false, error: error.message }
        }

    }

    return { regularExpenseTransactionService }
}

export default useTransactionService;