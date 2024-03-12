import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ImageBackground,ScrollView, Alert, Dimensions, Switch } from 'react-native';
import Modal from 'react-native-modal';

import BitQuizSvg from "../../assets/Bitquiz.png";

import { supabase } from '../services';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  textContainer: {
    marginTop: windowHeight * 0.3,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    fontSize: windowWidth * 0.08,
    fontWeight: "bold",
    color: "#fefefe",
  },
  subText: {
    marginTop: windowHeight * 0.02,
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
    color: "#fefefe",
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.25,
  },
  buttonLogin: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.09,
    borderRadius: 10,
    backgroundColor: "#6949FD",
    justifyContent: "center",
  },
  buttonRegister: {
    marginTop: 20,
    width: windowWidth * 0.8,
    height: windowHeight * 0.09,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6949FD",
    justifyContent: "center",
  },
  loginText: {
    color: "#FEFEFE",
    textAlign: "center",
    padding: windowWidth * 0.04,
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
  },
  registerText: {
    color: "#FEFEFE",
    textAlign: "center",
    padding: windowWidth * 0.04,
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: '#361E70',
    padding: windowWidth * 0.04,
    borderRadius: 15,
  },
  input: {
    borderColor: "#FEFEFE",
    borderWidth: 1,
    padding: windowWidth * 0.035,
    borderRadius: 10,
    margin: windowWidth * 0.045,
    marginBottom: windowHeight * 0.04,
    color: "#FEFEFE",
    fontSize: windowWidth * 0.05,
  },
  modalText: {
    fontWeight: "bold",
    color: "#FEFEFE",
    fontSize: windowWidth * 0.05,
  },
  loginModalButton: {
    margin: windowWidth * 0.045,
    backgroundColor: "#6949FD",
    borderRadius: 10,
    padding: windowWidth * 0.035,
  },
  loginModalButtonText: {
    color: "#FEFEFE",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: windowWidth * 0.045,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
  },
  switchLabel: {
    color: '#FEFEFE',
    fontSize: windowWidth * 0.039, // Adjust the font size as needed
    marginLeft: windowWidth * 0.021,
    textDecorationLine: 'underline', // Add underline decoration
  },
  terms: {
    fontSize: 16,
    color: '#888', // Gri renk
  },
  scrollView: {
    maxHeight: 550, // Scrollview'in maksimum yüksekliği
  }
});

function LoginCard({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [isPolicyModal, setIsPolicyModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalRegister = () => {
    setModalVisibleRegister(!isModalVisibleRegister);
  };

  const toggleModalPolicy = () => {
    setIsPolicyModal(!isPolicyModal);
  };

  const onHandleChangeUsername = (text) => {
    setUsername(text);
  };

  const onHandleChangeEmail = (text) => {
    setEmail(text);
  };

  const onHandleChangePassword = (text) => {
    setPassword(text);
  };

  const onSubmitRegister = async () => {
    if (!isChecked) {
      Alert.alert('Terms and Conditions', 'Please read and accept the Terms and Conditions.');
      return;
    }
  
    if (!username || !email || !password) {
      Alert.alert('Empty Fields', 'Please fill in all the fields.');
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            health: 5,
            token: 0,
            timingJoker: 0,
            fiftyPercentJoker: 0
          }
        }
      });
  
      if (error) {
        console.error(error);
      } else {
        Alert.alert('Registration Successful', 'Your account has been created. Log in and start earning now!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setModalVisibleRegister(false);
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const onSubmitLogin = async () => {
    if (!email || !password) {
      Alert.alert('Empty Fields', 'Please enter your email and password.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', 'Incorrect email or password. Please try again.');
        console.error('Error signing', error);
      } else {
        setModalVisible(false);
        navigation.navigate('Main', {
          screen: 'Home'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BitQuizSvg} resizeMode="stretch" style={styles.image}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.subText}>
              Play Now and Start Earning
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonLogin} onPress={toggleModal}>
              <Text style={styles.loginText}> Play Now </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister} onPress={toggleModalRegister}>
              <Text style={styles.registerText}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Modal isVisible={isModalVisible} swipeDirection='down' onBackdropPress={toggleModal} useNativeDriver={true}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Email:</Text>

          <TextInput
            inputMode='email'
            style={styles.input}
            onChangeText={onHandleChangeEmail}
            value={email}
          />

          <Text style={styles.modalText}>Password:</Text>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onHandleChangePassword}
            value={password}
          />

          <TouchableOpacity style={styles.loginModalButton} onPress={onSubmitLogin} >
            <Text style={styles.loginModalButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isModalVisibleRegister} swipeDirection='down' onBackdropPress={toggleModalRegister} useNativeDriver={true}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Username:</Text>

          <TextInput
            style={styles.input}
            onChangeText={onHandleChangeUsername}
            value={username}
          />

          <Text style={styles.modalText}>Email:</Text>

          <TextInput
            inputMode='email'
            style={styles.input}
            onChangeText={onHandleChangeEmail}
            value={email}
          />

          <Text style={styles.modalText}>Password:</Text>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onHandleChangePassword}
            value={password}
          />

          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isChecked ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isChecked}
            />
            <Text style={styles.switchLabel} onPress={toggleModalPolicy}>I have read and accepted the Terms and Policy</Text>
          </View>

          <TouchableOpacity style={styles.loginModalButton} onPress={onSubmitRegister} >
            <Text style={styles.loginModalButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <Modal isVisible={isPolicyModal} swipeDirection='down' onBackdropPress={toggleModalPolicy} useNativeDriver={true}>
        <View style={styles.modal}>
        <Text style={styles.text}>BitQuiz Terms and Conditions</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.terms} >
          **Terms & Conditions**

By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Tolgahan Bora. 

You should not lose your password. Because there is no possibility to renew your password in BitQuiz. Accounts remain with the password they had when they registered and cannot be changed.

Tolgahan Bora is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.

The BitQuiz app stores and processes personal data that you have provided to us, to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the BitQuiz app won’t work properly or at all.

The app does use third-party services that declare their Terms and Conditions.

Link to Terms and Conditions of third-party service providers used by the app

*   [Google Play Services](https://policies.google.com/terms)
*   [AdMob](https://developers.google.com/admob/terms)
*   [Expo](https://expo.io/terms)
*   [RevenueCat](https://www.revenuecat.com/terms)

You should be aware that there are certain things that Tolgahan Bora will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Tolgahan Bora cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.

If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.

Along the same lines, Tolgahan Bora cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Tolgahan Bora cannot accept responsibility.

With respect to Tolgahan Bora’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Tolgahan Bora accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.

At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for the both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Tolgahan Bora does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.

**Changes to This Terms and Conditions**
If you want to delete your account. Send an e-mail to support@bitquiz.app about how you want to delete it .
I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page.

These terms and conditions are effective as of 2024-02-11

**Contact Us**

If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me at support@bitquiz.app.

          </Text>
        </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default LoginCard;
