import React from 'react'
import { View, SafeAreaView, StyleSheet,ImageBackground,Dimensions } from 'react-native'

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
containerr: {
  flex: 2,
},
})
function Home({navigation}) {


  return (
    <SafeAreaView style={styles.containerr}>
    <View  style={styles.container}>
          
      <ImageBackground source={bitquizBackground} resizeMode="stretch" style={styles.image}>
      <HomeCard navigation={navigation}  />
      </ImageBackground>
    
    </View>
    </SafeAreaView>
  )
}

export default Home