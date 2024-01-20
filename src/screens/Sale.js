import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView,Dimensions,PixelRatio  } from 'react-native'
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';

import { useUser } from '../context/UserContext';
import { SaleCard } from '../components'

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
        backgroundColor: "#1F1147",
        textAlign: "center",
    },
    header: {
        textAlign: "center",
        color: "#FEFEFE",
        fontWeight: "bold",
        fontSize: 35,
        margin: 40
    },
    salesText: {
        marginLeft: 20,
        marginTop: 10,
        color: "#FEFEFE",
        fontSize: 18,
        fontWeight: "bold",
    },
    jokerContainer: {
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        marginLeft: 3,
    },
    jokerHealth: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.038,
        margin: 0,
        textAlign: "center"
    },
    jokerTiming: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.038,
        margin: 15,
        textAlign: "center"
    },
    jokerFiftyLucky: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.037,
        margin: 0,
        textAlign: "center"
    },

})


const saleDataHealth = [
    {
        "id": 0,
        "image": require("../../assets/tickets.png"),
        "title": "Game Ticket",
        "price": "Free",
    },
    {
        "id": 1,
        "image": require("../../assets/tickets.png"),
        "title": "Game Ticket",
        "price": 0.99,
        "Solana": 0.24,
    },
    {
        "id": 2,
        "image": require("../../assets/tickets.png"),
        "title": "3 Game Tickets",
        "price": 1.24,
        "Solana": 0.51,

    },
    {
        "id": 3,
        "image": require("../../assets/tickets.png"),
        "title": "5 Game Tickets",
        "price": 1.99,
        "Solana": 0.8,
    },
    {
        "id": 4,
        "image": require("../../assets/tickets.png"),
        "title": "10 Game Tickets",
        "price": 3.79,
        "Solana": 1.2,
    }
];

const saleDataTiming = [
    {
        "id": 0,
        "image": require("../../assets/timingjoker.png"),
        "title": "Time Joker",
        "price": "Free",

    },
    {
        "id": 1,
        "image": require("../../assets/timingjoker.png"),
        "title": "Time Joker",
        "price": 0.24,
        "Solana": 0.2,
    },
    {
        "id": 2,
        "image": require("../../assets/timingjoker.png"),
        "title": "3 Time Jokers",
        "price": 0.59,
        "Solana": 0.05,

    },
    {
        "id": 3,
        "image": require("../../assets/timingjoker.png"),
        "title": "5 Time Jokers",
        "price": 0.79,
        "Solana": 0.7,
    },
    {
        "id": 4,
        "image": require("../../assets/timingjoker.png"),
        "title": "10 Time Jokers",
        "price": 1.09,
        "Solana": 1,
    }
];

const saleDataFiftyLucky = [
    {
        "id": 0,
        "image": require("../../assets/fiftylucky.png"),
        "title": "Fifty Lucky",
        "price": "Free",
    },
    {
        "id": 1,
        "image": require("../../assets/fiftylucky.png"),
        "title": "Fifty Lucky",
        "price": 0.58,
        "Solana": 0.23,
    },
    {
        "id": 2,
        "image": require("../../assets/fiftylucky.png"),
        "title": "3 Fifty Luckies",
        "price": 0.98,
        "Solana": 0.6,
    },
    {
        "id": 3,
        "image": require("../../assets/fiftylucky.png"),
        "title": "5 Fifty Luckies",
        "price": 1.49,
        "Solana": 0.9,
    },
    {
        "id": 4,
        "image": require("../../assets/fiftylucky.png"),
        "title": "10 Fifty Luckies",
        "price": 2.19,
        "Solana": 1.1,
    }
];



function Sale() {
    const { user, loading } = useUser();

   
    

  

    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Shop</Text>

                <View style={styles.jokerContainer}>
                    <Text style={styles.jokerHealth}><Entypo name="ticket" size={14} color="white" style={styles.icon} />Game Ticket: {user?.health}</Text>
                    <Text style={styles.jokerTiming}><Entypo name="back-in-time" size={14} color="white" />Time Joker: {user?.timingJoker}</Text>
                    <Text style={styles.jokerFiftyLucky}><MaterialCommunityIcons name="clover" size={14} color="white" />Fifty Lucky: {user?.fiftyPercentJoker}</Text>
                </View>
                <View>
                    <Text style={styles.salesText}>
                        Game Tickets
                    </Text>
                    {/* FlatList for Health Sale Data */}
                    <FlatList
                        data={saleDataHealth}
                        renderItem={({ item }) =>  <SaleCard saleItem={item}  />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    />

                </View>

                <View>
                    <Text style={styles.salesText}>
                        Time Jokers
                    </Text>
                    {/* FlatList for Timing Sale Data */}
                    <FlatList
                        data={saleDataTiming}
                        renderItem={({ item }) => <SaleCard saleItem={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    />
                </View>


                <View >

                    <Text style={styles.salesText}>
                        Fifty Luckies
                    </Text>
                    {/* FlatList for Fifty Lucky Sale Data */}
                    <FlatList
                        data={saleDataFiftyLucky}
                        renderItem={({ item }) =>  <SaleCard saleItem={item}   />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    />

                </View>



            </View>
        </ScrollView>

    )
}

export default Sale