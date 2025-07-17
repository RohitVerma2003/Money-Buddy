import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";

const updateUserProfile = async (uid , updatedData)=>{
    try {
        const docRef = doc(firestore , "users" , uid);
        await updateDoc(docRef , updatedData);
        await updateProfile(auth.currentUser , {displayName : updatedData?.name})

        return {success : true , message : "User updated successfully"};
    } catch (error) {
        console.log(error);
        return {success : false , message : error.message};
    }
}

export default updateUserProfile;