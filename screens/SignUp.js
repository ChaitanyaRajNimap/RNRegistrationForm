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
              placeholder="First Name"
              placeholderTextColor="#696969"
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Lasst Name"
              placeholderTextColor="#696969"
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email Address"
              placeholderTextColor="#696969"
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone Number"
              placeholderTextColor="#696969"
            />
          </View>
          {/* <Text style={styles.error}>Error!</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={true}
            />
          </View>
          {/* <Text style={styles.error}>{error}</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#696969"
              secureTextEntry={true}
            />
          </View>
          {/* <Text style={styles.error}>{error}</Text> */}
        </View>
        <TouchableBtn text="Sign Up" />
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
    marginBottom: 5,
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
  textStyle: {color: '#696969'},
});
