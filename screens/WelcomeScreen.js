import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import TouchableBtn from '../components/TouchableBtn';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgroundImg.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Text style={styles.headingStyle}>Watch Anime</Text>
        <Text style={styles.paragraphStyle}>
          Watch your favorite anime or movies on only one platform. You can
          watch it anytime and anywhere.
        </Text>
        <TouchableBtn text="Get Started" />
      </ImageBackground>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    paddingBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headingStyle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
