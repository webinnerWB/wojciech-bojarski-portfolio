import { addDoc, collection, getDocs, getFirestore, DocumentData, QuerySnapshot, CollectionReference, query, where, QueryDocumentSnapshot, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,   } from 'firebase/auth'
import { getAuth} from 'firebase/auth'
import {firestore} from './FirebaseConfig'
import React, { useState, ChangeEvent, useEffect } from "react"
import { useRouter } from 'next/router' 

import storeStyle from '../../../style/store.module.scss'

const Methods = () => {

  interface UserData {
    uuid: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    street: string,
    houseNumber: string,
    city: string,
    postalCode: string,
    country: string,
    customer: boolean
}

    const db = getFirestore(firestore)
    const router = useRouter()
    const [searchingValue, setSearchingValue] = useState<string>('')
    const [searchResults, setSearchRelusts] = useState<DocumentData[] | undefined>([])
    const [valuesArray, setValuesArray] = useState<string[]>([''])
    const [user, setUser] = useState<UserData>()

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
          const collectionRef: CollectionReference = collection(db, collectionName)
      
          const queryName = query(collectionRef, where('name', 'array-contains', smallFirstLettervalue))
          const snapshotName = await getDocs(queryName)
      
      
          if (snapshotName.empty) {
            console.error('No documents match your criteria!!!')
            return null
          } else {
            return snapshotName
          }
        } catch (err) {
          console.error(`Error: `, err)
          throw err
        }
      }

      const $handleFilterCategory = async (value: string) => {
        try {
          const toLowerCaseName = value.toLowerCase()
          if(valuesArray.length > 1 && valuesArray.includes(toLowerCaseName)) {
            setValuesArray(prevEl => {
              return prevEl.filter(el => el !== toLowerCaseName)
            })
          }else{
            setValuesArray(prevEl => {return [...prevEl, toLowerCaseName]})
          }
        } catch (err) {
          console.error(`Error: `, err)
          throw err
        }
      }

      useEffect(() => {

        const fetchData = async () => {
          const collectionRef: CollectionReference = collection(db, 'products')
          const queryCategory = query(collectionRef, where('category', 'array-contains-any', valuesArray))
          const snapshotCategory = await getDocs(queryCategory)
          
          if (snapshotCategory.empty && valuesArray.length > 1) {
            console.error('No documents match your criteria!!!')
            setSearchRelusts(undefined)
            return null
          } else {
            setSearchRelusts(snapshotCategory.docs.map(el => el.data()))
          }
        }
        fetchData()
      }, [valuesArray])

      const $handleSearchResults = async (value: string) => {
        try {
          const query = await $search('products', value)
      
          if (query) {
            setSearchRelusts(query.docs.map(el => el.data()))
          } else {
            console.error('No documents match your criteria!!!')
            setSearchRelusts(undefined)
          }
        } catch (err) {
          console.error(`Error: `, err)
          throw err
        }
      }
      const $getDocsByFieldValue = async (collectionR: string, value: string, searchingField: string) => {
        let ob: DocumentData[] = []
        try {
          const collectionRef: CollectionReference = collection(db, collectionR)
          const queryRef = query(collectionRef, where(searchingField, '==', value))
          const docRef = await getDocs(queryRef)
          if(!docRef.empty) {
            docRef.forEach(el => {
              ob.push(el.data())
            })
          }
          return ob
        } catch(err) {
          console.error(`Error: `, err)
        }
      }

    const $removeDocument = async (collectionR: string, value: string|number, searchingField: string) => {
      try{
        const collectionReff: CollectionReference = collection(db, collectionR)
        const queryREf = query(collectionReff, where(searchingField, '==', value))
        const docRef = await getDocs(queryREf)
        if(!docRef.empty) {
          docRef.forEach(el => {
              deleteDoc(el.ref)
              console.log('Document successfully deleted!');
          })
        } else {
          console.log('No documents found matching the query.');
        }
      }catch(err) {
        console.error(`Error: `, err)
      }
    }

    const $getDocByFieldValue = async (collectionR: string, value: string, searchingField: string) => {
      let ob = {}
      try {
        const collectionRef: CollectionReference = collection(db, collectionR)
        const queryRef = query(collectionRef, where(searchingField, '==', value))
        const docRef = await getDocs(queryRef)
        if(!docRef.empty) {
          docRef.forEach(el => {
            ob = el.data()
          })
        }
        return ob
      } catch(err) {
        console.error(`Error: `, err)
      }
    }
      
    const $updateFieldInDocument = async (collectionR: string, searchingField: string, searchingFiledValue: string, newValue: string, fieldToUpdate: string) => {
      try {
        const collectionRef: CollectionReference = collection(db, collectionR)
        const queryRef = query(collectionRef, where(searchingField, '==', searchingFiledValue))
        const docsRef = await getDocs(queryRef)
        if(!docsRef.empty) {
          const doc = docsRef.docs[0]
          await updateDoc(doc.ref, {[fieldToUpdate]: newValue})
          console.log(`Field: ${fieldToUpdate} has been successfully updated`)
        } else {
          console.error(`Field: ${fieldToUpdate} not found`)
        }
      } catch(err) {
        console.error(`Error: `, err)
      }
    }

    const $updateDocument = async (collectionR: string, searchingField: string, searchingFiledValue: string|number, obj: any) => {
      try {
        const collectionRef: CollectionReference = collection(db, collectionR)
        const queryRef = query(collectionRef, where(searchingField, '==', searchingFiledValue))
        const docsRef = await getDocs(queryRef)
        if(!docsRef.empty) {
          const doc = docsRef.docs[0]
          await updateDoc(doc.ref, obj)
          console.log(`Document has been successfully updated`)
        } else {
          console.error(`Document not found`)
          console.error(`searchingField ${searchingField}`)
          console.error(`searchingFiledValue ${searchingFiledValue}`)
        }
      } catch(err) {
        console.error(`Error: `, err)
      }
    }

    
    const $addNewDocument = async (collectionR: string, document: object) => {
        try {
            const collectionRef: CollectionReference<DocumentData> =  collection(db, collectionR)
            await addDoc(collectionRef, document)
                .then(doc => {
                    console.log(`success `, doc.id)
                })
        } catch (err) {
            console.error(`Error: `, err)
            throw err
        }
    }

    const $handleSearchingValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValuesArray([''])
        setSearchingValue(e.target.value)
        return searchingValue
    }

    const $isUserLogged = (): Promise<boolean> => {
        const auth = getAuth(firestore)
    
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async user => {
                if (user) {
                  resolve(true)
                  const userCollection = collection(db, 'users')
                  const userQuery = query(userCollection, where('uuid', '==', user.uid))
                  const userSnapshot = await getDocs(userQuery)
                  if(!userSnapshot.empty){
                    userSnapshot.forEach(doc => {
                      setUser(doc.data() as UserData)
                    })
                  }
                } else {
                  resolve(false)
                  setUser(undefined)
                }
            }, err => {
                console.error(`ERROR: `, err)
                reject(err)
            })
        })
    }
    useEffect(() => {
      $isUserLogged()
    }, [])

    const $registrationUser = async (formData: DocumentData, ref: HTMLSpanElement):Promise<void> => {
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
            ref.scrollIntoView({ behavior: 'smooth' })
            ref.innerHTML = 'Registration was successful, you will be automatically logged into your account immediately.'
            ref.classList.add(`${storeStyle.showFormMsg}`, `${storeStyle.success}`)
                setTimeout(() => {
                    ref.classList.remove(`${storeStyle.showFormMsg}`, `${storeStyle.success}`)
                    router.push('/store')
                }, 3500)
        } catch (err: any) {
            console.error(`ERROR: `, err)
        
            if (err && err.code) {
              const errorCode: string = err.code
        
              if (errorCode === 'auth/weak-password') {
                  console.error('The password is too weak!')
                  ref.scrollIntoView({ behavior: 'smooth' })
                  ref.innerHTML = 'The password is too weak!'
                  ref.classList.add(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                  setTimeout(() => {
                      ref.classList.remove(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                  }, 10000)
              } else if(errorCode === 'auth/email-already-in-use') {
                  ref.scrollIntoView({ behavior: 'smooth' })
                  console.error('E-mail address has already been used')
                  ref.innerHTML = 'E-mail address has already been used '
                  ref.classList.add(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                  setTimeout(() => {
                      ref.classList.remove(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                  }, 10000)
              } else {
                console.error(errorCode)
              }
            }
            throw err
          }
    }

    const $loginUser = async (formData: DocumentData, ref: HTMLSpanElement): Promise<void> => {
        try {
            const auth = getAuth(firestore)
            await signInWithEmailAndPassword(auth, formData.email, formData.password)
            router.push('/store')
        } catch (err: any) {
            console.error(`ERROR: `, err)
        
            if (err && err.code) {
              const errorCode: string = err.code
        
              if (errorCode === 'auth/invalid-credential') {
                console.error('Incorrect login credentials')
                ref.innerHTML = 'Incorrect login credentials'
                ref.classList.add(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                setTimeout(() => {
                    ref.classList.remove(`${storeStyle.showFormMsg}`, `${storeStyle.error}`)
                }, 10000)
              } else {
                console.error(errorCode)
              }
            }
            throw err
          }
    }

    const $logOut = async () => {
      try {
        const auth = getAuth(firestore)
        await signOut(auth)
        router.push('/store')
      } catch(err) {
        console.error(`Error: `, err)
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
        $handleFilterCategory,
        $updateFieldInDocument,
        $getDocsByFieldValue,
        $getDocByFieldValue,
        $logOut,
        $removeDocument,
        $updateDocument,
        searchingValue,
        searchResults,
        valuesArray,
        user
    }
}

export default Methods