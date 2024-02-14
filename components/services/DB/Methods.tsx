import { addDoc, collection, getDocs, doc, getDoc, getFirestore, DocumentData, QuerySnapshot, CollectionReference, query, where } from 'firebase/firestore';
import {firestore} from './FirebaseConfig'
import React, { useState, ChangeEvent } from "react";


const Methods = () => {
    const db = getFirestore(firestore)
    const [searchingValue, setSearchingValue] = useState<string>('')
    const [searchResults, setSearchRelusts] = useState<any>([])

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

    const $addNewDocu = async (collectionR: string, document: object) => {
        try {
            const collectionRef: CollectionReference<DocumentData> =  collection(db, collectionR)
            const docRef = await addDoc(collectionRef, document)
                .then(doc => {
                    console.log(`success `, doc.id)
                })
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const $handleSearchingValue = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setSearchingValue(e.target.value)
        return searchingValue
    }

    const $handleSearchResults = async (value: string) => {
        try {
         const query = await $search('products', value)
         setSearchRelusts(query?.docs.map(el => el.data()))
        }catch(err) {
            console.error(`Error: `, err)
        }
    }

    return {
        $getAllDocuments,
        $search,
        $addNewDocu,
        $handleSearchingValue,
        $handleSearchResults,
        searchingValue,
        searchResults
    }
}

export default Methods