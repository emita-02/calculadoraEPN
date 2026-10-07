import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Subject } from '@/domain/subject';

export const SUBJECTS_STORAGE_KEY = 'calculadoraEPN:subjects';

export async function loadSubjects(): Promise<Subject[]> {
  try {
    const storedValue = await AsyncStorage.getItem(SUBJECTS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as Subject[];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export async function saveSubjects(subjects: Subject[]): Promise<void> {
  await AsyncStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
}
