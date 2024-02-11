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
        fontSize: windowWidth * 0.08,
        margin: 40
    },
    salesText: {
        marginLeft: 20,
        marginTop: 10,
        color: "#FEFEFE",
        fontSize: windowWidth * 0.06,
        fontWeight: "bold",
    },
    jokerContainer: {
        flex:1,
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth * 1.33,
    },
    jokerHealth: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.035,
        margin: 0,
        textAlign: "center"
    },
    jokerTiming: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.035,
        margin: 15,
        textAlign: "center"
    },
    jokerFiftyLucky: {
        fontWeight: "bold",
        color: "#FEFEFE",
        fontSize: windowWidth * 0.035,
        margin: 0,
        textAlign: "center"
    },

})





function Sale() {
    const { user, loading, productIds } = useUser();

    const gameTicket1 = productIds.find(item => item.identifier === "game_ticket");
    const gameTicket3 = productIds.find(item => item.identifier === "game_ticket3");
    const gameTicket5 = productIds.find(item => item.identifier === "game_ticket5");
    const gameTicket10 = productIds.find(item => item.identifier === "game_ticket10");

    const timeJoker1 = productIds.find(item => item.identifier === "time_joker");
    const timeJoker3 = productIds.find(item => item.identifier === "time_joker3");
    const timeJoker5 = productIds.find(item => item.identifier === "time_joker5");
    const timeJoker10 = productIds.find(item => item.identifier === "time_joker10");

    const fiftyLucky1 = productIds.find(item => item.identifier === "fifty_lucky");
    const fiftyLucky3 = productIds.find(item => item.identifier === "fifty_lucky3");
    const fiftyLucky5 = productIds.find(item => item.identifier === "fifty_lucky5");
    const fiftyLucky10 = productIds.find(item => item.identifier === "fifty_lucky10");

  

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
        "title": "1 Game Ticket",
        "price": gameTicket1.product.priceString,
        "Solana": 0.24,
    },
    {
        "id": 2,
        "image": require("../../assets/tickets.png"),
        "title": "3 Game Tickets",
        "price":gameTicket3.product.priceString,
        "Solana": 0.51,

    },
    {
        "id": 3,
        "image": require("../../assets/tickets.png"),
        "title": "5 Game Tickets",
        "price": gameTicket5.product.priceString,
        "Solana": 0.8,
    },
    {
        "id": 4,
        "image": require("../../assets/tickets.png"),
        "title": "10 Game Tickets",
        "price": gameTicket10.product.priceString,
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
        "title": "1 Time Joker",
        "price": timeJoker1.product.priceString,
        "Solana": 0.2,
    },
    {
        "id": 2,
        "image": require("../../assets/timingjoker.png"),
        "title": "3 Time Jokers",
        "price": timeJoker3.product.priceString,
        "Solana": 0.05,

    },
    {
        "id": 3,
        "image": require("../../assets/timingjoker.png"),
        "title": "5 Time Jokers",
        "price": timeJoker5.product.priceString,
        "Solana": 0.7,
    },
    {
        "id": 4,
        "image": require("../../assets/timingjoker.png"),
        "title": "10 Time Jokers",
        "price": timeJoker10.product.priceString,
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
        "title": "1 Fifty Lucky",
        "price": fiftyLucky1.product.priceString,
        "Solana": 0.23,
    },
    {
        "id": 2,
        "image": require("../../assets/fiftylucky.png"),
        "title": "3 Fifty Lucky",
        "price": fiftyLucky3.product.priceString,
        "Solana": 0.6,
    },
    {
        "id": 3,
        "image": require("../../assets/fiftylucky.png"),
        "title": "5 Fifty Lucky",
        "price": fiftyLucky5.product.priceString,
        "Solana": 0.9,
    },
    {
        "id": 4,
        "image": require("../../assets/fiftylucky.png"),
        "title": "10 Fifty Lucky",
        "price": fiftyLucky10.product.priceString,
        "Solana": 1.1,
    }
];

  

    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Shop</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.jokerContainer} >
                    <Text style={styles.jokerHealth}><Entypo name="ticket" size={20} color="white" style={styles.icon} /> Game Ticket: {user?.health}</Text>
                    <Text style={styles.jokerTiming}><Entypo name="back-in-time" size={20} color="white" /> Time Joker: {user?.timingJoker}</Text>
                    <Text style={styles.jokerFiftyLucky}><MaterialCommunityIcons name="clover" size={20} color="white" /> Fifty Lucky: {user?.fiftyPercentJoker}</Text>
                </View>
                </ScrollView>
                <View>
                    <Text style={styles.salesText}>
                        Game Tickets
                    </Text>
                    {/* FlatList for Health Sale Data */}
                    <FlatList
                        data={saleDataHealth}
                        renderItem={({ item }) =>  <SaleCard saleItem={item}   />}
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
                        renderItem={({ item }) => <SaleCard saleItem={item}  />}
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