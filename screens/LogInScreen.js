import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function LogInScreen() {
  const emailRegEx = `^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$`;
  const passwordRegEx = `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,6}$/`;
  const initialInputs = {
    email: '',
    password: '',
  };

  const initialErrors = {
    emailErr: '',
    passwordErr: '',
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);

  const updateEmail = emailValue => {
    setInputs(prevInputs => {
      return {...prevInputs, email: emailValue};
    });
  };

  const updatePassword = passwordValue => {
    setInputs(prevInputs => {
      return {...prevInputs, password: passwordValue};
    });
  };

  const updateError = errorValue => {
    setErrors(prevErrors => {
      return {...prevErrors, emailErr: errorValue, passwordErr: errorValue};
    });
  };

  const submitHandler = () => {
    console.log(inputs.email);
    if (inputs.email.length <= 0 && inputs.password.length <= 0) {
      // updateError(`This feild can't be empty`);
      setErrors(prevErrors => {
        return {
          ...prevErrors,
          emailErr: `This feild can't be empty!`,
          passwordErr: `This feild can't be empty!`,
        };
      });
    } else if (!inputs.email.match(emailRegEx)) {
      setErrors(prevErrors => {
        return {
          ...prevErrors,
          emailErr: `Please enter valid email address!`,
        };
      });
    } else if (!inputs.password.match(passwordRegEx)) {
      setErrors(prevErrors => {
        return {
          ...prevErrors,
          passwordErr: `Please enter valid password!`,
        };
      });
    } else {
      setErrors({
        emailErr: '',
        passwordErr: '',
      });
    }

    // Alert.alert('Data', `Email: ${inputs.email}\nPassword: ${inputs.password}`);

    setInputs({email: '', password: ''});
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
              onChangeText={value => updateEmail(value)}
              value={inputs.email}
            />
          </View>
          {errors.emailErr.length !== 0 && (
            <Text style={styles.error}>{errors.emailErr}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={true}
              onChangeText={value => updatePassword(value)}
              value={inputs.password}
            />
          </View>
          {errors.passwordErr.length !== 0 && (
            <Text style={styles.error}>{errors.passwordErr}</Text>
          )}
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
    width: '100%',
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
