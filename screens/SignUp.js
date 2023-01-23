/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';
//for sqlite
import SQLite from 'react-native-sqlite-storage';

//for defining database
const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

function SignUp({navigation}) {
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
  const initialFocus = {
    firstNameFocus: false,
    lastNameFocus: false,
    emailFocus: false,
    phoneFocus: false,
    passwordFocus: false,
    confPasswordFocus: false,
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);
  const [isFocused, setIsFocused] = useState(initialFocus);

  //function to create table
  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT,Token INTEGER);',
      );
    });
  };

  useEffect(() => {
    createTable();
  }, []);

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

  //for storing data async way
  const storeData = async value => {
    if (value) {
      let x = Math.floor(Math.random() * 100 + 1);

      try {
        // const jsonValue = JSON.stringify(value);
        // await AsyncStorage.setItem('UserDetails', jsonValue);
        await db.transaction(async tx => {
          await tx.executeSql('INSERT INTO Users (Token) VALUES (?)', [x]);
        });
      } catch (e) {
        // saving error
      }
    }
  };

  const removeValue = async () => {
    try {
      // await AsyncStorage.removeItem('UserDetails');
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {},
          error => {
            console.log(error);
          },
        );
      });
      navigation.navigate('LogIn');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  const submitHandler = () => {
    validateFirstName(inputs.firstName);
    validateLastName(inputs.lastName);
    validateEmail(inputs.email);
    validatePhone(inputs.phone);
    validatePassword(inputs.password);
    validateConfPassword(inputs.confPassword, inputs.password);

    if (!isFirstNameValid) {
      setErrors(prevError => {
        return {
          ...prevError,
          firstNameErr: 'Please enter valid first name',
        };
      });
      setIsFocused(prevFocused => {
        return {
          ...prevFocused,
          firstNameFocus: true,
        };
      });
    } else {
      setErrors(prevError => {
        return {
          ...prevError,
          firstNameErr: '',
        };
      });
      setIsFocused(prevFocused => {
        return {
          ...prevFocused,
          firstNameFocus: false,
        };
      });
      if (!isLastNameValid) {
        setErrors(prevError => {
          return {
            ...prevError,
            lastNameErr: 'Please enter valid last name',
          };
        });
        setIsFocused(prevFocused => {
          return {
            ...prevFocused,
            lastNameFocus: true,
          };
        });
      } else {
        setErrors(prevError => {
          return {
            ...prevError,
            lastNameErr: '',
          };
        });
        setIsFocused(prevFocused => {
          return {
            ...prevFocused,
            firstNameFocus: false,
          };
        });
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
          if (!isPhoneValid) {
            setErrors(prevError => {
              return {
                ...prevError,
                phoneErr: 'Please enter valid phone number',
              };
            });
            setIsFocused(prevFocused => {
              return {
                ...prevFocused,
                phoneFocus: true,
              };
            });
          } else {
            setErrors(prevError => {
              return {
                ...prevError,
                phoneErr: '',
              };
            });
            setIsFocused(prevFocused => {
              return {
                ...prevFocused,
                phoneFocus: false,
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
              if (!isConfPasswordValid) {
                setErrors(prevError => {
                  return {
                    ...prevError,
                    confPasswordErr: `Password doesn't matched`,
                  };
                });
                setIsFocused(prevFocused => {
                  return {
                    ...prevFocused,
                    confPasswordFocus: true,
                  };
                });
              } else {
                setErrors(prevError => {
                  return {
                    ...prevError,
                    confPasswordErr: '',
                  };
                });
                setIsFocused(prevFocused => {
                  return {
                    ...prevFocused,
                    confPasswordFocus: false,
                  };
                });
                setInputs({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  password: '',
                  confPassword: '',
                });
                storeData(inputs);
                navigation.navigate('LogIn');
              }
            }
          }
        }
      }
    }

    // if (
    //   isFirstNameValid &&
    //   isLastNameValid &&
    //   isEmailValid &&
    //   isPhoneValid &&
    //   isPasswordValid &&
    //   isConfPasswordValid
    // ) {
    //   setErrors({
    //     firstNameErr: '',
    //     lastNameErr: '',
    //     emailErr: '',
    //     phoneErr: '',
    //     passwordErr: '',
    //     confPasswordErr: '',
    //   });
    //   setInputs({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     password: '',
    //     confPassword: '',
    //   });
    //   storeData(inputs);
    //   navigation.navigate('LogIn');
    // }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.rootContainer}>
        <Text style={styles.heading}>Create new account</Text>
        <Text style={[styles.textStyle, styles.subHeading]}>
          Please fill in the form to continue
        </Text>
        <KeyboardAvoidingView>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputView}>
                <TextInput
                  style={[
                    styles.TextInput,
                    {
                      borderBottomColor: isFocused.firstNameFocus
                        ? '#1e90ff'
                        : '#1c1d1f',
                    },
                  ]}
                  placeholder="First Name"
                  placeholderTextColor="#696969"
                  onChangeText={value => {
                    validateFirstName(value);
                    setInputs(prevInputs => {
                      return {...prevInputs, firstName: value};
                    });
                  }}
                  onFocus={() =>
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        firstNameFocus: true,
                      };
                    })
                  }
                  onBlur={() => {
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        firstNameFocus: false,
                      };
                    });
                  }}
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
                  style={[
                    styles.TextInput,
                    {
                      borderBottomColor: isFocused.lastNameFocus
                        ? '#1e90ff'
                        : '#1c1d1f',
                    },
                  ]}
                  placeholder="Last Name"
                  placeholderTextColor="#696969"
                  onChangeText={value => {
                    validateLastName(value);
                    setInputs(prevInputs => {
                      return {...prevInputs, lastName: value};
                    });
                  }}
                  onFocus={() =>
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        lastNameFocus: true,
                      };
                    })
                  }
                  onBlur={() => {
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        lastNameFocus: false,
                      };
                    });
                  }}
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
                  style={[
                    styles.TextInput,
                    {
                      borderBottomColor: isFocused.emailFocus
                        ? '#1e90ff'
                        : '#1c1d1f',
                    },
                  ]}
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
                      borderBottomColor: isFocused.phoneFocus
                        ? '#1e90ff'
                        : '#1c1d1f',
                    },
                  ]}
                  placeholder="Phone Number"
                  placeholderTextColor="#696969"
                  maxLength={10}
                  onChangeText={value => {
                    validatePhone(value);
                    setInputs(prevInputs => {
                      return {...prevInputs, phone: value};
                    });
                  }}
                  onFocus={() =>
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        phoneFocus: true,
                      };
                    })
                  }
                  onBlur={() => {
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        phoneFocus: false,
                      };
                    });
                  }}
                  value={inputs.phone}
                />
              </View>
              {errors.phoneErr.length !== 0 && (
                <Text style={styles.error}>{errors.phoneErr}</Text>
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
            <View style={styles.inputContainer}>
              <View style={styles.inputView}>
                <TextInput
                  style={[
                    styles.TextInput,
                    {
                      borderBottomColor: isFocused.confPasswordFocus
                        ? '#1e90ff'
                        : '#1c1d1f',
                    },
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#696969"
                  maxLength={6}
                  secureTextEntry={true}
                  onChangeText={value => {
                    validateConfPassword(value, inputs.password);
                    setInputs(prevInputs => {
                      return {...prevInputs, confPassword: value};
                    });
                  }}
                  onFocus={() =>
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        confPasswordFocus: true,
                      };
                    })
                  }
                  onBlur={() => {
                    setIsFocused(prevFocused => {
                      return {
                        ...prevFocused,
                        confPasswordFocus: false,
                      };
                    });
                  }}
                  value={inputs.confPassword}
                />
              </View>
              {errors.confPasswordErr.length !== 0 && (
                <Text style={styles.error}>{errors.confPasswordErr}</Text>
              )}
            </View>
            <TouchableBtn text="Sign Up" onPress={submitHandler} />
            <TouchableBtn text="Delete Users" onPress={removeValue} />
          </View>
        </KeyboardAvoidingView>
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
    borderBottomWidth: 2,
    color: '#fff',
  },
  textStyle: {color: '#696969'},
});
