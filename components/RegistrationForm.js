/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LogInScreen from '../screens/LogInScreen';
import SignUp from '../screens/SignUp';
import WelcomeScreen from '../screens/WelcomeScreen';

function RegistrationForm() {
  return (
    <View style={styles.container}>
      {/* <WelcomeScreen /> */}
      <LogInScreen />
      {/* <SignUp /> */}
    </View>
  );
}

export default RegistrationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
