import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

import { app } from '../firebase-config';

const db = getFirestore(app);

export const getEvents = async () => {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
  }));
  return eventList;
};

export const addEvent = async (eventData) => {
  const eventsCol = collection(db, 'events');
  const docRef = await addDoc(eventsCol, eventData);
  return docRef.id;
};

export const getEventById = async (eventId) => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('No such document!');
  }
};

export const likeEvent = async (eventId) => {
  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    likes: increment(1)
  });
};

export const getEventComments = async (eventId) => {
  const commentsRef = collection(db, 'events', eventId, 'comments');
  const querySnapshot = await getDocs(commentsRef);

  const commentsWithUser = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
    const commentData = docSnapshot.data();
    const userRef = doc(db, 'users', commentData.userId);
    const userSnap = await getDoc(userRef);

    const createdAt = commentData.createdAt ? commentData.createdAt.toDate() : new Date();

    return {
      id: docSnapshot.id,
      text: commentData.text,
      userName: userSnap.exists() ? userSnap.data().name : "Anonymous",
      createdAt,
      ...commentData
    };
  }));

  return commentsWithUser;
};

export const addCommentToEvent = async (eventId, { userId, comment }) => {
  const eventRef = doc(db, 'events', eventId);
  const commentsCol = collection(eventRef, 'comments');
  const commentData = {
    text: comment,
    userId: userId,
    createdAt: new Date()
  };
  await addDoc(commentsCol, commentData);
};

export const buyEvent = async (eventId, userId) => {
  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    buyers: arrayUnion(userId)
  });
};