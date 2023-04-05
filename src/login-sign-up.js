/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Weather from './components/weather';

function Appl() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleLogin = () => {
    // Here you can add your authentication logic using the email and password values
    // For example, you can call an API to verify the user's credentials
    // If the user is authenticated, set the isAuthenticated state to true
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    // Here you can add your sign up logic using the email and password values
    // For example, you can call an API to create a new user account
    // If the sign up is successful, set the isAuthenticated state to true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Here you can add your logout logic, such as resetting the isAuthenticated state to false
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          source={{uri: 'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=452&q=80'}}>
          <View style={styles.containerForWeather}>
            <Text style={styles.title}>City Weather</Text>
            <Text style={styles.title}>{isSignedUp ? 'Sign Up' : 'Login'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
              />
              <View style={styles.buttonContainer}>
                {/* display login button during login and sign up button during sign up */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={isSignedUp ? handleSignUp : handleLogin}>
                  <Text style={styles.buttonText}>
                    {isSignedUp ? 'Sign Up' : 'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* if not registerd then goto sign up and vice versa */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsSignedUp(!isSignedUp)}>
              <Text style={styles.buttonText}>
                {isSignedUp
                  ? 'Already have an account? Login'
                  : 'Don’t have an account? Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.containertwo}>
      <Text style={styles.titleForWeather}>City Weather</Text>
      <Weather />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containertwo: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  containerForWeather: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  titleForWeather: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#000',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    // borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Appl;
