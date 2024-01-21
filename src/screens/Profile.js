import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, Modal, TextInput, Linking, PixelRatio } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { supabase } from '../services';

import axios from 'axios';



import { Buffer } from "buffer";


import avatar from "../../assets/avatar.png"
import solana from "../../assets/solanaLogoMark.png"
import bitquizBackground from "../../assets/Bıtquız_background.png"


const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

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
    fontSize: windowWidth * 0.05,
    margin: 15,
    textAlign: "center",
    marginBottom: 6
  },
  bitcoin: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: windowWidth * 0.05,
    margin: 15,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",


  },
  jokerContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Align items horizontally with space around
    alignItems: "center", // Center items vertically
    marginTop: '2%', // Use a relative value
  },
  jokerHealth: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: windowWidth * 0.036,
    margin: 0,
    textAlign: "center"
  },
  jokerTiming: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: windowWidth * 0.036,
    margin: 15,
    textAlign: "center"
  },
  jokerFiftyLucky: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: windowWidth * 0.036,
    margin: 0,
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "center"
  },
  buttonBTC: {
    backgroundColor: "#6949FD",
    borderRadius: 40,
    width: "50%",
    padding: windowWidth * 0.04,
    margin: 68
  },
  buttonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    
    justifyContent: "center",
  },
  bodyContainer: {
    marginTop: 20,
    height: windowHeight * 0.29,
    borderRadius: 20,
    width: windowWidth * 0.99,
    marginLeft: 0,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
// Update the solanaImage style in the styles object
solanaImage: {
  alignSelf: 'center', // Center the image horizontally

  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',

},

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

  },
  input: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: windowWidth * 0.04,
    fontSize: windowWidth * 0.05,

    marginBottom: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#6949FD',
    marginTop: 20,
    width: windowWidth * 0.5,
    height: windowHeight * 0.06,
    borderRadius: 30,
    textAlign: "center",
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  closeButton: {
    backgroundColor: '#FF0000',
    width: windowWidth * 0.5,
    height: windowHeight * 0.06,
    borderRadius: 35,
    marginTop: 20,
    textAlign: "center",
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
})

function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState('');
  const [showConfetti, setShowConfetti] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  global.Buffer = Buffer;

  const { user } = useUser();





  // Solana göndermeyi sorguluyorum
  const sendSolanaTokens = async (toAddress) => {

    if (!isButtonDisabled && user?.token >= 1) {
      setIsButtonDisabled(true); // Disable the button

      try {


        const response = await axios.post('https://solana-pay-api.onrender.com/sendTransaction', {
          toWallet: toAddress,
          amountInLamports: user?.token
        });


        if (response.data) {

          const { data, error } = await supabase.auth.updateUser({
            data: { token: 0 }
          })

          if (!error) {


            alert('Solana transfer successful!');
            setShowConfetti(true); // Confetti'yi göster
          }
        }



      } catch (error) {
        console.error('Transfer Error:', error);
        alert('An error occurred during the transfer process.');
      } finally {
        setIsButtonDisabled(false); // Re-enable the button after API call completes
      }
    } else {

      alert('Your Solana balance is insufficient.');
    }
  };

  const openPhantomHelp = () => {
    Linking.openURL('https://youtu.be/Gyfpdk0F08Q?si=YqyLiopU9HFqztsg');
  }


  return (

    <View style={styles.container}>



      <ImageBackground source={bitquizBackground} resizeMode="stretch" >


        <View style={styles.avatarContainer}>
          <Text style={styles.header}>
            Profile
          </Text>
          <Image source={avatar} style={styles.avatar} />
        </View>

        <View style={styles.usernameContainer} >
          <Text style={styles.username}>{user?.username}</Text>


        </View>
        <LinearGradient
          colors={['#32167C', '#6949FD']}
          style={styles.bodyContainer}
          start={[0, 0.05]}
          end={[1, 0.05]}
        >
          <Image style={styles.solanaImage} source={solana} />
          <Text style={styles.bitcoin}>Solana: {user?.token.toFixed(7)}</Text>

          <View style={styles.jokerContainer}>
            <Text style={styles.jokerHealth}>Game Ticket: {user?.health}</Text>
            <Text style={styles.jokerTiming}>Time Joker: {user?.timingJoker}</Text>
            <Text style={styles.jokerFiftyLucky}>Fifty Lucky: {user?.fiftyPercentJoker}</Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBTC} >
            <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>Withdrawal SOL</Text>
          </TouchableOpacity>
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>

            <TouchableOpacity onPress={() => openPhantomHelp()}>
              <FontAwesome name="info-circle" size={40} color="white" />
            </TouchableOpacity>


            <TextInput
              style={styles.input}
              placeholder="Enter Solana Address"
              value={solanaAddress}
              required
              onChangeText={text => setSolanaAddress(text)}
            />


            <TextInput
              style={styles.input}
              placeholder="Amount of Solana"
              value={user?.token.toFixed(7)}
              editable={false}

            />


            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendSolanaTokens(solanaAddress)}
              disabled={isButtonDisabled} // Disable button using TouchableOpacity's disabled prop
            >
              <Text style={styles.buttonText}>Send Solana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>


      </ImageBackground>
    </View>
  )
}

export default Profile