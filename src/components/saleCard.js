import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    margin: 20
  },

  cardContainer: {
    backgroundColor: "#32167C",
    borderRadius: 20,
    width: 200,
    height: 260
  },

  cardBody: {
    alignItems: "center"
  },
  cardImage: {
    height: 100,
    width: 100,
    margin: 20,
    marginBottom: 10,
    borderRadius: 20
  },
  cardBodyText: {
    textAlign: "center"
  },
  cardJokerName: {
    color: "#FEFEFE",
    fontSize: 19,
    fontWeight: "bold"
  },
  cardJokerQuantity: {
    margin: 5,
    color: "#FEFEFE",
    fontSize: 15,
    paddingLeft: 5,
    fontWeight: "bold"
  },
  cardButtonContainer: {
    alignItems: "center"
  },
  cardButton: {
    margin: 20,
    borderRadius: 20,
    width: 100,
    height: 40,
    backgroundColor:"#6949FD"
  },
  cardButtonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
  }
})

function SaleCard(props) {

  const { image, title, price } = props.saleItem; // Assuming you are passing saleItem as props

   // Function to show rewarded ad when "Satın Al" button is pressed
   function onBuyButtonPressed() {
    if (price === "Ücretsiz") {
      console.log("zor")

    } else {
      Alert.alert('Satın Alındı', '1 adet hak elde ettiniz. iyi oyunlar.', [
        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
    ]);
      // Implement the logic for in-app purchase for non-free items
      // You can use a payment gateway or other payment method here
    }
  }

  return (

    <View style={styles.container}>
    <View style={styles.cardContainer}>
      <View style={styles.cardBody}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardBodyText}>
          <Text style={styles.cardJokerName}>{title}</Text>
          <Text style={styles.cardJokerQuantity}>Fiyat: {price}</Text>
        </View>

        <View style={styles.cardButtonContainer}>
          <TouchableOpacity style={styles.cardButton} onPress={onBuyButtonPressed}>
            <Text style={styles.cardButtonText}>Satın Al</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>

  )
}

export default SaleCard