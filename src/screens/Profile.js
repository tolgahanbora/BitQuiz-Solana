import React,{ useState,useEffect } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../services';

import avatar from "../../assets/avatar.png"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1147",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    color: "#FEFEFE",
    fontWeight: "bold",
    fontSize: 35,
    margin: 40
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  usernameContainer: {
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 25,
    margin: 15,
    textAlign: "center",
    marginBottom: 6
  },
  bitcoin: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 25,
    margin: 15,
    textAlign: "center"

  },
  jokerContainer: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    padding: 15
  },
  jokerHealth: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 12,
    margin: 0,
    textAlign: "center"
  },
  jokerTiming: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 12,
    margin: 15,
    textAlign: "center"
  },
  jokerFiftyLucky: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 12,
    margin: 0,
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "center"
  },
  buttonBTC: {
    backgroundColor: "#6949FD",
    borderRadius: 40,
    width: 200,
    height: 50,
    margin: 100
  },
  buttonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyContainer:{
    marginTop: 20,
    height: 200,
    borderRadius: 20,
    width: 350
  }
})

function Profile() {
  const [userData, setUserData] = useState()

  const getTicket = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        setUserData(user.user_metadata)
    }
    catch (e) {
        console.error("Error fetching ticket:", e)
    }
}


useEffect(() => {
  getTicket()
}, [])

  return (

    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.header}>
          Profile
        </Text>
        <Image source={avatar} style={styles.avatar} />
      </View>

      <View style={styles.usernameContainer} >
        <Text style={styles.username}>{userData?.username}</Text>
        

      </View>
      <LinearGradient
        colors={['#32167C', '#6949FD']}
        style={styles.bodyContainer}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
      <Text style={styles.bitcoin}>Bitcoin: {userData?.token.toFixed(8)}</Text>
   
      <View style={styles.jokerContainer}>
        <Text style={styles.jokerHealth}>Oyun Hakkı: {userData?.health}</Text>
        <Text style={styles.jokerTiming}>Zaman Jokeri: {userData?.timingJoker}</Text>
        <Text style={styles.jokerFiftyLucky}>Yarı Şans Jokeri: {userData?.fiftyPercentJoker}</Text>
      </View>
      </LinearGradient>

      <View style={styles.buttonContainer}> 
        <TouchableOpacity style={styles.buttonBTC} >
          <Text style={styles.buttonText}>BTC Çek</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile