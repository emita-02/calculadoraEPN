# Decisiones — HU-001 Registrar una materia

## 1. Separador decimal de la nota

- **Pregunta:** ¿Qué separador decimal se acepta al ingresar la nota?
- **Respuesta:** Se aceptan tanto coma como punto y ambos representan el mismo valor, con hasta dos decimales.
- **Motivo:** Permite ingresar la nota con cualquiera de los dos formatos sin cambiar su significado.

## 2. Normalización y duplicados del nombre

- **Pregunta:** ¿Cómo se determinan los nombres de materia duplicados?
- **Respuesta:** Se quitan los espacios al inicio y al final. Se considera duplicado el mismo nombre aunque cambie entre mayúsculas y minúsculas.
- **Motivo:** Evita duplicados causados por diferencias de espacios o capitalización.

## 3. Nota del segundo bimestre al registrar

- **Pregunta:** ¿Qué valor debe tener la nota del segundo bimestre al crear una materia?
- **Respuesta:** Debe quedar sin registrar hasta que el estudiante la ingrese.
- **Motivo:** Un dato pendiente no debe confundirse con una nota real de cero.

## 4. Errores de validación por apartado

- **Pregunta:** ¿Cómo se informan los errores de los datos ingresados?
- **Respuesta:** Se muestra un mensaje de error para cada apartado que se esté ingresando incorrectamente.
- **Motivo:** El estudiante puede identificar qué dato necesita corregir.

## 5. Error al guardar en el dispositivo

- **Pregunta:** ¿Qué ocurre si falla el guardado de una materia?
- **Respuesta:** La app informa que no se guardó y conserva el formulario para que el estudiante pueda volver a intentarlo.
- **Motivo:** Evita hacer creer que la materia fue registrada y evita perder lo ingresado.

## 6. Formato de la nota en la lista

- **Pregunta:** ¿Qué separador decimal se usa para mostrar la nota en la lista?
- **Respuesta:** Se muestra con coma decimal.
- **Motivo:** Mantiene un formato uniforme en español aunque el ingreso haya usado punto.