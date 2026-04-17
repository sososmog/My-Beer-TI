import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'stats';
const DOCUMENT = 'results';

export async function recordResult(tag: string): Promise<void> {
  if (!db) return;
  try {
    const ref = doc(db, COLLECTION, DOCUMENT);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { [tag]: increment(1) });
    } else {
      await setDoc(ref, { [tag]: 1 });
    }
  } catch (e) {
    console.warn('[resultStats] recordResult failed:', e);
  }
}

export async function getAllStats(): Promise<Record<string, number>> {
  if (!db) return {};
  try {
    const ref = doc(db, COLLECTION, DOCUMENT);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as Record<string, number>) : {};
  } catch (e) {
    console.warn('[resultStats] getAllStats failed:', e);
    return {};
  }
}
