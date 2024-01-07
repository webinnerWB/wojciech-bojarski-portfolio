import { addDoc, collection, getDocs, doc, getDoc, getFirestore, deleteDoc, updateDoc, QuerySnapshot, CollectionReference  } from 'firebase/firestore';
import {firestore} from './FirebaseConfig'

const Methods = () => {
    const db = getFirestore(firestore)

    const $getAllDocuments = async (collectionName: string): Promise<QuerySnapshot> => {
        try {
            const collectionRef: CollectionReference  =  collection(db, collectionName)
            const querySnapshot = await getDocs(collectionRef)
            return querySnapshot
        }catch(err) {
            console.error(`Error: `, err)
            throw err
        }
    }

    return {
        $getAllDocuments
    }
}

export default Methods