import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions, Linking,PixelRatio } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../services';
import solanaImage from "../../assets/mainImage.png"

import { useUser } from '../context/UserContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Function to calculate responsive font size
const responsiveFontSize = (fontSize) => {
  const standardWidth = 375; // You can adjust this value as needed
  const widthPercent = (fontSize * 100) / standardWidth;
  const newSize = (windowWidth * widthPercent) / 100;
  return PixelRatio.roundToNearestPixel(newSize);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  headerContainer:
  {
    alignItems: "center"
  },
  image: {
    margin: 50,
    height: 250,
    width: 250,
  },
  mainText: {
    color: "#FEFEFE",
    fontSize: windowWidth * 0.05,
    fontWeight: "bold"
  },
  buttonContainer: {
    alignItems: "center"
  },
  button: {
    borderRadius: 50,
    width: 300,
    backgroundColor: "#6949FD"
  },
  buttonText: {
    color: "#FEFEFE",
    padding: 20,
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    fontWeight: "bold"
  },
  icon: {
    marginLeft: "0%",
    marginRight: "5%"
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 0, // Set marginTop to 0
  },
  iconText: {
    color: "#fefefe",
    fontSize:  windowWidth * 0.047,
    fontWeight: "bold"
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  countdownContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  countdownText: {
    color: "#fefefe",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
})


function HomeCard({ navigation }) {

  const [ticket, setTicket] = useState();
  const [countdown, setCountdown] = useState(0);

  const { user, loading } = useUser();

  const openYouTubeTutorial = () => {
    const youtubeUrl = 'https://youtu.be/0VjQ86Ssy-I?si=1y1oETW78MuSL2jw'; // Değiştirilmesi gereken yer: YOUR_VIDEO_ID
    Linking.openURL(youtubeUrl);
  };

 



  const updateTicket = async (newTicketValue) => {
    try {
      await supabase.auth.updateUser({
        data: { health: newTicketValue },
      });
      setTicket(newTicketValue);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

 

  const onHandleClick = async () => {
    if (user?.health > 0) {
      const newTicketValue = user?.health - 1;
      await updateTicket(newTicketValue);
      navigation.navigate('Quiz');
    } else {
      Alert.alert(
        'No Ticket Left',
        'You are out of game tickets, please buy game tickets.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  


  return (

    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          <Entypo name="ticket" size={30} color="white" style={styles.icon} />
          <Text style={styles.iconText}>{user?.health}</Text>
          <TouchableOpacity onPress={openYouTubeTutorial} style={{  marginLeft: 25 }}>
            {/* How to play? butonu için stil ve içerik */}
            <FontAwesome name="info-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.mainText} >Learn with Fun, Earn Solana</Text>
        <Image source={solanaImage} style={styles.image} />

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onHandleClick}>
          <Text style={styles.buttonText}>Play Now</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default HomeCard