import { collection, doc, getDoc, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";
import useTransactionService from "./transactionService";

const useMoneyPodsServices = () => {
    const { user } = useAuth();
    const {updateWalletService} = useTransactionService()

    const createMoneyPod = async (name) => {
        try {
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

    const deleteMoneyPod = async (podUid)=>{
        try {
            const podDoc = doc(firestore , "money_pods" , podUid)
            const docSnap = await getDoc(podDoc)
            const podData = docSnap.data()

            const expense = podData.income
            const income = podData.expense

            await updateWalletService(expense , true)
            await updateWalletService(income , false)

            const q = query(collection(firestore , "money_pod_transactions") , where("user_uid" , "==" , user?.uid) , where("pod_uid" , "==" , podUid))

            // Pending
        } catch (error) {
            
        }
    }

    return { createMoneyPod , deleteMoneyPod }
}

export default useMoneyPodsServices