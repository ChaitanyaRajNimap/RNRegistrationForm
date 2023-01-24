import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    //for reading data stored in async
    async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('isLoggedIn');
        jsonValue != null ? JSON.parse(jsonValue) : null;
        // return jsonValue;
        setIsLoggedIn(jsonValue);
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  //for storing data async way
  const removeLoggedIn = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('isLoggedIn', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}>Welcome User!! {isLoggedIn}</Text>
      <Text>{isLoggedIn}</Text>
      <Button title="Logout" onPress={() => removeLoggedIn(false)} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
