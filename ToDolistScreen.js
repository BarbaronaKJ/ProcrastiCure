import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const ToDoListScreen = ({ navigation }) => {
  const tasks = [
    { id: '1', title: 'Project PPT', date: new Date('2024-12-20T20:00:00') },
    { id: '2', title: 'Activity Review', date: new Date('2024-12-21T21:00:00') },
    { id: '3', title: 'Project Design', date: new Date('2024-12-22T22:00:00') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate('TaskDetail', { taskDate: item.date.toISOString() })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ToDoListScreen;
