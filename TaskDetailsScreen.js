import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, ScrollView } from 'react-native';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskDate } = route.params || {}; // Handle cases where route.params might be undefined
  const [events, setEvents] = useState([]); // Store all events
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'calendarEvents'));
        const eventsList = [];
        querySnapshot.forEach((doc) => {
          eventsList.push({ id: doc.id, ...doc.data() });
        });
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching event details:', error);
        Alert.alert('Error', 'Could not fetch event details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>

      {/* Display events if available */}
      <ScrollView style={styles.scrollContainer}>
        {events.length > 0 ? (
          events.map((event) => (
            <View key={event.id} style={styles.eventContainer}>
              <Text style={styles.dateText}>Date: {event.date}</Text>
              <Text style={styles.detailsText}>Title: {event.title}</Text>
              <Text style={styles.detailsText}>Description: {event.description}</Text>
              <Text style={styles.detailsText}>
                Created At: {new Date(event.createdAt.seconds * 1000).toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.detailsText}>No events available.</Text>
        )}
      </ScrollView>

      {/* Row of buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Go to ToDoList" onPress={() => navigation.navigate('ToDoListScreen')} />
        <Button title="Go to Calendar" onPress={() => navigation.navigate('Calendar')} />
        <Button title="Go to Task Details" onPress={() => navigation.navigate('TaskDetails', { taskDate })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'flex-end', // Push content to the bottom
    alignItems: 'center',
    paddingBottom: 20, // Add padding to the bottom for better spacing
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    marginBottom: 20, // Space for the buttons
  },
  eventContainer: {
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  detailsText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: 10,
    backgroundColor: '#222', // Match background
  },
});

export default TaskDetailScreen;
