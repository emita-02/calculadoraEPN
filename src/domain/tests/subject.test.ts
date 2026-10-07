import {
    createSubject,
    formatGradeForDisplay,
    normalizeSubjectName,
    parseGradeInput,
    validateSubjectForm,
} from '../subject';

describe('subject domain logic', () => {
  it('normalizes names by trimming spaces and ignoring case', () => {
    expect(normalizeSubjectName('  Matemáticas  ')).toBe('matemáticas');
    expect(normalizeSubjectName('MATEMÁTICAS')).toBe('matemáticas');
  });

  it('accepts decimal inputs with comma or dot and formats them for display', () => {
    expect(parseGradeInput('8,5')).toBe(8.5);
    expect(parseGradeInput('8.5')).toBe(8.5);
    expect(formatGradeForDisplay(8.5)).toBe('8,5');
  });

  it('rejects empty and out of range values', () => {
    expect(parseGradeInput('')).toBeNull();
    expect(parseGradeInput('10.01')).toBeNull();
    expect(parseGradeInput('-1')).toBeNull();
    expect(parseGradeInput('11')).toBeNull();
  });

  it('validates duplicated and missing values', () => {
    const result = validateSubjectForm({
      name: '  Matemáticas  ',
      firstGrade: '8,5',
      existingNames: ['matemáticas'],
    });

    expect(result.nameError).toBe('La materia ya existe.');
    expect(result.firstGradeError).toBeUndefined();

    const emptyResult = validateSubjectForm({
      name: '',
      firstGrade: '',
      existingNames: [],
    });

    expect(emptyResult.nameError).toBe('Ingresa el nombre de la materia.');
    expect(emptyResult.firstGradeError).toBe('Ingresa la nota del primer bimestre.');
  });

  it('creates a valid subject with a pending second bimestre grade', () => {
    const subject = createSubject({
      name: 'Física',
      firstGrade: '9.75',
      existingNames: [],
    });

    expect(subject).toMatchObject({
      name: 'Física',
      firstGrade: 9.75,
      secondGrade: null,
    });
  });
});
