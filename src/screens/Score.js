import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Vibration } from 'react-native'
import { useUser } from '../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { supabase } from '../services';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    width: 150,
    height: 150,
    backgroundColor: "#FAB42B",
    borderRadius: 70,
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

    marginTop: 100,
  },
  button: {
    width: 150,
    margin: 10,
    borderRadius: 13,
    backgroundColor: "#6949FD",
  },
  buttonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 16,
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
  }
})

const adUnitId = "ca-app-pub-2590549735225636/8301302478";


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
  keywords: ['fashion', 'clothing', 'crypto', 'web3', 'games', 'dApps', 'borsa', "kripto para", "iddia", "maçkolik", "futbol", "bahis"],
});


function Score({ navigation, route }) {

  const trueAnswer = route.params.trueAnswer;
  const confettiRef = useRef(null);
  const totalEarnedBTC = route.params.totalEarnedBTC || 0;
  const [loaded, setLoaded] = useState(false);

  const { user, loading } = useUser();


  useEffect(() => {
    updateToken();
  }, []);


  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);



 

  const updateToken = async () => {
    try {
      const newToken = user?.token + (totalEarnedBTC);
      await supabase.auth.updateUser({
        data: { token: newToken },
      });
    
  

    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };


  const confettiDelay = 500; // Delay time for confetti effect in milliseconds

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confettiRef.current && !confettiRef.current.state.emitting) {
        confettiRef.current.start();
        Vibration.vibrate([500]);
      }
    }, confettiDelay);
  
    return () => {
     clearTimeout(timer);
     Vibration.cancel();
    }
  }, [confettiRef, confettiDelay]);


  const onPlayAgain = async () => {
    try {
      if (loaded) {
        await interstitial.show();
      } else {
        Alert.alert('Ad not loaded', 'Please wait for the ad to load before trying again.');
      }
      navigation.navigate("Home");
    } catch (error) {
      navigation.navigate("Home");
    }
  };

  const onProfile = async () => {
    try {
      if (loaded) {
        await interstitial.show();
      } else {
        Alert.alert('Ad not loaded', 'Please wait for the ad to load before trying again.');
      }
      navigation.navigate("Profile");
    } catch (error) {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.HeaderContainer} >
        <Text style={styles.HeaderText}>Total Question you got right</Text>
        <Text style={styles.HeaderText}>{trueAnswer} correct in 10 questions</Text>
      </View>

      <LinearGradient
        colors={['#32167C', '#6949FD']}
        style={styles.cardContainer}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
        <Text style={styles.cardText}>Earned SOL</Text>
        <View style={styles.circle}>
          <Text style={styles.btcText}>{totalEarnedBTC.toFixed(6)}</Text>
        </View>
      </LinearGradient>

      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
      />


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPlayAgain}><Text style={styles.buttonText}>Play Again</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onProfile}><Text style={styles.buttonText}>Profile</Text></TouchableOpacity>
      </View>

    </View>
  )
}

export default Score