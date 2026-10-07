# Plan — HU-001 Registrar una materia

## Archivos y responsabilidades
- src/domain/subject.ts: lógica pura de validación, normalización, creación y visualización de notas.
- src/domain/tests/subject.test.ts: pruebas de la lógica de dominio con Jest.
- src/storage/subjects-storage.ts: persistencia local y carga de materias.
- src/app/index.tsx: pantalla principal con formulario y lista para registrar materias.

## Funciones puras
- normalizeSubjectName(name): recorta espacios y normaliza para comparar nombres sin distinguir mayúsculas/minúsculas.
- parseGradeInput(value): acepta nota con coma o punto, valida rango 0 a 10 y devuelve número o error.
- validateSubjectForm({ name, firstGrade }): determina errores de nombre, nota y duplicados.
- formatGradeForDisplay(value): devuelve nota con coma decimal.
- createSubject({ name, firstGrade }): crea la materia si la validación pasa.

## Persistencia
- Se usa AsyncStorage con una clave fija para almacenar el array de materias.
- La carga se realiza al iniciar la pantalla y se convierte a estado React.
- La escritura ocurre después de validar y antes de renderizar la lista actualizada.
- Si la escritura falla, se muestra un mensaje al usuario y se conserva el formulario.

## Algoritmo en pseudocódigo
1. Leer nombre e ingreso de nota del formulario.
2. Normalizar nombre y parsear la nota.
3. Validar nombre vacío, nota vacía, rango y duplicado.
4. Si hay errores, mostrarlos en el formulario y no guardar.
5. Si todo es válido, crear la materia con secondGrade = null.
6. Guardar la lista actualizada en almacenamiento local.
7. Renderizar la lista con notas formateadas con coma decimal.
8. Al volver a abrir la app, cargar la lista guardada.

## Interfaz
- Un formulario con dos campos: nombre y primera nota.
- Botón de guardar con validación inmediata.
- Lista de materias con sus notas y estado de segundo bimestre aún pendiente.
- Manejo de errores por campo y mensajes en español.

## Decisiones justificadas con alternativa descartada
- Se normaliza el nombre para evitar duplicados visuales y por capitalización: alternativa descartada fue comparar nombres tal cual.
- Se acepta coma y punto como entrada decimal: alternativa descartada fue permitir solo punto, lo que rompería la expectativa del estudiante en español.
- El segundo bimestre queda en null: alternativa descartada fue guardar 0, lo que confundía una nota pendiente con un valor real.

## Estrategia de pruebas con Jest
- Pruebas unitarias para normalización de nombre, parseo de nota, validación de rangos y duplicados.
- Verificación de que la nota se formatea con coma decimal.
- Pruebas del almacenamiento local para guardar y recuperar una lista de materias.

## RF cubiertas
- RF-01: createSubject y pantalla principal.
- RF-02, RF-03, RF-04, RF-05, RF-10: validar formulario y duplicados.
- RF-06: modelado del segundo bimestre en null.
- RF-07: parseo y formatGradeForDisplay.
- RF-08: storage save failure handling.
- RF-09: carga de materias persistidas.
