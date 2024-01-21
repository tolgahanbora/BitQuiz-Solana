import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Dimensions } from 'react-native'
import Modal from 'react-native-modal';

import BitQuizSvg from "../../assets/Bitquiz.png"

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
});



function LoginCard({ navigation }) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalRegister = () => {
    setModalVisibleRegister(!isModalVisibleRegister);
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
          screen: 'Profile',
          params: {
            email: email,
            username: username,
          },
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

      {/* Login Modal */}
      <Modal isVisible={isModalVisible} swipeDirection='down' onBackdropPress={toggleModal} useNativeDriver={true}>
        {/* Burada modal içeriğini oluşturabilirsiniz */}
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

      {/* Register Modal */}
      <Modal isVisible={isModalVisibleRegister} swipeDirection='down' onBackdropPress={toggleModalRegister} useNativeDriver={true}>
        {/* Burada modal içeriğini oluşturabilirsiniz */}
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

          <TouchableOpacity style={styles.loginModalButton} onPress={onSubmitRegister} >
            <Text style={styles.loginModalButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>


  )
}

export default LoginCard