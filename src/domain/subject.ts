export type Subject = {
  id: string;
  name: string;
  firstGrade: number;
  secondGrade: number | null;
};

export type ValidationResult = {
  nameError?: string;
  firstGradeError?: string;
  normalizedName?: string;
  parsedFirstGrade?: number;
};

export function normalizeSubjectName(name: string): string {
  return name.trim().toLocaleLowerCase('es-ES');
}

export function parseGradeInput(value: string | number | null | undefined): number | null {
  const raw = typeof value === 'string' ? value.trim() : value === undefined || value === null ? '' : String(value).trim();

  if (raw === '') {
    return null;
  }

  const normalized = raw.replace(',', '.');

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const grade = Number(normalized);

  if (!Number.isFinite(grade) || grade < 0 || grade > 10) {
    return null;
  }

  return Number(grade.toFixed(2));
}

export function formatGradeForDisplay(value: number): string {
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function validateSubjectForm({
  name,
  firstGrade,
  existingNames,
}: {
  name: string;
  firstGrade: string;
  existingNames: string[];
}): ValidationResult {
  const trimmedName = name.trim();
  const normalizedName = normalizeSubjectName(trimmedName);
  const parsedFirstGrade = parseGradeInput(firstGrade);
  const errors: ValidationResult = {};

  if (trimmedName === '') {
    errors.nameError = 'Ingresa el nombre de la materia.';
  } else if (existingNames.some((existingName) => normalizeSubjectName(existingName) === normalizedName)) {
    errors.nameError = 'La materia ya existe.';
  }

  if (firstGrade.trim() === '') {
    errors.firstGradeError = 'Ingresa la nota del primer bimestre.';
  } else if (parsedFirstGrade === null) {
    errors.firstGradeError = 'La nota debe estar entre 0 y 10.';
  } else {
    errors.parsedFirstGrade = parsedFirstGrade;
  }

  if (normalizedName !== '') {
    errors.normalizedName = normalizedName;
  }

  return errors;
}

export function createSubject({
  name,
  firstGrade,
  existingNames,
}: {
  name: string;
  firstGrade: string;
  existingNames: string[];
}): Subject | null {
  const validation = validateSubjectForm({ name, firstGrade, existingNames });

  if (validation.nameError || validation.firstGradeError || validation.parsedFirstGrade === undefined) {
    return null;
  }

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: name.trim(),
    firstGrade: validation.parsedFirstGrade,
    secondGrade: null,
  };
}
