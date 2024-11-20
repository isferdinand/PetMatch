import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./../config/FirebaseConfig"

const GetFavList = async (user) => {
    const docSnap = await getDoc(doc(db, "FavoritePets", user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists()){
        return docSnap.data()
    }else{ //create a new doc for the user
        await setDoc(doc(db, "FavoritePets", user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        })
    }
}

const UpdateFav = async (user, favorites) => {
    const docRef = doc(db, "FavoritePets", user?.primaryEmailAddress?.emailAddress);
    try{
        await updateDoc(docRef, {
            favorites: favorites
        })
    }catch(e){
        console.error("Error updating document: ", e)
    }
}

export default {
    GetFavList,
    UpdateFav
}