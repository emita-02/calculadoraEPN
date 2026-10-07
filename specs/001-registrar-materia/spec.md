# Spec 001 — Registrar una materia

Estado: aprobada
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo
La aplicación debe permitir a un estudiante guardar una materia con la nota del primer bimestre, revisarla en la lista y mantener esa información disponible al volver a abrir la app. La funcionalidad debe ser confiable con validaciones claras y sin duplicados.

## Usuarios
- Estudiante que registra materias para llevar control académico.

## Historias de usuario
- HU-001: Como estudiante, quiero guardar una materia con la nota de mi primer bimestre, para tenerla registrada y completarla cuando salga la del segundo.

## Requisitos funcionales
- RF-01: CUANDO el estudiante intenta guardar una materia con nombre y nota válidos, EL SISTEMA la guarda y la muestra en la lista de materias. Origen: Escenario "Guardar una materia" de HU-001.
- RF-02: SI el nombre de la materia está vacío, ENTONCES EL SISTEMA muestra un error en ese campo y no guarda la materia. Origen: Escenario "Datos incompletos o inválidos" de HU-001.
- RF-03: SI la nota del primer bimestre está vacía, ENTONCES EL SISTEMA muestra un error en ese campo y no guarda la materia. Origen: Escenario "Datos incompletos o inválidos" de HU-001.
- RF-04: SI la nota del primer bimestre está fuera del rango permitido, ENTONCES EL SISTEMA muestra un error en ese campo y no guarda la materia. Origen: Escenario "Datos incompletos o inválidos" de HU-001 y decisión 1.
- RF-05: SI el estudiante intenta registrar una materia con un nombre repetido, ENTONCES EL SISTEMA informa que ya existe y no duplica la materia. Origen: Escenario "Materia repetida" de HU-001 y decisión 2.
- RF-06: CUANDO la materia se guarda correctamente, EL SISTEMA conserva la nota del segundo bimestre sin registrar hasta que el estudiante la ingrese. Origen: decisión 3.
- RF-07: CUANDO el estudiante ingresa una nota con coma o punto decimal, EL SISTEMA normaliza el valor y lo muestra con coma decimal en la lista. Origen: decisiones 1 y 6.
- RF-08: CUANDO falla el guardado en el dispositivo, EL SISTEMA informa al estudiante y conserva el formulario para que pueda volver a intentarlo. Origen: decisión 5.
- RF-09: CUANDO se abre la aplicación con materias previamente guardadas, EL SISTEMA las carga y las muestra en la lista sin perder datos. Origen: Escenario "Conservar mis datos" de HU-001.
- RF-10: CUANDO hay un error en varios campos del formulario, EL SISTEMA muestra un mensaje de error específico para cada apartado incorrecto. Origen: decisión 4.

## Requisitos no funcionales
- RNF-01: La aplicación debe aceptar notas con hasta dos decimales.
- RNF-02: Los textos visibles deben estar en español.
- RNF-03: La persistencia de las materias debe conservarse entre cierres y aperturas de la aplicación.

## Casos límite
- Nombre con espacios al inicio o al final debe tratarse como válido tras normalización.
- Nombre con mayúsculas y minúsculas distintas debe considerarse el mismo nombre para evitar duplicados.
- La nota 0 debe aceptarse como válida.
- La nota 10 debe aceptarse como válida.
- La nota 10,01 o 10.01 debe considerarse inválida.

## Fuera de alcance
- Registrar la nota del segundo bimestre en esta historia.
- Cálculo del estado académico general.
- Sincronización con backend ni cuentas.

## Criterios de finalización
- El estudiante puede guardar una materia con nota del primer bimestre.
- La validación bloquea campos vacíos, fuera de rango y duplicados.
- La persistencia conserva las materias entre aperturas.
- La lista muestra la nota con coma decimal.

## Dudas abiertas
- Ninguna.

## Revisión final de la spec
- No hay contradicciones con la HU ni con la constitución.
- Todos los escenarios de la HU quedan cubiertos por al menos un RF.
- No existen conflictos con los principios del proyecto.
