// db.ts
import { openDB } from "idb";

const DB_NAME = "printflow-db";
const STORE = "cart";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE);
    }
  },
});

export const saveCart = async (data: any) => {
  const db = await dbPromise;
  await db.put(STORE, data, "cart");
};

export const loadCart = async () => {
  const db = await dbPromise;
  return db.get(STORE, "cart");
};

export const clearCartDB = async () => {
  const db = await dbPromise;
  await db.delete(STORE, "cart");
};