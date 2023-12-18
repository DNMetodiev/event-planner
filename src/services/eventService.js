import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from '../firebase-config';

const db = getFirestore(app);

// Function to fetch events from Firestore
export const getEvents = async () => {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return eventList;
};

// Function to add a new event to Firestore
export const addEvent = async (eventData) => {
  const eventsCol = collection(db, 'events');
  const docRef = await addDoc(eventsCol, eventData);
  return docRef.id; // Returns the newly created document's ID
};