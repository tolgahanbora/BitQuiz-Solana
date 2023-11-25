"use client"
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { supabase } from '../services';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 20,
  },
  cardContainer: {
    backgroundColor: "#32167C",
    borderRadius: 20,
    width: windowWidth * 0.8,
    height: windowHeight * 0.4
  },
  cardBody: {
    alignItems: "center",
  },
  cardImage: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    margin: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  cardBodyText: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  cardJokerName: {
    color: "#FEFEFE",
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
  },
  cardJokerQuantity: {
    margin: 5,
    color: "#FEFEFE",
    fontSize: windowWidth * 0.035,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  cardButtonContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  cardButton: {
    margin: 12,
    borderRadius: 20,
    width: windowWidth * 0.35,
    height: windowWidth * 0.17,
    backgroundColor: "#6949FD",
    justifyContent: "center",
  },
  cardButtonText: {
    color: "#FEFEFE",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    fontSize: windowWidth * 0.03,
    fontWeight: "bold",
  },
});

const adUnitId = "ca-app-pub-2590549735225636/2878610166";


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing', 'crypto', 'web3', 'games', 'dApps', 'borsa', "kripto para", "iddia", "maçkolik", "futbol", "bahis"],
});

function SaleCard(props) {
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState()
  const [solana, setSolana] = useState()
  const [timingJoker, setTimingJoker] = useState()
  const [ticket, setTicket] = useState()
  const [fiftyPercent, setFiftyPercent] = useState()
  const { image, title, price, Solana } = props.saleItem; // Assuming you are passing saleItem as props




  const getTicket = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setToken(user.user_metadata.token)
      setTicket(user.user_metadata.health)
      setTimingJoker(user.user_metadata.timingJoker)
      setFiftyPercent(user.user_metadata.fiftyPercentJoker)
    }
    catch (e) {
      console.error("Error fetching ticket:", e)
    }
  }

  // Function to show rewarded ad when "Buy Now" button is pressed
  function onBuyButtonPressed() {

    if (price === "Free") {
      if (title === 'Oyun Hakkı') {

        const increaseTicket = async () => {
          const newTimingJokerValue = ticket + 1; // Increment timingJoker value
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
          rewarded.show(); // Reklam yüklendikten sonra göster
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('Ödülü kazandınız oyun hakkı: ', reward);
            increaseTicket()
          },
        );

        rewarded.load(); // Reklamı yükleme işlemini başlat
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }
      else if (title === 'Time Joker') {

        const increaseJoker = async () => {
          const newTimingJokerValue = timingJoker + 1; // Increment timingJoker value
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJokerValue }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
          rewarded.show(); // Reklam yüklendikten sonra göster
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('You win the prize, Time Joker:', reward);
            increaseJoker()
          },
        );

        rewarded.load(); // Reklamı yükleme işlemini başlat
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };

      }
      else if (title === 'Fifty Lucky') {


        const increaseJoker = async () => {
          const newTimingJokerValue = fiftyPercent + 1; // Increment timingJoker value
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newTimingJokerValue }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value
 
              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
          rewarded.show(); // Reklam yüklendikten sonra göster
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('You win the prize, Fifty Lucky: ', reward);
            increaseJoker()
          },
        );

        rewarded.load(); // Reklamı yükleme işlemini başlat
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }
    }
    else {
      Alert.alert('Buy Now', 'You have acquired 1 right. good games.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      // Implement the logic for in-app purchase for non-free items
      // You can use a payment gateway or other payment method here
    }

  }

  function onSolanaButtonPressed() {
    if (Solana === 0.01) {
      if (token > 0.01) {

        const newTimingJokerValue = ticket + 1; // Increment timingJoker value
        const newToken = token - 0.01
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value
    
              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Buy Now', 'You have acquired 1 Ticket. good games.', [
          {
            text: 'OK', onPress: async () => await addTicket()
          },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.02) {
      if (token > 0.02) {
        const newTimingJokerValue = ticket + 3; // Increment timingJoker value
        const newToken = token - 0.02
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value
      
              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', 'You get 3 Tickets. good games.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.04) {
      if (token > 0.04) {
        const newTimingJokerValue = ticket + 5; // Increment timingJoker value
        const newToken = token - 0.04
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', 'You have received 5 Tickets. good games.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.07) {

      if (token > 0.07) {
        const newTimingJokerValue = ticket + 10; // Increment timingJoker value
        const newToken = token - 0.07
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value
    
              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


        Alert.alert('Purchased', 'You get 10 Tickets. good games.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }




    else if (Solana === 0.005) {
      if (token > 0.005) {


        const newTimingJokerValue = timingJoker + 1; // Increment timingJoker value
        const newToken = token - 0.005
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJokerValue, token: newToken  }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


        Alert.alert('Purchased', 'You get 1 Time Joker. Good game.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }


    else if (Solana === 0.008) {
      if (token > 0.008) {
        const newTimingJokerValue = timingJoker + 3; // Increment timingJoker value
        const newToken = token - 0.008
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', '3 adet Time Joker elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.009) {
      if (token > 0.009) {


        const newTimingJokerValue = timingJoker + 5; // Increment timingJoker value
        const newToken = token - 0.009
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', 'You have obtained 5 Time Jokers. good games.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }

    else if (Solana === 0.015) {
      if (token > 0.015) {


        const newTimingJokerValue = timingJoker + 10; // Increment timingJoker value
        const newToken = token - 0.015
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', '10 adet Time Joker elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }





    else if (Solana === 0.007) {

      if (token > 0.007) {


        const newTimingJokerValue = fiftyPercent + 1; // Increment timingJoker value
        const newToken = token - 0.007
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', '1 adet Fifty Lucky elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.013) {
      if (token > 0.013) {


        const newTimingJokerValue = fiftyPercent + 3; // Increment timingJoker value
        const newToken = token - 0.013
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }
        Alert.alert('Purchased', '3 adet Fifty Lucky elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.025) {

      if (token > 0.025) {


        const newTimingJokerValue = fiftyPercent + 5; // Increment timingJoker value
        const newToken = token - 0.025
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', '5 adet Fifty Lucky elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.041) {

      if (token > 0.041) {


        const newTimingJokerValue = fiftyPercent + 10; // Increment timingJoker value
        const newToken = token - 0.041
        const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newTimingJokerValue, token: newToken }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }

        Alert.alert('Purchased', '10 adet Fifty Lucky elde ettiniz. iyi oyunlar.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
    }
    else {
      Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }


  useEffect(() => {
    getTicket()
    console.log(token)
    console.log(title)
  }, []);



  return (

    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardBody}>
          <Image source={image} style={styles.cardImage} />
          <View style={styles.cardBodyText}>
            <Text style={styles.cardJokerName}>{title}</Text>

          </View>

          <View style={styles.cardButtonContainer}>
            {price === "Free" ? (
              <TouchableOpacity
                style={styles.cardButton}
                onPress={onBuyButtonPressed}
              >
                <Text style={styles.cardButtonText}>Free</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => onBuyButtonPressed()}
                >
                  <Text style={styles.cardButtonText}>Buy Now {price}/TL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={onSolanaButtonPressed}
                >
                  <Text style={styles.cardButtonText}>Buy Now {Solana}/SOL</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>

  )
}

export default SaleCard