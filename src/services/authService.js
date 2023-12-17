import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import '../firebase-config'

const auth = getAuth();

const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

const getCurrentUser = () => {
  return auth.currentUser;
};

const onAuthChange = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { register, login, logout, getCurrentUser, onAuthChange };