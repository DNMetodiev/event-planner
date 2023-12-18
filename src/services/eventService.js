import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from '../firebase-config';
import { uploadImageToStorage } from '../services/firebaseStorageService';

const db = getFirestore(app);

export const getEvents = async () => {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return eventList;
};

export const addEvent = async (eventData) => {
  const eventsCol = collection(db, 'events');
  const docRef = await addDoc(eventsCol, eventData);
  return docRef.id;
};

export const uploadEventImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  return uploadImageToStorage(imageFile);
};