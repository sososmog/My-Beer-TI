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

let statsCache: Record<string, number> | null = null;

export async function getAllStats(): Promise<Record<string, number>> {
  if (statsCache) return statsCache;
  if (!db) return {};
  try {
    const ref = doc(db, COLLECTION, DOCUMENT);
    const snap = await getDoc(ref);
    statsCache = snap.exists() ? (snap.data() as Record<string, number>) : null;
    return statsCache ?? {};
  } catch (e) {
    console.warn('[resultStats] getAllStats failed:', e);
    return {};
  }
}

export function prefetchStats(): void {
  getAllStats();
}

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
    // 写入后同步本地缓存，避免图鉴仍显示旧数据
    if (statsCache) {
      statsCache[tag] = (statsCache[tag] || 0) + 1;
    } else {
      statsCache = { [tag]: 1 };
    }
  } catch (e) {
    console.warn('[resultStats] recordResult failed:', e);
  }
}

