import React from 'react'
import { View, Text, StyleSheet,ImageBackground,Dimensions } from 'react-native'

import { HomeCard } from '../components'

import bitquizBackground from "../../assets/Bıtquız_background.png"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1147"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
},
})
function Home({navigation}) {


  return (

    <View  style={styles.container}>
      <ImageBackground source={bitquizBackground} resizeMode="stretch" style={styles.image}>
      <HomeCard navigation={navigation}  />
      </ImageBackground>

    </View>

  )
}

export default Home