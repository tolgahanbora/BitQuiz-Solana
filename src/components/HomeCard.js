import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';

import { supabase } from '../services';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    headerContainer:
    {
        alignItems: "center"
    },
    image: {
        margin: 50,
        height: 200,
        width: 200,
    },
    mainText: {
        color: "#FEFEFE",
        fontSize: 17,
        fontWeight: "bold"
    },
    buttonContainer: {
        alignItems: "center"
    },
    button: {
        borderRadius: 50,
        height: 60,
        width: 300,
        backgroundColor: "#6949FD"
    },
    buttonText: {
        color: "#FEFEFE",
        padding: 20,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    icon: {
        marginRight: 10, // Add margin to separate the icon from the image

    },
    iconContainer: {
        marginRight: 330, // Add margin to separate the icon from the image
        flexDirection: "row"
    },
    iconText: {
        color: "#fefefe",
        marginTop: 5,
        fontSize: 15,
        fontWeight: "bold"
    }
})
function HomeCard({ navigation }) {

    const [ticket, setTicket] = useState()

    const TICKET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Function to grant tickets every 24 hours
    const grantTicketsEvery24Hours = async () => {
        const lastTicketTime = await getTicket();
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastTicketTime;

        if (timeDifference >= TICKET_INTERVAL) {
            // 24 hours have passed, grant 2 tickets
            const newTicketValue = ticket + 2;
            await updateTicket(newTicketValue);
        }
    };

    const getTicket = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            setTicket(user.user_metadata.health)
            console.log(user.user_metadata.health)
        }
        catch (e) {
            console.error("Error fetching ticket:", e)
        }
    }



    const updateTicket = async (newTicketValue) => {
        try {
            await supabase.auth.updateUser({
                data: { health: newTicketValue },
            });
            setTicket(newTicketValue); // Update the ticket state instantly after the update is successful
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };



    const onHandleClick = async () => {
        if (ticket > 0) {
            const newTicketValue = ticket - 1;
            await updateTicket(newTicketValue);
            navigation.navigate('Quiz');
        } else {
            Alert.alert('Ticket yok', 'Oyun Hakkınız Kalmadı, Lütfen oyun hakkı alın.', [
                { text: 'Tamam', onPress: () => console.log('OK Pressed') },
            ]);
        }
    };

    useEffect(() => {
        getTicket()
    }, [])

    useEffect(() => {
        grantTicketsEvery24Hours(); // Grant tickets immediately on component mount

        // Set up a recurring interval to check and grant tickets every 24 hours
        const ticketInterval = setInterval(grantTicketsEvery24Hours, TICKET_INTERVAL);

        // Clean up the interval when the component is unmounted
        return () => {
            clearInterval(ticketInterval);
        };
    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Entypo name="ticket" size={30} color="white" style={styles.icon} />
                <Text style={styles.iconText}>{ticket}</Text>
            </View>

            <View style={styles.headerContainer}>

                <Image source={{ uri: "https://loremflickr.com/320/240" }} style={styles.image} />
                <Text style={styles.mainText} >Soruları Doğru Cevapla, BTC kazan !</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onHandleClick}>
                    <Text style={styles.buttonText}>Oynamaya Başla</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default HomeCard