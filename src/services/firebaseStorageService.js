import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase-config'; // Make sure this path is correct

const storage = getStorage(app);

export const uploadImageToStorage = async (file) => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const storageRef = ref(storage, `events/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};