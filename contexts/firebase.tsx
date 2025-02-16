'use client';
import { fireApp } from '@/lib/firebase';
import parseEvents from '@/parsers/event';
import { FirebaseApp } from 'firebase/app';
import { getUser } from '@/Firestore/users';
import parseEventUser from '@/parsers/user';
import { getDepartments } from '@/Firestore/departments';
import React, { createContext, useContext } from 'react';
import { getEventCategories } from '@/Firestore/eventCategories';
import { collection, doc, Firestore, getFirestore, onSnapshot } from 'firebase/firestore';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { Database, getDatabase, ref, onValue, off } from 'firebase/database';
import { getFAQ } from '@/Firestore/faq';
import { getadministrationMembers } from '@/Firestore/administration';

type EventsObjectType = {
  [key: string]: Events;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

interface FirebaseContextProps {
  fireApp: FirebaseApp;
  realtimeDB: Database;
  fireAuth: Auth | null;
  firestoreDB: Firestore;
  fireUserData: User | null;
  fireUserDoc: EventUser | null;
  faqs: FAQ[] | null;
  events: Events[] | null;
  eventsObject: EventsObjectType;
  departments: Department[];
  administrationMembers: AdministrationMember[];
  eventCategories: EventCategory[];
  registeredEvents: AllRegisteredEvent | null;
  registeredEventsSet: Set<string>;
  LoginGoogle: (redirect?: boolean) => void;
  LogoutGoogle: () => void;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export const useFirebase = (): FirebaseContextProps | null => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const realtimeDB = getDatabase(fireApp)
  const firestoreDB = getFirestore(fireApp);
  const [fireUserData, setFireUserData] = React.useState<User | null>(null);
  const [fireUserDoc, setFireUserDoc] = React.useState<EventUser | null>(null);
  const [fireAuth, setFireAuth] = React.useState<ReturnType<typeof getAuth> | null>(null);
  
  const [faqs, setFaqs] = React.useState<FAQ[] | null>([])
  const [events, setEvents] = React.useState<Events[] | null>(null)
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [administrationMembers, setAdministrationMembers] = React.useState<AdministrationMember[]>([]);
  const [registeredEvents, setRegisteredEvents] = React.useState<AllRegisteredEvent | null>(null)
  const [eventCategories, setEventCategories] = React.useState<EventCategory[]>([{ id: 'all_events', name: 'All Events', order: 0 }])
  const registeredEventsSet = React.useMemo(() => new Set(Object.keys(registeredEvents || {})), [registeredEvents])
  const eventsObject = React.useMemo(() => events ? events.reduce<EventsObjectType>((acc, event) => {
    acc[event.id as string] = event;
    return acc;
  }, {} as EventsObjectType) : {}, [events])

  React.useLayoutEffect(() => {
    const auth = getAuth(fireApp);
    setFireAuth(auth);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser == null) return;
      getUser(currentUser.uid)
        .then(data => setFireUserDoc(data))
        .catch(() => {})
        .finally(() => setFireUserData(currentUser))
    });
    return () => unsubscribe();
  }, [fireUserData]);

  React.useLayoutEffect(() => {
    getFAQ()
      .then(data => setFaqs(() => data))
    getDepartments()
      .then(data => setDepartments(() => data))
      getadministrationMembers()
      .then(data => setAdministrationMembers(() => data))
    getEventCategories()
      .then(data => setEventCategories(prev => {
        const newCategories = data.filter(newCat => !prev.find(prevCat => prevCat.id === newCat.id));
        return [...prev, ...newCategories];
      }))
      
    const eventsCollectionRef = collection(getFirestore(fireApp), 'events');
    const unsubscribeEvents = onSnapshot(eventsCollectionRef, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => parseEvents(doc.id, doc.data()));
      setEvents(eventsData);
    });

    if (fireUserData) {
      var regsiteredEventsRef = ref(getDatabase(fireApp), `/registeredEvents/${fireUserData.uid}`);
      onValue(regsiteredEventsRef, (snapshot) => {
        const data = snapshot.val();
        if (data == null) return setRegisteredEvents({});
        setRegisteredEvents(data ? Object.keys(data).reduce<AllRegisteredEvent>((acc, eventId) => {
          acc[eventId] = data[eventId];
          return acc;
        }, {} as AllRegisteredEvent) : {});
      });

      const userDocRef = doc(getFirestore(fireApp), `users/${fireUserData.uid}`);
      var unsubscribeUser = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setFireUserDoc(parseEventUser(doc.id, doc.data()));
        } else {
          setFireUserDoc(null)
        }
      });
    }
    
    return () => {
      unsubscribeEvents();
      if (fireUserData) {
        off(regsiteredEventsRef)
        unsubscribeUser();        
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
      fireApp, fireAuth, fireUserDoc, fireUserData, realtimeDB, firestoreDB,
      faqs, events, eventsObject, departments, administrationMembers, eventCategories, registeredEvents, registeredEventsSet,
      LoginGoogle, LogoutGoogle
     }}>
      {children}
    </FirebaseContext.Provider>
  );
};