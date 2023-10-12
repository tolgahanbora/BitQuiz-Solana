import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services';
import solanaImage from "../../assets/mainImage.png"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

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
        fontSize: windowWidth * 0.07,
        fontWeight: "bold"
    },
    buttonContainer: {
        alignItems: "center"
    },
    button: {
        borderRadius: 50,
        height: windowHeight * 0.095,
        width: 300,
        backgroundColor: "#6949FD"
    },
    buttonText: {
        color: "#FEFEFE",
        padding: 20,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    icon: {
        marginLeft: "0%",
        marginRight: "5%"
    },
    iconContainer: {
        marginRight: "0%", // Add margin to separate the icon from the image
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    iconText: {
        color: "#fefefe",
        marginTop: 5,
        fontSize: 12,
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

  const TICKET_INTERVAL = 24 * 60 * 60 * 1000; // 24 saat
  const COUNTDOWN_INTERVAL = 1000; // 1 saniye

  useEffect(() => {
    const setInitialTicketTime = async () => {
      const lastTicketTime = await AsyncStorage.getItem('lastTicketTime');
      if (!lastTicketTime) {
        const currentTime = new Date().getTime();
        await AsyncStorage.setItem('lastTicketTime', currentTime.toString());

      }
    };
    setInitialTicketTime();
  }, []);

  const getTicket = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setTicket(user.user_metadata);

    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
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

  const grantTicketsEvery24Hours = async () => {
    await getTicket();

    const lastTicketTime = await AsyncStorage.getItem('lastTicketTime');
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - parseInt(lastTicketTime);

    if (timeDifference >= TICKET_INTERVAL) {
      const newTicketValue = ticket?.health + 2;
      await updateTicket(newTicketValue);

       // 24 saatlik aralığı güncelle
       await AsyncStorage.setItem('lastTicketTime', currentTime.toString());

      await getTicket();
    }

    setCountdown(TICKET_INTERVAL - timeDifference);
  };

  const onHandleClick = async () => {
    if (ticket?.health > 0) {
      const newTicketValue = ticket?.health - 1;
      await updateTicket(newTicketValue);
      navigation.navigate('Quiz');
    } else {
      Alert.alert(
        'Ticket yok',
        'Oyun Hakkınız Kalmadı, Lütfen oyun hakkı alın.',
        [{ text: 'Tamam', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  useEffect(() => {
    getTicket();
   
  }, [ticket]);



  useEffect(() => {
    grantTicketsEvery24Hours();

    const ticketInterval = setInterval(grantTicketsEvery24Hours, TICKET_INTERVAL);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > COUNTDOWN_INTERVAL) {
          return prevCountdown - COUNTDOWN_INTERVAL;
        } else {
          return TICKET_INTERVAL;
        }
      });
    }, COUNTDOWN_INTERVAL);

    return () => {
      clearInterval(ticketInterval);
      clearInterval(countdownInterval);
    };
  }, []);


    return (

        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View  style={styles.iconRow}>
                    <Entypo name="ticket" size={20} color="white" style={styles.icon} />
                    <Text style={styles.iconText}>{ticket?.health}</Text>
                </View>


                <View>
              
                <View style={styles.iconRow}>
                    <Entypo name="ticket" size={20} color="white" style={styles.icon} />
                    <Text style={styles.iconText}>+2</Text>
                </View>
                <View style={styles.countdownContainer}>
                    <Text style={styles.countdownText}>
                        {Math.floor(countdown / 3600000)}h {Math.floor((countdown % 3600000) / 60000)}m{" "}
                        {Math.floor((countdown % 60000) / 1000)}s
                    </Text>
                </View>
                </View>

            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.mainText} >Eğlenerek Öğren, Solana Coin Kazan</Text>
                <Image source={solanaImage} style={styles.image} />

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onHandleClick}>
                    <Text style={styles.buttonText}>Oynamaya Başla</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default HomeCard