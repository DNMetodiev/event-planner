import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, arrayUnion, increment, deleteDoc, query, where } from 'firebase/firestore';

import { app } from '../firebase-config';

const db = getFirestore(app);

export const getEvents = async () => {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  return eventSnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
  }));
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

export const updateEvent = async (eventId, eventData) => {
  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, eventData);
};

export const deleteEvent = async (eventId) => {
  const eventRef = doc(db, 'events', eventId);
  await deleteDoc(eventRef);
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
  return Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
    const commentData = docSnapshot.data();
    const userRef = doc(db, 'users', commentData.userId);
    const userSnap = await getDoc(userRef);
    return {
      id: docSnapshot.id,
      text: commentData.text,
      userName: userSnap.exists() ? userSnap.data().name : "Anonymous",
      createdAt: commentData.createdAt.toDate(),
      ...commentData
    };
  }));
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

export const getUserInteractions = async (userId) => {
  const likedEvents = [];
  const commentedEvents = [];

  const likedEventsQuery = query(collection(db, 'events'), where('likes', 'array-contains', userId));
  const likedEventsSnapshot = await getDocs(likedEventsQuery);
  likedEventsSnapshot.forEach(doc => {
    likedEvents.push({ id: doc.id, ...doc.data() });
  });

  const eventsSnapshot = await getDocs(collection(db, 'events'));
  await Promise.all(eventsSnapshot.docs.map(async (eventDoc) => {
    const commentsSnapshot = await getDocs(collection(db, 'events', eventDoc.id, 'comments'));
    let commented = false;
    commentsSnapshot.forEach(commentDoc => {
      if (commentDoc.data().userId === userId) {
        commented = true;
      }
    });
    if (commented) {
      commentedEvents.push({ id: eventDoc.id, ...eventDoc.data() });
    }
  }));

  return { likedEvents, commentedEvents };
};