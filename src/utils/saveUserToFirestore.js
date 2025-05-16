// src/utils/saveUserToFirestore.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const saveUserToFirestore = async (user) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);

  await setDoc(userRef, {
    uid: user.uid,
    nome: user.displayName || user.nome || '',
    email: user.email,
    telefone: user.telefone || '',
    foto: user.photoURL || '',
    criadoEm: serverTimestamp()
  }, { merge: true });
};
