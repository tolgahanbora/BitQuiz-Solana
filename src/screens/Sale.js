import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';


import { SaleCard } from '../components'
import { supabase } from '../services';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1147"
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

})


const saleDataHealth = [
    {
        "id": 0,
        "image": require("../../assets/tickets.png"),
        "title": "Oyun Hakkı",
        "price": "Ücretsiz",
    },
    {
        "id": 1,
        "image": require("../../assets/tickets.png"),
        "title": "Oyun Hakkı",
        "price": 4.99,
        "Solana": 0.01,
    },
    {
        "id": 2,
        "image": require("../../assets/tickets.png"),
        "title": "3 Adet Oyun Hakkı",
        "price": 11.99,
        "Solana": 0.02,

    },
    {
        "id": 3,
        "image": require("../../assets/tickets.png"),
        "title": "5 Adet Oyun Hakkı",
        "price": 19.99,
        "Solana": 0.04,
    },
    {
        "id": 4,
        "image": require("../../assets/tickets.png"),
        "title": "10 Adet Oyun Hakkı",
        "price": 39.99,
        "Solana": 0.07,
    }
]

const saleDataTiming = [
    {
        "id": 0,
        "image": require("../../assets/timingjoker.png"),
        "title": "Zaman Jokeri",
        "price": "Ücretsiz",

    },
    {
        "id": 1,
        "image": require("../../assets/timingjoker.png"),
        "title": "Zaman Jokeri",
        "price": 1.99,
        "Solana": 0.005,
    },
    {
        "id": 2,
        "image": require("../../assets/timingjoker.png"),
        "title": "3 Adet Zaman Jokeri",
        "price": 3.99,
        "Solana": 0.008,

    },
    {
        "id": 3,
        "image": require("../../assets/timingjoker.png"),
        "title": "5 Adet Zaman Jokeri",
        "price": 4.99,
        "Solana": 0.009,
    },
    {
        "id": 4,
        "image": require("../../assets/timingjoker.png"),
        "title": "10 Adet Zaman Jokeri",
        "price": 12.99,
        "Solana": 0.015,
    }
]

const saleDataFiftyLucky = [
    {
        "id": 0,
        "image": require("../../assets/fiftylucky.png"),
        "title": "Yarı Şans",
        "price": "Ücretsiz",
    },
    {
        "id": 1,
        "image": require("../../assets/fiftylucky.png"),
        "title": "Yarı Şans",
        "price": 2.99,
        "Solana": 0.007,
    },
    {
        "id": 2,
        "image": require("../../assets/fiftylucky.png"),
        "title": "3 Adet Yarı Şans",
        "price": 6.99,
        "Solana": 0.013,
    },
    {
        "id": 3,
        "image": require("../../assets/fiftylucky.png"),
        "title": "5 Adet Yarı Şans",
        "price": 12.99,
        "Solana": 0.025,
    },
    {
        "id": 4,
        "image": require("../../assets/fiftylucky.png"),
        "title": "10 Adet Yarı Şans",
        "price": 22.99,
        "Solana": 0.041,
    }
]


function Sale() {
    const [userData, setUserData] = useState()

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

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Mağaza</Text>

                <View style={styles.jokerContainer}>
                    <Text style={styles.jokerHealth}><Entypo name="ticket" size={14} color="white" style={styles.icon} />Oyun Hakkı: {userData?.health}</Text>
                    <Text style={styles.jokerTiming}><Entypo name="back-in-time" size={14} color="white" />Zaman Jokeri: {userData?.timingJoker}</Text>
                    <Text style={styles.jokerFiftyLucky}><MaterialCommunityIcons name="clover" size={14} color="white" />Yarı Şans: {userData?.fiftyPercentJoker}</Text>
                </View>
                <View>
                    <Text style={styles.salesText}>
                        Oyun Hakları
                    </Text>
                    {/* FlatList for Health Sale Data */}
                    <FlatList
                        data={saleDataHealth}
                        renderItem={({ item }) => <SaleCard saleItem={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    />

                </View>

                <View>
                    <Text style={styles.salesText}>
                        Zaman Jokerleri
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
                        Yarı Şans Hakları
                    </Text>
                    {/* FlatList for Fifty Lucky Sale Data */}
                    <FlatList
                        data={saleDataFiftyLucky}
                        renderItem={({ item }) => <SaleCard saleItem={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    />

                </View>



            </View>
        </ScrollView>

    )
}

export default Sale