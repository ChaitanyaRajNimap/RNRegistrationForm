import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    console.log(email, password);
  };
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Create new account</Text>
      <Text style={[styles.textStyle, styles.subHeading]}>
        Please fill in the form to continue
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#fff"
              onChangeText={email => setEmail(email)}
              value={email}
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              onChangeText={password => setPassword(password)}
              value={password}
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 60}}>
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
          <TouchableOpacity
            onPress={(email, password) => submitHandler(email, password)}>
            <Text style={styles.signUpText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignUp;

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
    borderRadius: 20,
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: '#708090',
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
