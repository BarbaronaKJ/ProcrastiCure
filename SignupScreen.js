// SignupScreen.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Title, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase authentication

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        // Firebase authentication signup logic
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Signup successful:', email);
            alert('Signup successful!');

            // After signup, navigate to the CalendarScreen (or any other screen you choose)
            navigation.navigate('Calendar'); // Update this to the screen you want to navigate to
        } catch (error) {
            console.error('Error during signup:', error);
            alert(error.message);
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Title style={styles.title}>Procrasticure</Title>

                <PaperTextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <PaperTextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <Button mode="contained" onPress={handleSignup} style={styles.button}>
                    Sign Up
                </Button>
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
    },
    input: {
        marginBottom: 10,
        width: '80%',
    },
    button: {
        marginTop: 10,
        width: '80%',
    },
});

export default SignupScreen;
