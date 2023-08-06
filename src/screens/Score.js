import React, {useEffect, useState, useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import { supabase } from '../services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1147",
    alignItems: "center",
    justifyContent: "center"
  },
  HeaderContainer: {
    textAlign: "left",
    marginTop: 20,
  },
  HeaderText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left"
  },
  cardContainer: {
    borderRadius: 19,
    marginTop: 40,
    width: 270,
    height: 270,
    backgroundColor: "#32167C",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  cardText: {
    color: "#FEFEFE",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30
  },
  circle: {
    width: 120,
    height: 120,
    backgroundColor: "#FAB42B",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center", // Metni yatay ve dikey yönde de ortalar
  },
  btcText: {
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  buttonContainer: {
    flexDirection: "row",
    margin: 50,
    marginTop: 100,
  },
  button: {
    width: 170,
    height: 60,
    margin: 10,
    borderRadius: 13,
    backgroundColor: "#6949FD",
  },
  buttonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
  }
})

function Score({navigation, route}) {
  const [token, setToken] = useState(0);
  const trueAnswer = route.params.trueAnswer;
  const confettiRef = useRef(null);
  const totalEarnedBTC = route.params.totalEarnedBTC || 0;


  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    updateToken();
  }, [token]);

  const getToken = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setToken(user?.user_metadata.token || 0);
    } catch (e) {
      console.error('Error fetching ticket:', e);
    }
  };

  const updateToken = async () => {
    try {
      const newToken = token + totalEarnedBTC;
      await supabase.auth.updateUser({
        data: { token: newToken },
      });
      console.log(newToken);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };


  useEffect(() => {
    // Sayfa açıldığında konfeti patlaması için 1.5 saniye sonra ateşleme yapın
    const timer = setTimeout(() => {
      if (confettiRef.current) {
        confettiRef.current.start();
      }
    }, 1000);

    // useEffect temizleme işlemi
    return () => clearTimeout(timer);
  }, []);

  const onPlayAgain = () => {
    navigation.navigate("Home")
  }

  const onProfile = () => {
    navigation.navigate("Profile")
  }

  return (
    <View style={styles.container}>

      <View style={styles.HeaderContainer} >
        <Text style={styles.HeaderText}>Toplam Doğru yaptığın soru</Text>
        <Text style={styles.HeaderText}>10 soruda {trueAnswer} doğru</Text>
      </View>

      <LinearGradient
        colors={['#32167C', '#6949FD']}
        style={styles.cardContainer}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
        <Text style={styles.cardText}>Kazandığın BTC</Text>
        <View style={styles.circle}>
          <Text style={styles.btcText}>{totalEarnedBTC.toFixed(7)}</Text>
        </View>
      </LinearGradient>

      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
      />


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPlayAgain}><Text style={styles.buttonText}>Tekrar Oyna</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onProfile}><Text style={styles.buttonText}>Profile Dön</Text></TouchableOpacity>
      </View>

    </View>
  )
}

export default Score