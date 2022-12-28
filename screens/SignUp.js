/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function SignUp() {
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,6}$/;
  const nameRegEx = /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
  const phoneRegEx = /^[789]\d{9}$/;
  const initialInputs = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confPassword: '',
  };
  const initialErrors = {
    firstNameErr: '',
    lastNameErr: '',
    emailErr: '',
    phoneErr: '',
    passwordErr: '',
    confPasswordErr: '',
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);

  let isFirstNameValid = false;
  let isLastNameValid = false;
  let isEmailValid = false;
  let isPhoneValid = false;
  let isPasswordValid = false;
  let isConfPasswordValid = false;

  const validateFirstName = firstName => {
    if (firstName.length < 1) {
      setErrors(prevError => {
        return {...prevError, firstNameErr: `This feild can't be empty`};
      });
      isFirstNameValid = false;
    } else if (!nameRegEx.test(firstName)) {
      setErrors(prevError => {
        return {...prevError, firstNameErr: `Enter valid first name`};
      });
      isFirstNameValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, firstNameErr: ''};
      });
      isFirstNameValid = true;
    }
  };

  const validateLastName = lastName => {
    if (lastName.length < 1) {
      setErrors(prevError => {
        return {...prevError, lastNameErr: `This feild can't be empty`};
      });
      isLastNameValid = false;
    } else if (!nameRegEx.test(lastName)) {
      setErrors(prevError => {
        return {...prevError, lastNameErr: `Enter valid last name`};
      });
      isLastNameValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, lastNameErr: ''};
      });
      isLastNameValid = true;
    }
  };

  const validateEmail = email => {
    if (email.length < 1) {
      setErrors(prevError => {
        return {...prevError, emailErr: `This feild can't be empty`};
      });
      isEmailValid = false;
    } else if (!emailRegEx.test(email)) {
      setErrors(prevError => {
        return {...prevError, emailErr: `Enter valid email address`};
      });
      isEmailValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, emailErr: ''};
      });
      isEmailValid = true;
    }
  };

  const validatePhone = phone => {
    if (phone.length < 1) {
      setErrors(prevError => {
        return {...prevError, phoneErr: `This feild can't be empty`};
      });
      isPhoneValid = false;
    } else if (!phoneRegEx.test(phone)) {
      setErrors(prevError => {
        return {...prevError, phoneErr: `Enter valid phone number`};
      });
      isPhoneValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, phoneErr: ''};
      });
      isPhoneValid = true;
    }
  };

  const validatePassword = password => {
    if (password.length < 1) {
      setErrors(prevError => {
        return {...prevError, passwordErr: `This feild can't be empty`};
      });
      isPasswordValid = false;
    } else if (!passwordRegEx.test(password)) {
      setErrors(prevError => {
        return {...prevError, passwordErr: `Enter valid password`};
      });
      isPasswordValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, passwordErr: ''};
      });
      isPasswordValid = true;
    }
  };

  const validateConfPassword = (confPassword, password) => {
    if (confPassword.length < 1) {
      setErrors(prevError => {
        return {...prevError, confPasswordErr: `This feild can't be empty`};
      });
      isConfPasswordValid = false;
    } else if (confPassword !== password) {
      setErrors(prevError => {
        return {...prevError, confPasswordErr: `Password doesn't matched!`};
      });
      isConfPasswordValid = false;
    } else {
      setErrors(prevError => {
        return {...prevError, confPasswordErr: ''};
      });
      isConfPasswordValid = true;
    }
  };

  const submitHandler = () => {
    validateFirstName(inputs.firstName);
    validateLastName(inputs.lastName);
    validateEmail(inputs.email);
    validatePhone(inputs.phone);
    validatePassword(inputs.password);
    validateConfPassword(inputs.confPassword, inputs.password);

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfPasswordValid
    ) {
      setErrors({
        firstNameErr: '',
        lastNameErr: '',
        emailErr: '',
        phoneErr: '',
        passwordErr: '',
        confPasswordErr: '',
      });
      setInputs({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confPassword: '',
      });
      Alert.alert(
        'Data',
        `First Name: ${inputs.firstName}\nLast Name: ${inputs.lastName}\nEmail: ${inputs.email}Phone Number: ${inputs.phone}\nPassword: ${inputs.password}`,
      );
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
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
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, firstName: value};
                  })
                }
                value={inputs.firstName}
              />
            </View>
            {errors.firstNameErr.length !== 0 && (
              <Text style={styles.error}>{errors.firstNameErr}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Last Name"
                placeholderTextColor="#696969"
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, lastName: value};
                  })
                }
                value={inputs.lastName}
              />
            </View>
            {errors.lastNameErr.length !== 0 && (
              <Text style={styles.error}>{errors.lastNameErr}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email Address"
                placeholderTextColor="#696969"
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, email: value};
                  })
                }
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
                placeholder="Phone Number"
                placeholderTextColor="#696969"
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, phone: value};
                  })
                }
                value={inputs.phone}
                maxLength={10}
              />
            </View>
            {errors.phoneErr.length !== 0 && (
              <Text style={styles.error}>{errors.phoneErr}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#696969"
                secureTextEntry={true}
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, password: value};
                  })
                }
                value={inputs.password}
                maxLength={6}
              />
            </View>
            {errors.passwordErr.length !== 0 && (
              <Text style={styles.error}>{errors.passwordErr}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#696969"
                secureTextEntry={true}
                onChangeText={value =>
                  setInputs(prevInputs => {
                    return {...prevInputs, confPassword: value};
                  })
                }
                value={inputs.confPassword}
                maxLength={6}
              />
            </View>
            {errors.confPasswordErr.length !== 0 && (
              <Text style={styles.error}>{errors.confPasswordErr}</Text>
            )}
          </View>
          <TouchableBtn text="Sign Up" onPress={submitHandler} />
        </View>
      </View>
    </ScrollView>
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
    // marginBottom: 5,
    marginVertical: 10,
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
  textStyle: {color: '#696969'},
});
