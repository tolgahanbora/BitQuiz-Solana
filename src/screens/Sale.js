import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'


import { SaleCard } from '../components'

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
    }

})


const saleDataHealth = [
    {
        "id": 0,
        "image": "https://loremflickr.com/320/240",
        "title": "Oyun Hakkı",
        "price": "Ücretsiz",
    },
    {
        "id": 1,
        "image": "https://loremflickr.com/320/240",
        "title": "Oyun Hakkı",
        "price": 100,
    },
    {
        "id": 2,
        "image": "https://loremflickr.com/320/240",
        "title": "3 Adet Oyun Hakkı",
        "price": 200,
    },
    {
        "id": 3,
        "image": "https://loremflickr.com/320/240",
        "title": "5 Adet Oyun Hakkı",
        "price": 100,
    },
    {
        "id": 4,
        "image": "https://loremflickr.com/320/240",
        "title": "10 Adet Oyun Hakkı",
        "price": 100,
    }
]

const saleDataTiming = [
    {
        "id": 0,
        "image": "https://loremflickr.com/320/240",
        "title": "Zaman Jokeri",
        "price": "Ücretsiz",
    },
    {
        "id": 1,
        "image": "https://loremflickr.com/320/240",
        "title": "Zaman Jokeri",
        "price": 100,
    },
    {
        "id": 2,
        "image": "https://loremflickr.com/320/240",
        "title": "3 Adet Zaman Jokeri",
        "price": 200,
    },
    {
        "id": 3,
        "image": "https://loremflickr.com/320/240",
        "title": "5 Adet Zaman Jokeri",
        "price": 100,
    },
    {
        "id": 4,
        "image": "https://loremflickr.com/320/240",
        "title": "10 Adet Zaman Jokeri",
        "price": 100,
    }
]

const saleDataFiftyLucky = [
    {
        "id": 0,
        "image": "https://loremflickr.com/320/240",
        "title": "Yarı Şans",
        "price": "Ücretsiz",
    },
    {
        "id": 1,
        "image": "https://loremflickr.com/320/240",
        "title": "Yarı Şans",
        "price": 100,
    },
    {
        "id": 2,
        "image": "https://loremflickr.com/320/240",
        "title": "3 Adet Yarı Şans",
        "price": 200,
    },
    {
        "id": 3,
        "image": "https://loremflickr.com/320/240",
        "title": "5 Adet Yarı Şans",
        "price": 100,
    },
    {
        "id": 4,
        "image": "https://loremflickr.com/320/240",
        "title": "10 Adet Yarı Şans",
        "price": 100,
    }
]


function Sale() {


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Mağaza</Text>
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