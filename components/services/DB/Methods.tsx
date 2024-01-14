import { addDoc, collection, getDocs, doc, getDoc, getFirestore, deleteDoc, updateDoc, QuerySnapshot, CollectionReference, query, where } from 'firebase/firestore';
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

    const $search = async (collectionName: string, value: string): Promise<QuerySnapshot | null | undefined> => {
        try {
            const smallFirstLettervalue = value.charAt(0).toLowerCase() + value.slice(1)
            const collectionRef: CollectionReference = collection(db, collectionName);
            const q = query(collectionRef, where('name', 'array-contains', smallFirstLettervalue));
            const snapshot = await getDocs(q);
        
            if (snapshot.empty) {
            console.error('No documents match your criteria!!!');
            return null;
            } else {
            return snapshot;
            }
            } catch (err) {
            console.error(`Error: `, err);
            throw err;
            }
      };

    return {
        $getAllDocuments,
        $search
    }
}

export default Methods