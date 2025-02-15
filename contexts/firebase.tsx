'use client';
import { fireApp } from '@/lib/firebase';
import { getUser } from '@/Firestore/users';
import { getEvents } from '@/Firestore/events';
import { getDepartments } from '@/Firestore/departments';
import React, { createContext, useContext } from 'react';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getEventCategories } from '@/Firestore/eventCategories';
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Database, getDatabase, ref, onValue, off, set, update } from 'firebase/database';

interface FirebaseProviderProps {
  children: React.ReactNode;
}

interface FirebaseContextProps {
  realtimeDB: Database;
  fireAuth: Auth | null;
  firestoreDB: Firestore;
  fireUserData: User | null;
  fireUserDoc: EventUser | null;
  events: Events[] | null;
  departments: Department[];
  eventCategories: EventCategory[];
  registeredEvents: AllRegisteredEvent | null;
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
    getEvents()
      .then(data => setEvents(data))

    if (fireUserData) {
      const dbRef = ref(getDatabase(fireApp), `/registeredEvents/${fireUserData.uid}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data == null) return;
        setRegisteredEvents(data ? Object.keys(data).reduce<AllRegisteredEvent>((acc, eventId) => {
          acc[eventId] = data[eventId];
          return acc;
        }, {} as AllRegisteredEvent) : {});
      });
      return () => off(dbRef);
    }
  }, [fireUserData]);

  return (
    <FirebaseContext.Provider value={{ 
      fireAuth, fireUserDoc, fireUserData, realtimeDB, firestoreDB,
      events, departments, eventCategories, registeredEvents
     }}>
      {children}
    </FirebaseContext.Provider>
  );
};