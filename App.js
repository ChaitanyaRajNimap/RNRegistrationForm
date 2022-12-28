import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationForm from './components/RegistrationForm';
import LogInScreen from './screens/LogInScreen';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={RegistrationForm}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#1e90ff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{
              title: 'Sign In',
              headerStyle: {
                backgroundColor: '#1e90ff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Sign Up',
              headerStyle: {
                backgroundColor: '#1e90ff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
