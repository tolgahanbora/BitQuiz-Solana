import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, Modal, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../services';


import web3 from '@solana/web3.js';
import bs58 from "bs58"

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

  },
  jokerHealth: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 10,
    margin: 0,
    textAlign: "center"
  },
  jokerTiming: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 10,
    margin: 15,
    textAlign: "center"
  },
  jokerFiftyLucky: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: 10,
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
    height: windowWidth * 0.15,
    margin: 68
  },
  buttonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
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
  solana: {
    width: 15,
    height: 15
  },


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: 250,
    marginBottom: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#6949FD',
    marginTop: 20,
    width: 170,
    height: 60,
    borderRadius: 30,
  },
  sendButtonText: {
    fontSize: windowWidth * 0.05
  },  
  closeButton: {
    backgroundColor: '#FF0000',
    height: 60,
    width: 130,
    borderRadius: 35,
    marginTop: 20,
  },
})

function Profile() {
  const [userData, setUserData] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState('');



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
  }, [userData])

  // Solana göndermeyi sorguluyorum
  const sendSolanaTokens = async () => {
    if (userData?.token > 0.1) {
      try {

        const connection = new web3.Connection("https://nd-848-731-192.p2pify.com/903990d427034c601d4a9cfa160cc450")

        const privateKey = new Uint8Array(bs58.decode("28eJQjaKzY9yYAm8cTE3JEiE3Ps6x7UAXr9KP7saRJNdYnEbyAgAi5oM8Hc8oe5BATo6J9s68Uxq1cWCLZmCUAMo"))

        const  adminAccount = web3.Keypair.fromSecretKey(privateKey)

        const userAccount = web3.PublicKey(solanaAddress);

     
          const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
              fromPubkey: adminAccount.publicKey,
              toPubkey: userAccount.publicKey,
              lamports: web3.LAMPORTS_PER_SOL * 0.01,
            }),
          ) 

          const signature =  await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [adminAccount]
          )
        

    


          

        alert('Solana token transfer işlemi başarılı!');
      } catch (error) {
        console.error('Transfer Error:', error);
        alert('Transfer işlemi sırasında bir hata oluştu.');
      }
    } else {
      
      const connection = new web3.Connection("https://nd-848-731-192.p2pify.com/903990d427034c601d4a9cfa160cc450")

      const privateKey = new Uint8Array(bs58.decode("28eJQjaKzY9yYAm8cTE3JEiE3Ps6x7UAXr9KP7saRJNdYnEbyAgAi5oM8Hc8oe5BATo6J9s68Uxq1cWCLZmCUAMo"))

      const  adminAccount = web3.Keypair.fromSecretKey(privateKey)

      const userAccount = web3.Keypair.generate()

   
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: adminAccount.publicKey,
            toPubkey: userAccount.publicKey,
            lamports: web3.LAMPORTS_PER_SOL * 0.01,
          }),
        ) 

        const signature =  await web3.sendAndConfirmTransaction(
          connection,
          transaction,
          [adminAccount]
        )
      
    }
  };

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
          <Text style={styles.username}>{userData?.username}</Text>


        </View>
        <LinearGradient
          colors={['#32167C', '#6949FD']}
          style={styles.bodyContainer}
          start={[0, 0.5]}
          end={[1, 0.5]}
        >
          <Text style={styles.bitcoin}>Solana: {userData?.token.toFixed(7)}<Image source={solana} /></Text>

          <View style={styles.jokerContainer}>
            <Text style={styles.jokerHealth}>Oyun Hakkı: {userData?.health}</Text>
            <Text style={styles.jokerTiming}>Zaman Jokeri: {userData?.timingJoker}</Text>
            <Text style={styles.jokerFiftyLucky}>Yarı Şans Jokeri: {userData?.fiftyPercentJoker}</Text>
          </View>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBTC} >
            <Text style={styles.buttonText} onPress={() => setModalVisible(true)}>Solana Çek</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Enter Solana Address"
              value={solanaAddress}
              onChangeText={text => setSolanaAddress(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gönderilecek Miktar"
              value={userData?.token.toFixed(7)}
              editable={false}
            />


            <TouchableOpacity style={styles.sendButton} onPress={sendSolanaTokens}>
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