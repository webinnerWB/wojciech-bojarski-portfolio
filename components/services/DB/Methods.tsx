import { addDoc, collection, getDocs, getFirestore, DocumentData, QuerySnapshot, CollectionReference, query, where, QueryDocumentSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {firestore} from './FirebaseConfig'
import React, { useState, ChangeEvent } from "react";
import { useRouter } from 'next/router'; 

import soreStyle from '../../../style/store.module.scss'

const Methods = () => {
    const db = getFirestore(firestore)
    const router = useRouter()
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

    const $search = async (collectionName: string, value: string): Promise<QuerySnapshot[] | null | undefined> => {
        try {
          const smallFirstLettervalue = value.charAt(0).toLowerCase() + value.slice(1)
          const collectionRef: CollectionReference = collection(db, collectionName);
          const combinedSnapshots: QuerySnapshot[] = [];
      
          const queryName = query(collectionRef, where('name', 'array-contains', smallFirstLettervalue));
          const snapshotName = await getDocs(queryName);

          const queryCategory = query(collectionRef, where('category', 'array-contains', smallFirstLettervalue))
          const snapshotCategory = await getDocs(queryCategory)
      
          combinedSnapshots.push(snapshotName);
          combinedSnapshots.push(snapshotCategory);
      console.log(`combinedSnapshots: `, combinedSnapshots)
          const flattenedSnapshots: QuerySnapshot[] = combinedSnapshots.flatMap(snapshot => snapshot);
          console.log(`flattenedSnapshots: `, flattenedSnapshots)
      
          if (snapshotName.empty && snapshotCategory.empty) {
            console.error('No documents match your criteria!!!');
            return null;
          } else {
            return flattenedSnapshots;
          }
        } catch (err) {
          console.error(`Error: `, err);
          throw err;
        }
      };
      

      const $handleSearchResults = async (value: string) => {
        try {
          const queries = await $search('products', value);
      
          if (queries) {
            const flattenedResults = queries.flatMap(snapshot => snapshot.docs.map(doc => doc.data()));
            setSearchRelusts((el: any) => [...el, ...flattenedResults]);
          } else {
            console.error('No documents match your criteria!!!');
            setSearchRelusts(undefined);
          }
        } catch (err) {
          console.error(`Error: `, err);
          throw err;
        }
      };

    const $addNewDocument = async (collectionR: string, document: object) => {
        try {
            const collectionRef: CollectionReference<DocumentData> =  collection(db, collectionR)
            const docRef = await addDoc(collectionRef, document)
                .then(doc => {
                    console.log(`success `, doc.id)
                })
        } catch (err) {
            console.error(`Error: `, err)
            throw err
        }
    }

    const $handleSearchingValue = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setSearchingValue(e.target.value)
        return searchingValue
    }

    const $isUserLogged = (): Promise<boolean> => {
        const auth = getAuth(firestore);
    
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    console.log(`logged-in user: `, user);
                    resolve(true);
                } else {
                    console.log('user not logged in');
                    resolve(false);
                }
            }, err => {
                console.error(`ERROR: `, err)
                reject(err)
            });
        });
    }

    const $registrationUser = async (formData: any, ref: HTMLSpanElement):Promise<void> => {
        try {
            const auth = getAuth(firestore)
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user
            
            const userCollection = collection(db, 'users')

            const { password, ...userData } = formData

            await addDoc(userCollection, {
                uuid: user.uid,
                ...userData
            })

            ref.innerHTML = 'Registration was successful, you will be automatically logged into your account immediately.'
            ref.classList.add(`${soreStyle.showFormMsg}`, `${soreStyle.success}`)
                setTimeout(() => {
                    ref.classList.remove(`${soreStyle.showFormMsg}`, `${soreStyle.success}`)
                    router.push('/store')
                }, 10000)
        } catch (err: any) {
            console.error(`ERROR: `, err);
        
            if (err && err.code) {
              const errorCode: string = err.code;
        
              if (errorCode === 'auth/weak-password') {
                console.log('The password is too weak!');
                ref.innerHTML = 'The password is too weak!'
                ref.classList.add(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                setTimeout(() => {
                    ref.classList.remove(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                }, 10000)
              } else if(errorCode === 'auth/email-already-in-use') {
                console.log('E-mail address has already been used');
                ref.innerHTML = 'E-mail address has already been used '
                ref.classList.add(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                setTimeout(() => {
                    ref.classList.remove(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                }, 10000)
              } else {
                console.log(errorCode);
              }
            }
            throw err
          }
    }

    const $loginUser = async (formData: any, ref: HTMLSpanElement): Promise<void> => {
        try {
            const auth = getAuth(firestore)
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user
            console.log(`LOGGED: `, user)
            router.push('/store')
        } catch (err: any) {
            console.error(`ERROR: `, err);
        
            if (err && err.code) {
              const errorCode: string = err.code;
        
              if (errorCode === 'auth/invalid-credential') {
                console.log('Incorrect login credentials');
                ref.innerHTML = 'Incorrect login credentials'
                ref.classList.add(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                setTimeout(() => {
                    ref.classList.remove(`${soreStyle.showFormMsg}`, `${soreStyle.error}`)
                }, 10000)
              } else {
                console.log(errorCode);
              }
            }
            throw err
          }
    }


    return {
        $getAllDocuments,
        $search,
        $addNewDocument,
        $handleSearchingValue,
        $handleSearchResults,
        $registrationUser,
        $isUserLogged,
        $loginUser,
        searchingValue,
        searchResults
    }
}

export default Methods