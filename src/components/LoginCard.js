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
  },
  modalText: {
    fontWeight: "bold",
    color: "#FEFEFE",
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

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalRegister = () => {
    setModalVisibleRegister(!isModalVisibleRegister);
  };

  const onHandleChangeUsername = (text) => {
    setUsername(text)
  }

  const onHandleChangeEmail = (text) => {
    setEmail(text)
  }


  const onHandleChangePassword = (text) => {
    setpassword(text)
  }


  //Register DB FUNC
  const onSubmitRegister = async () => {

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              health: 100,
              token: 0,
              timingJoker: 0,
              fiftyPercentJoker: 0
            }
          }
        }
      )
      if (error) {
        console.error(error)
      }
      else if (!error) {
        Alert.alert('Kayıt Başarılı', 'Hesabınız oluşturuldu, giriş yapın ve hemen kazanmaya başlayın!', [
          { text: 'Tamam', onPress: () => console.log('OK Pressed') },
        ]);
        setModalVisibleRegister(false)
        setUsername("")
        setEmail("")
        setpassword("")
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  //Login DB FUNC
  const onSubmitLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Error signing", error);
      } else if (!error) {
        console.log('Giriş başarılı ');
        setModalVisible(false);

        // Main stack içindeki Tab Navigator'a yönlendirme yapalım
        navigation.navigate("Main", {
          screen: "Profile",
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
              Hemen Oyna ve Kazanmaya Başla
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonLogin} onPress={toggleModal}>
              <Text style={styles.loginText}> Hemen Oyna </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister} onPress={toggleModalRegister}>
              <Text style={styles.registerText}> Kayıt Ol </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Login Modal */}
      <Modal isVisible={isModalVisible} swipeDirection='down' onBackdropPress={toggleModal} useNativeDriver={true}>
        {/* Burada modal içeriğini oluşturabilirsiniz */}
        <View style={styles.modal}>
          <Text style={styles.modalText}>Kullanıcı Adı:</Text>

          <TextInput
            inputMode='email'
            style={styles.input}
            onChangeText={onHandleChangeEmail}
            value={email}
          />

          <Text style={styles.modalText}>Şifre:</Text>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onHandleChangePassword}
            value={password}
          />

          <TouchableOpacity style={styles.loginModalButton} onPress={onSubmitLogin} >
            <Text style={styles.loginModalButtonText}>Giriş</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Register Modal */}
      <Modal isVisible={isModalVisibleRegister} swipeDirection='down' onBackdropPress={toggleModalRegister} useNativeDriver={true}>
        {/* Burada modal içeriğini oluşturabilirsiniz */}
        <View style={styles.modal}>
          <Text style={styles.modalText}>Kullanıcı Adı:</Text>

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


          <Text style={styles.modalText}>Şifre:</Text>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onHandleChangePassword}
            value={password}
          />

          <TouchableOpacity style={styles.loginModalButton} onPress={onSubmitRegister} >
            <Text style={styles.loginModalButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>


  )
}

export default LoginCard