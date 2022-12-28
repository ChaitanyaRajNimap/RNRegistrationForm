/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';

function RegistrationForm({navigation}) {
  return (
    <View style={styles.container}>
      <WelcomeScreen navigation={navigation} />
    </View>
  );
}

export default RegistrationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
