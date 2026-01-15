import { doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { db } from "../firebaseConfig";

type StorageSetter<T> = (value: T | ((prevValue: T) => T)) => void;

const COLLECTION_NAME = "storage";

const readLocalStorage = <T,>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(key);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.warn("Failed to parse localStorage entry", error);
    return null;
  }
};

const writeLocalStorage = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to write localStorage entry", error);
  }
};

export const useFirebaseStorage = <T,>(
  key: string,
  defaultValue: T
): [T, StorageSetter<T>] => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    let isActive = true;

    const loadValue = async () => {
      try {
        const snapshot = await getDoc(doc(db, COLLECTION_NAME, key));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.value !== undefined && isActive) {
            setValue(data.value as T);
            return;
          }
        }
      } catch (error) {
        console.warn("Failed to load Firebase storage", error);
      }

      const localValue = readLocalStorage<T>(key);
      if (localValue !== null && isActive) {
        setValue(localValue);
      }
    };

    void loadValue();

    return () => {
      isActive = false;
    };
  }, [key]);

  const persistValue = useCallback(
    async (nextValue: T) => {
      writeLocalStorage(key, nextValue);

      try {
        await setDoc(doc(db, COLLECTION_NAME, key), { value: nextValue });
      } catch (error) {
        console.warn("Failed to persist Firebase storage", error);
      }
    },
    [key]
  );

  const setAndPersist = useCallback<StorageSetter<T>>(
    (nextValue) => {
      setValue((previous) => {
        const resolved =
          typeof nextValue === "function"
            ? (nextValue as (prev: T) => T)(previous)
            : nextValue;

        void persistValue(resolved);

        return resolved;
      });
    },
    [persistValue]
  );

  return [value, setAndPersist];
};
