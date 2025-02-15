'use client';
import { fireApp } from '@/lib/firebase';
import { FirebaseApp } from 'firebase/app';
import { getUser } from '@/Firestore/users';
import { getDepartments } from '@/Firestore/departments';
import React, { createContext, useContext } from 'react';
import { collection, doc, Firestore, getFirestore, onSnapshot } from 'firebase/firestore';
import { getEventCategories } from '@/Firestore/eventCategories';
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Database, getDatabase, ref, onValue, off } from 'firebase/database';
import parseEventUser from '@/parsers/user';
import parseEvents from '@/parsers/event';

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
  events: Events[] | null;
  eventsObject: EventsObjectType;
  departments: Department[];
  eventCategories: EventCategory[];
  registeredEvents: AllRegisteredEvent | null;
  registeredEventsSet: Set<string>;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export const useFirebase = (): FirebaseContextProps | null => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const realtimeDB = getDatabase(fireApp)
  const firestoreDB = getFirestore(fireApp);
  const [fireUserData, setFireUserData] = React.useState<User | null>(null);
  const [fireUserDoc, setFireUserDoc] = React.useState<EventUser | null>(null);
  const [fireAuth, setFireAuth] = React.useState<ReturnType<typeof getAuth> | null>(null);
  
  const [events, setEvents] = React.useState<Events[] | null>(null)
  const [departments, setDepartments] = React.useState<Department[]>([]);
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
    getDepartments()
      .then(data => setDepartments(() => data))
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

  return (
    <FirebaseContext.Provider value={{ 
      fireApp, fireAuth, fireUserDoc, fireUserData, realtimeDB, firestoreDB,
      events, eventsObject, departments, eventCategories, registeredEvents, registeredEventsSet
     }}>
      {children}
    </FirebaseContext.Provider>
  );
};