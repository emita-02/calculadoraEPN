import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadSubjects, saveSubjects } from '../subjects-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('subjects storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads an empty list when there are no stored subjects', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await expect(loadSubjects()).resolves.toEqual([]);
  });

  it('loads previously saved subjects', async () => {
    const subjects = [
      {
        id: '1',
        name: 'Historia',
        firstGrade: 9.5,
        secondGrade: null,
      },
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(subjects));

    await expect(loadSubjects()).resolves.toEqual(subjects);
  });

  it('saves a subject list in local storage', async () => {
    const subjects = [
      {
        id: '1',
        name: 'Historia',
        firstGrade: 9.5,
        secondGrade: null,
      },
    ];

    await saveSubjects(subjects);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'calculadoraEPN:subjects',
      JSON.stringify(subjects),
    );
  });

  it('propagates a storage write failure so the screen can inform the student', async () => {
    const error = new Error('Storage unavailable');
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);

    await expect(saveSubjects([])).rejects.toBe(error);
  });
});
