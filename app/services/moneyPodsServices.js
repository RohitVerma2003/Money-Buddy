import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";
import useInternet from '../../context/internetContext';
import useTransactionService from "./transactionService";

const useMoneyPodsServices = () => {
    const { user } = useAuth();
    const {connected} = useInternet()
    const { updateWalletService } = useTransactionService()

    const createMoneyPod = async (name) => {
        try {
            if(!connected) throw new Error("Internet Issue")
            const data = { uid: user?.uid, name, income: Number(parseFloat(0).toFixed(2)), expense: Number(parseFloat(0).toFixed(2)), createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
            const collectionRef = collection(firestore, "money_pods")
            const docRef = doc(collectionRef)

            await setDoc(docRef, data, { merge: true })
            return { success: true }
        } catch (error) {
            console.log("Error in creation of money pod: ", error.message)
            return { success: false, error: message }
        }
    }

    const deleteMoneyPod = async (podUid) => {
        try {
            if(!connected) throw new Error("Internet Issue")
            const podDoc = doc(firestore, "money_pods", podUid)
            const docSnap = await getDoc(podDoc)
            const podData = docSnap.data()

            const expense = podData.income
            const income = podData.expense

            const q = query(collection(firestore, "money_pod_transactions"), where("user_uid", "==", user?.uid), where("pod_uid", "==", podUid))

            const querySnapshot = await getDocs(q)
            const batch = writeBatch(firestore)

            querySnapshot.docs.map((document) => {
                const docRef = doc(firestore, "money_pod_transactions", document.id)
                batch.delete(docRef)
            } )

            await batch.commit()

            deleteDoc(podDoc)

            await updateWalletService(expense, true)
            await updateWalletService(income, false)

            return { success: true }
        } catch (error) {
            console.log("Error in deleting the pod: ", error)
            return { success: false, error: error.message }
        }
    }

    return { createMoneyPod, deleteMoneyPod }
}

export default useMoneyPodsServices