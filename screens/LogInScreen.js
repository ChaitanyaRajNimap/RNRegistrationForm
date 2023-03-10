/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function LogInScreen({navigation}) {
  const emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,6}$/;
  const initialInputs = {email: '', password: ''};
  const initialErrors = {emailErr: '', passwordErr: ''};
  const initialFocus = {emailFocus: '', passwordFocus: ''};

  const ref_password = useRef();

  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);
  const [isFocused, setIsFocused] = useState(initialFocus);
  const [userData, setUserData] = useState(null);

  let isEmailValid = false;
  let isPasswordValid = false;

  //for storing data async way
  const storeData = async value => {
    let valueStr = value.toString();
    try {
      await AsyncStorage.setItem('isLoggedIn', valueStr);
    } catch (e) {
      console.error(e);
    }
  };

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

  //for reading data stored in async
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserDetails');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue;
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = () => {
    validateEmail(inputs.email);
    validatePassword(inputs.password);

    if (!isEmailValid) {
      setErrors(prevError => {
        return {
          ...prevError,
          emailErr: 'Please enter valid email',
        };
      });
      setIsFocused(prevFocused => {
        return {
          ...prevFocused,
          emailFocus: true,
        };
      });
    } else {
      setErrors(prevError => {
        return {
          ...prevError,
          emailErr: '',
        };
      });
      setIsFocused(prevFocused => {
        return {
          ...prevFocused,
          emailFocus: false,
        };
      });
      if (!isPasswordValid) {
        setErrors(prevError => {
          return {
            ...prevError,
            passwordErr: 'Please enter valid password',
          };
        });
        setIsFocused(prevFocused => {
          return {
            ...prevFocused,
            passwordFocus: true,
          };
        });
      } else {
        setErrors(prevError => {
          return {
            ...prevError,
            passwordErr: '',
          };
        });
        setIsFocused(prevFocused => {
          return {
            ...prevFocused,
            passwordFocus: false,
          };
        });
        getData().then(res => {
          const userData = JSON.parse(res);
          userEmail = userData.email;
          userPassword = userData.password;
          if (inputs.email === userEmail && inputs.password === userPassword) {
            storeData(true);
            navigation.navigate('UserHomeScreen');
            setInputs({email: '', password: ''});
          } else {
            Alert.alert('Warning!', `Credentials doesn't match, try again!`);
          }
        });
      }
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={[styles.textStyle, styles.subHeading]}>
        Please sign in to your account
      </Text>
      <KeyboardAvoidingView>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={[
                  styles.TextInput,
                  {
                    borderBottomColor: isFocused.emailFocus
                      ? '#1e90ff'
                      : '#1c1d1f',
                  },
                ]}
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
                placeholder="Email Address"
                placeholderTextColor="#696969"
                onChangeText={value => {
                  validateEmail(value);
                  setInputs(prevInputs => {
                    return {...prevInputs, email: value};
                  });
                }}
                onFocus={() =>
                  setIsFocused(prevFocused => {
                    return {
                      ...prevFocused,
                      emailFocus: true,
                    };
                  })
                }
                onBlur={() => {
                  setIsFocused(prevFocused => {
                    return {
                      ...prevFocused,
                      emailFocus: false,
                    };
                  });
                }}
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
                style={[
                  styles.TextInput,
                  {
                    borderBottomColor: isFocused.passwordFocus
                      ? '#1e90ff'
                      : '#1c1d1f',
                  },
                ]}
                ref={ref_password}
                placeholder="Password"
                placeholderTextColor="#696969"
                maxLength={6}
                secureTextEntry={true}
                onChangeText={value => {
                  validatePassword(value);
                  setInputs(prevInputs => {
                    return {...prevInputs, password: value};
                  });
                }}
                onFocus={() =>
                  setIsFocused(prevFocused => {
                    return {
                      ...prevFocused,
                      passwordFocus: true,
                    };
                  })
                }
                onBlur={() => {
                  setIsFocused(prevFocused => {
                    return {
                      ...prevFocused,
                      passwordFocus: false,
                    };
                  });
                }}
                value={inputs.password}
              />
            </View>
            {errors.passwordErr.length !== 0 && (
              <Text style={styles.error}>{errors.passwordErr}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.forgotBtnContainer}>
            <Text style={styles.forgotButton}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableBtn text="Sign In" onPress={submitHandler} />
          <View style={styles.signUpContainer}>
            <Text style={styles.textSignUp}>Don't have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 2,
    color: '#fff',
  },
  forgotBtnContainer: {
    alignItems: 'flex-end',
    marginBottom: 60,
  },
  forgotButton: {color: '#696969'},
  signUpContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {color: '#1e90ff'},
  textStyle: {color: '#696969'},
  textSignUp: {color: '#fff'},
});
