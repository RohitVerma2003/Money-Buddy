import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import useAuth from "../../context/authContext";

const useMoneyPodsServices = () => {
    const { user } = useAuth();

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

    return { createMoneyPod }
}

export default useMoneyPodsServices