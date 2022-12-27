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

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={[styles.textStyle, styles.subHeading]}>
        Please sign in to your account
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity style={{alignItems: 'flex-end'}}>
          <Text style={styles.forgotButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableBtn text="Sign In" />
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
    paddingVertical: 60,
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
    marginVertical: 40,
    flex: 1,
  },
  inputView: {
    width: 325,
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#708090',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgotButton: {
    height: 30,
    marginVertical: 5,
    color: '#696969',
  },
  signUpText: {
    color: '#1e90ff',
  },
  textStyle: {color: '#696969'},
  textSignUp: {color: '#fff'},
});
