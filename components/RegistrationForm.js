import React from 'react';
import {View, StyleSheet} from 'react-native';
import LogInScreen from '../screens/LogInScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

function RegistrationForm() {
  return (
    <View style={styles.container}>
      {/* <WelcomeScreen /> */}
      <LogInScreen />
    </View>
  );
}

export default RegistrationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
