import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { HomeCard } from '../components'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1147"
  }
})
function Home({navigation}) {


  return (

    <View  style={styles.container}>
      <HomeCard navigation={navigation}  />
    </View>

  )
}

export default Home