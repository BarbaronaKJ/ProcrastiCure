import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {
  PaperProvider,
  Title,
  Button,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visible, setVisible] = useState(false); // Dialog visibility
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setVisible(true); // Show dialog for adding a task
  };

  const handleAddTask = async () => {
    try {
      // Save task to Firestore
      const docRef = await addDoc(collection(db, 'calendarEvents'), {
        date: selectedDate,
        title: taskTitle,
        description: taskDescription,
        createdAt: new Date(),
      });

      Alert.alert('Success', `Task added with ID: ${docRef.id}`);
      setVisible(false); // Close dialog
      setTaskTitle(''); // Reset fields
      setTaskDescription('');

      // Optionally navigate to TaskDetails
      navigation.navigate('TaskDetails', { date: selectedDate });
    } catch (error) {
      console.error('Error adding event: ', error);
      Alert.alert('Error', 'Could not add task. Please try again.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Title style={styles.title}>Procrasticure</Title>

        <View style={styles.sideButtons}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('ToDoListScreen')}
          >
            Go to To-Do List
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Calendar')}
          >
            Go to Calendar
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('TaskDetails', { date: selectedDate })}
          >
            Go to Task Details
          </Button>
        </View>

        <Calendar
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Add Task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Task Title"
                value={taskTitle}
                onChangeText={setTaskTitle}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Task Description"
                value={taskDescription}
                onChangeText={setTaskDescription}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button mode="contained" onPress={handleAddTask}>
                Add Task
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  title: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 24,
  },
  calendar: {
    width: '90%',
    marginTop: 20,
  },
  sideButtons: {
    position: 'absolute',
    left: 10,
    top: 100,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#1976D2',
  },
  input: {
    marginBottom: 10,
  },
});

export default CalendarScreen;
