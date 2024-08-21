import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setuserName] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      // console.log(password);
      alert('Passwords do not match. Please try again.');
      return;
    }
  
    const userData = {
  name : userName,
  email : email,
  password: password,
  confirmPassword: confirmPassword
    };
    // console.log(userData);
  
    try {
      const response = await fetch('https://bdbc-2401-4900-713f-8eb1-dc49-6478-117f-c0ad.ngrok-free.app/Auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Registration was successful
        alert('Registration successful! You can now log in.');
        navigation.navigate('Login'); // Navigate to the login screen
      } else {
        const data = await response.json();
        console.log(data);
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      alert('An error occurred during registration. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="userName"
        onChangeText={(text) => setuserName(text)}
        value={userName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Signup;
