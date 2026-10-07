import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  createSubject,
  formatGradeForDisplay,
  type Subject,
  validateSubjectForm,
} from '@/domain/subject';
import { loadSubjects, saveSubjects } from '@/storage/subjects-storage';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [firstGrade, setFirstGrade] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [nameError, setNameError] = useState<string | undefined>();
  const [firstGradeError, setFirstGradeError] = useState<string | undefined>();

  useEffect(() => {
    const readSubjects = async () => {
      const storedSubjects = await loadSubjects();
      setSubjects(storedSubjects);
    };

    void readSubjects();
  }, []);

  const handleSave = async () => {
    const validation = validateSubjectForm({
      name,
      firstGrade,
      existingNames: subjects.map((subject) => subject.name),
    });

    setNameError(validation.nameError);
    setFirstGradeError(validation.firstGradeError);

    if (validation.nameError || validation.firstGradeError) {
      return;
    }

    const subject = createSubject({
      name,
      firstGrade,
      existingNames: subjects.map((item) => item.name),
    });

    if (!subject) {
      Alert.alert('No se pudo guardar la materia', 'Revisa los datos antes de intentarlo otra vez.');
      return;
    }

    const nextSubjects = [...subjects, subject];

    try {
      await saveSubjects(nextSubjects);
      setSubjects(nextSubjects);
      setName('');
      setFirstGrade('');
      setNameError(undefined);
      setFirstGradeError(undefined);
    } catch {
      Alert.alert(
        'No se guardó la materia',
        'La aplicación no pudo guardar el registro. Puedes intentarlo nuevamente.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={subjects}
          keyExtractor={(subject) => subject.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Mis materias</Text>
                <Text style={styles.subtitle}>Registra cada materia con la nota del primer bimestre.</Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Ej. Matemáticas"
                  accessibilityLabel="Nombre de la materia"
                  autoCapitalize="words"
                  style={[styles.input, nameError ? styles.inputError : null]}
                  placeholderTextColor="#5a6e82"
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                <Text style={styles.label}>1er bimestre</Text>
                <TextInput
                  value={firstGrade}
                  onChangeText={setFirstGrade}
                  placeholder="8,5"
                  accessibilityLabel="Nota del primer bimestre"
                  keyboardType="decimal-pad"
                  style={[styles.input, firstGradeError ? styles.inputError : null]}
                  placeholderTextColor="#5a6e82"
                />
                {firstGradeError ? <Text style={styles.errorText}>{firstGradeError}</Text> : null}

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Guardar materia"
                  style={styles.saveButton}
                  onPress={() => void handleSave()}>
                  <Text style={styles.saveButtonText}>Guardar materia</Text>
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>Lista</Text>
            </>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Todavía no registraste ninguna materia.</Text>
          }
          renderItem={({ item: subject }) => (
            <View style={styles.subjectCard}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectGrade}>1er bimestre: {formatGradeForDisplay(subject.firstGrade)}</Text>
              <Text style={styles.subjectPending}>2do bimestre: pendiente</Text>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e2e4e9',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 12,
  },
  header: {
    backgroundColor: '#001F3F',
    borderRadius: 4,
    padding: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#b5bbc8',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111111',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#d33724',
  },
  errorText: {
    color: '#d33724',
    fontSize: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#357ca5',
    borderRadius: 4,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  listSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001F3F',
  },
  emptyText: {
    color: '#111111',
    fontSize: 14,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#b5bbc8',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  subjectGrade: {
    fontSize: 14,
    color: '#111111',
    marginBottom: 4,
  },
  subjectPending: {
    fontSize: 13,
    color: '#5a6e82',
  },
});
