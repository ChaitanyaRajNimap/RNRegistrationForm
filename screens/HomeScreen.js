import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async () => {
      try {
        let value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value);
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  setStringValue = async value => {
    let valueStr = value.toString();
    try {
      await AsyncStorage.setItem('isLoggedIn', valueStr);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}>Welcome User!! {isLoggedIn}</Text>
      <Text>{isLoggedIn}</Text>
      <Button title="Remove" onPress={() => setStringValue(false)} />
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
