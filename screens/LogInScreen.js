import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function LogInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (email, password) => {
    console.log(email, password);
    console.log('Hello');
    if (email.length <= 0 && password.length <= 0) {
      setError("This feild can't be empty");
    }
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={[styles.textStyle, styles.subHeading]}>
        Please sign in to your account
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#696969"
              onChangeText={email => setEmail(email)}
              value={email}
            />
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={true}
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>
        <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 60}}>
          <Text style={styles.forgotButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableBtn text="Sign In" onPress={submitHandler} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.textSignUp}>Don't have an Account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LogInScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    flex: 1,
    backgroundColor: '#28282B',
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeading: {marginTop: 5},
  formContainer: {
    marginVertical: 60,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputView: {
    width: 325,
    height: 60,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 5,
    alignItems: 'flex-start',
    backgroundColor: '#1c1d1f',
  },
  error: {
    marginLeft: 15,
    color: '#f00',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  forgotButton: {
    color: '#696969',
  },
  signUpText: {
    color: '#1e90ff',
  },
  textStyle: {color: '#696969'},
  textSignUp: {color: '#fff'},
});
