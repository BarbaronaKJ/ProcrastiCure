import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { PaperProvider, Title, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Import the Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration from your Firebase project settings
const firebaseConfig = {
  apiKey: 'AIzaSyDebsdZXoYSa_W2UAdFJhKrijwJMwvxE78',
  authDomain: 'procasticure-b3f56.firebaseapp.com',
  projectId: 'procasticure-b3f56',
  storageBucket: 'procasticure-b3f56.appspot.com', // Fixed typo here
  messagingSenderId: '726694359221',
  appId: '1:726694359221:web:a98f60d91bfb919667cefc',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add some padding
    backgroundColor: '#f0f0f0', // Light background color
  },
  title: {
    fontSize: 32, // Increase title font size
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10, // Add some space between buttons
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});



const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Calendar'); // Navigate to CalendarScreen
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  const handleSignup = async () => {
    try {
      // Firebase Signup
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Verification'); // Replace with appropriate screen name
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Title style={styles.title}>Procrasticure</Title>
        
        {/* Email Input */}
        <PaperTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        {/* Password Input */}
        <PaperTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Login Button */}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log In
        </Button>

        {/* Signup Button */}
        <Button mode="contained" onPress={handleSignup} style={styles.button}>
          Sign Up
        </Button>
      </View>
    </PaperProvider>
  );
};

export default LoginScreen;