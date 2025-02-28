'use client';
import { getFAQ } from '@/Firestore/faq';
import { fireApp } from '@/lib/firebase';
import parseEvents from '@/parsers/event';
import { FirebaseApp } from 'firebase/app';
import { getUser } from '@/Firestore/users';
import parseEventUser from '@/parsers/user';
import { DepartmentsVar } from '@/variables';
import parsePayments from '@/parsers/payments';
import React, { createContext, useContext } from 'react';
import { Database, getDatabase } from 'firebase/database';
import { getAdministrationMembers } from '@/Firestore/administration';
import { collection, doc, Firestore, getFirestore, onSnapshot } from 'firebase/firestore';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, ParsedToken, signInWithPopup, signOut, User } from 'firebase/auth';

type EventsObjectType = {
  [key: string]: Events;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export interface UserToken extends User {
  accessToken?: string;
}

export interface CustomClaims extends ParsedToken {
  roles?: string[];
  departmentId?: string;
}

interface FirebaseContextProps {
  fireApp: FirebaseApp;
  realtimeDB: Database;
  fireAuth: Auth | null;
  firestoreDB: Firestore;
  fireUserData: UserToken | null;
  fireUserDoc: EventUser | null;
  fireCustomClaims: CustomClaims | null;
  faqs: FAQ[] | null;
  events: Events[] | null;
  eventsObject: EventsObjectType;
  departments: Department[];
  administrationMembers: AdministrationMember[];
  eventPayments: EventUserPayments | null;
  checkedInEventsSet: Set<string>;
  LoginGoogle: (redirect?: boolean) => void;
  LogoutGoogle: () => void;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export const useFirebase = (): FirebaseContextProps | null => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const realtimeDB = getDatabase(fireApp)
  const firestoreDB = getFirestore(fireApp);
  const [fireUserData, setFireUserData] = React.useState<UserToken | null>(null);
  const [fireUserDoc, setFireUserDoc] = React.useState<EventUser | null>(null);
  const [fireAuth, setFireAuth] = React.useState<ReturnType<typeof getAuth> | null>(null);
  const [fireCustomClaims, setFireCustomClaims] = React.useState<CustomClaims | null>(null)
  
  const departments = DepartmentsVar as Department[];
  const [faqs, setFaqs] = React.useState<FAQ[] | null>([])
  const [events, setEvents] = React.useState<Events[] | null>(null)
  const [eventPayments, setEventPayments] = React.useState<EventUserPayments | null>(null)
  const [administrationMembers, setAdministrationMembers] = React.useState<AdministrationMember[]>([]);
  const checkedInEventsSet = React.useMemo(() => new Set(Object.keys(eventPayments?.events || {})), [eventPayments])
  const eventsObject = React.useMemo(() => events ? events.reduce<EventsObjectType>((acc, event) => {
    acc[event.id as string] = event;
    return acc;
  }, {} as EventsObjectType) : {}, [events])

  React.useLayoutEffect(() => {
    const auth = getAuth(fireApp);
    setFireAuth(auth);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if ((currentUser == null) || (auth == null)) return;
      getUser(currentUser.uid)
        .then(data => setFireUserDoc(data))
        .catch(() => {
          console.log("Error fetching user Doc")
        })
        .finally(() => setFireUserData(currentUser))
      auth.currentUser?.getIdTokenResult()
        .then((idTokenResult) => {
          console.log(idTokenResult)
          setFireCustomClaims(idTokenResult.claims)
        })
        .catch((error) => {
          console.log("Error fetching custom claims:", error);
        });
    });
    return () => unsubscribe();
  }, [fireUserData]);

  React.useLayoutEffect(() => {
    getFAQ()
      .then(data => setFaqs(() => data))
    getAdministrationMembers()
      .then(data => setAdministrationMembers(() => data))
      
    const eventsCollectionRef = collection(getFirestore(fireApp), 'events');
    const unsubscribeEvents = onSnapshot(eventsCollectionRef, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => parseEvents(doc.id, doc.data()));
      setEvents(eventsData);
    });

    if (fireUserData) {
      const userDocRef = doc(getFirestore(fireApp), `users/${fireUserData.uid}`);
      var unsubscribeUser = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setFireUserDoc(parseEventUser(doc.id, doc.data()));
        } else {
          setFireUserDoc(null)
        }
      });
      const paymentDocRef = doc(getFirestore(fireApp), `payments/${fireUserData.uid}`);
      var unsubscribePayment = onSnapshot(paymentDocRef, (doc) => {
        if (doc.exists()) {
          setEventPayments(parsePayments(doc.id, doc.data()));
        } else {
          setEventPayments(null);
        }
      });
    }
    
    return () => {
      unsubscribeEvents();
      if (fireUserData) {
        unsubscribeUser();     
        unsubscribePayment()   ;
      }
    };
  }, [fireUserData]);
  
  async function LoginGoogle(redirect = true) {
    if (fireAuth == null) return;
    try {
      const data = await signInWithPopup(fireAuth, new GoogleAuthProvider());
      getUser(data?.user.uid)
        .then(() => {
          if (redirect) {
            window.location.href = '/profile';
          }
        })
        .catch(() => {});
    } catch (e) {
      console.error(e)
    }
  }

  async function LogoutGoogle() {
    if (fireAuth == null) return;
    await signOut(fireAuth);
    window.location.href = '/'
  }
  
  return (
    <FirebaseContext.Provider value={{ 
      fireApp, fireAuth, fireUserDoc, fireUserData, realtimeDB, firestoreDB, fireCustomClaims,
      faqs, events, eventsObject, departments, administrationMembers, eventPayments, checkedInEventsSet,
      LoginGoogle, LogoutGoogle
     }}>
      {children}
    </FirebaseContext.Provider>
  );
};