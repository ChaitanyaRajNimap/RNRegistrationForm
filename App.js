import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import RegistrationForm from './components/RegistrationForm';

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />
      <SafeAreaView style={styles.SafeAreaStyles}>
        <RegistrationForm />
      </SafeAreaView>
    </>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={RegistrationForm} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  SafeAreaStyles: {
    flex: 1,
  },
});
