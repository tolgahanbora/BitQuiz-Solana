"use client"
import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions,Platform  } from 'react-native'

import Purchases, { LOG_LEVEL } from 'react-native-purchases';

import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { supabase } from '../services';
import { useUser } from '../context/UserContext';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height


const adUnitId = "ca-app-pub-2590549735225636/3946443276";


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: false,
  keywords: ['fashion', 'clothing', 'crypto', 'web3', 'games', 'dApps', 'borsa', "kripto para", "iddia", "maçkolik", "futbol", "bahis"],
});

function SaleCard(props) {
  const [loaded, setLoaded] = useState(false);
  const { image, title, price, Solana } = props.saleItem; // Assuming you are passing saleItem as props

  const { user, loading, productIds } = useUser();

  const { fiftyPercentJoker, timingJoker, health, token } = user
  



  const updateCustomerInformation = async (customerInfo) => {
    console.log("customer sold", customerInfo)
  }

    
  const fetchOfferings = async () => {
    console.log("click");
    try {
      if (productIds && productIds.length > 0) {
        // Display packages for sale
        console.log("deneme", productIds[0].product);
        if (productIds[0].identifier) {
          console.log(productIds[0].identifier);
          console.log("product", productIds[0].product.identifier);
          try {
            const { purchaserInfo } = await Purchases.purchasePackage(productIds[0]);
            console.log("purchased", purchaserInfo);
          } catch (e) {
            console.log("error message", e);
          }
        }
      } else {
        console.log("product not found");
      }
    } catch (e) {
      // Hata işleme
      console.log("error message", e);
    }
  };
  
    


    
  

    

  // Satın alma işlemi
  const purchaseProduct = async (productId, title, newTimingJokerValue) => {
    try {

      const params = Platform.select({
        ios: {
          sku: productId,
          andDangerouslyFinishTransactionAutomaticallyIOS: false
        },
        android: {
          skus: [productId]
        }
      });

 


      if (purchase) {
        if (title === "game_ticket") {
          const { data, error } = await supabase.auth.updateUser({
            data: { health: newTimingJokerValue }
          });

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            console.log('User metadata updated successfully');
            Alert.alert('Buy Now', 'You have acquired 1 Ticket. good games.');
          }
        }
       if (title === "timing_joker") {
          const { data, error } = await supabase.auth.updateUser({
            data: { timingJoker: newTimingJokerValue }
          });

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            console.log('User metadata updated successfully');
            Alert.alert('Buy Now', 'You have acquired Time Joker. good games.');
          }

        }
        if (title === "fifty_lucky") {
          const { data, error } = await supabase.auth.updateUser({
            data: { fiftyPercentJoker: newTimingJokerValue }
          });

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            console.log('User metadata updated successfully');
            Alert.alert('Buy Now', 'You have acquired Fifty Joker. good games.');
          }
        }
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      // Hata durumunda kullanıcıya bilgi verme veya geri bildirim gösterme
    }
  };

  // Function to show rewarded ad when "Buy Now" button is pressed
  function onBuyButtonPressed() {

    if (price === "Free") {
      if (title === 'Game Ticket') {


        const increaseTicket = async () => {
          const newTimingJokerValue = user?.health + 1; // Increment timingJoker value
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { health: newTimingJokerValue }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              rewarded.load(); // Load the rewarded ad after updating user data
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
          rewarded.show(); // Show the rewarded ad after it's loaded
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('You have won the prize, Game Ticket: ', reward);
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
          const newTimingJokerValue = user?.timingJoker + 1; // Increment timingJoker value

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
          const newTimingJokerValue = fiftyPercentJoker + 1; // Increment timingJoker value
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
    if (Solana === 0.24) {
      if (token > 0.24) {

        const newTimingJokerValue = health + 1; // Increment timingJoker value
        const newToken = token - 0.24
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
    else if (Solana === 0.51) {
      if (token > 0.51) {
        const newTimingJokerValue = health + 3; // Increment timingJoker value
        const newToken = token - 0.51
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
    else if (Solana === 0.8) {
      if (token > 0.8) {
        const newTimingJokerValue = health + 5; // Increment timingJoker value
        const newToken = token - 0.8
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
    else if (Solana === 1.2) {

      if (token > 1.2) {
        const newTimingJokerValue = health + 10; // Increment timingJoker value
        const newToken = token - 1.2
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




    else if (Solana === 0.2) {
      if (token > 0.2) {


        const newTimingJokerValue = timingJoker + 1; // Increment timingJoker value
        const newToken = token - 0.2
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


    else if (Solana === 0.5) {
      if (token > 0.5) {
        const newTimingJokerValue = timingJoker + 3; // Increment timingJoker value
        const newToken = token - 0.5
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

        Alert.alert('Purchased', 'You get 3 Time Jokers. Good Games.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.7) {
      if (token > 0.7) {


        const newTimingJokerValue = timingJoker + 5; // Increment timingJoker value
        const newToken = token - 0.7
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

    else if (Solana === 1) {
      if (token > 1) {


        const newTimingJokerValue = timingJoker + 10; // Increment timingJoker value
        const newToken = token - 1
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

        Alert.alert('Purchased', 'You have 10 Time Jokers. Good game.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }





    else if (Solana === 0.23) {

      if (token > 0.23) {


        const newTimingJokerValue = fiftyPercentJoker + 1; // Increment timingJoker value
        const newToken = token - 0.23
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

        Alert.alert('Purchased', 'You have 1 Fifty Lucky. Good game.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.6) {
      if (token > 0.6) {


        const newTimingJokerValue = fiftyPercentJoker + 3; // Increment timingJoker value
        const newToken = token - 0.6
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
        Alert.alert('Purchased', 'You got 3 Fifty Lucky. Good game.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      }
      else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 0.9) {

      if (token > 0.9) {


        const newTimingJokerValue = fiftyPercentJoker + 5; // Increment timingJoker value
        const newToken = token - 0.9
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

        Alert.alert('Purchased', 'You got 5 Fifty Lucky. Good game.', [
          { text: 'OK', onPress: async () => await addTicket() },
        ]);
      } else {
        Alert.alert('Failed to Purchase', 'You do not have enough Solana in your account.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    else if (Solana === 1.1) {

      if (token > 1.1) {


        const newTimingJokerValue = fiftyPercentJoker + 10; // Increment timingJoker value
        const newToken = token - 1.1
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

        Alert.alert('Purchased', 'You got 10 Fifty Lucky. Good game.', [
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




  function onCurrencyButtonPressed() {
    console.log("tık")
    if (price === 0.99) {


      const newTimingJokerValue = health + 1; // Increment timingJoker value
      console.log("tık")
      const addTicket = async () => {

        try {
         let productId = "com.tolgahanbora.game_ticket1"
         let title = "game_ticket"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

          // Örnek olarak: kullanıcının sağlık değerini güncelleme

        } catch (error) {
          console.error('Error during purchase:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.');
        }
      }

      Alert.alert('Buy Now', 'You have acquired 1 Ticket. good games.', [
        {
          text: 'OK', onPress: async () => await addTicket()
        },
      ]);
    }


    if (price === 1.24) {

      const newTimingJokerValue = health + 3; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let productId = "com.tolgahanbora.game_ticket3"
          let title = "game_ticket"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You get 3 Tickets. good games.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }


    if (price === 1.99) {

      const newTimingJokerValue = health + 5; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let  productId = "com.tolgahanbora.game_ticket5"
          let title = "game_ticket"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You have received 5 Tickets. good games.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }


    if (price === 3.79) {


      const newTimingJokerValue = health + 10; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let  productId = "com.tolgahanbora.game_ticket10"
          let  title = "game_ticket"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }


      Alert.alert('Purchased', 'You get 10 Tickets. good games.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }






    if (price === 0.24) {



      const newTimingJokerValue = timingJoker + 1; // Increment timingJoker value

      const addTicket = async () => {

        try {
          
          let productId = 'com.tolgahanbora.timing_joker1'
          let title = "timing_joker"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }


      Alert.alert('Purchased', 'You get 1 Time Joker. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }




    if (price === 0.59) {

      const newTimingJokerValue = timingJoker + 3; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let  productId = "com.tolgahanbora.timing_joker3"
          let  title = "timing_joker"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You get 3 Time Jokers. Good Games.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }

    if (price === 0.79) {



      const newTimingJokerValue = timingJoker + 5; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let  productId = "com.tolgahanbora.timing_joker5"
          let  title = "timing_joker"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You have obtained 5 Time Jokers. good games.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }

    if (price === 1.09) {



      const newTimingJokerValue = timingJoker + 10; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let productId = "com.tolgahanbora.timing_joker10"
          let  title = "timing_joker"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You have 10 Time Jokers. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }





    if (price === 0.58) {




      const newTimingJokerValue = fiftyPercentJoker + 1; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let productId = "com.tolgahanbora.fifty_lucky1"
          let title = "fifty_lucky"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You have 1 Fifty Lucky. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }
    if (price === 0.98) {

      const newTimingJokerValue = fiftyPercentJoker + 3; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let productId = "com.tolgahanbora.fifty_lucky3"
          let title = "fifty_lucky"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }
      Alert.alert('Purchased', 'You got 3 Fifty Lucky. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }


    if (price === 1.49) {




      const newTimingJokerValue = fiftyPercentJoker + 5; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let  productId = "com.tolgahanbora.fifty_lucky5"
          let  title = "fifty_lucky"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You got 5 Fifty Lucky. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);
    }

    if (price === 2.19) {




      const newTimingJokerValue = fiftyPercentJoker + 10; // Increment timingJoker value

      const addTicket = async () => {

        try {
          let   productId = "com.tolgahanbora.fifty_lucky10"
          let  title = "fifty_lucky"

          // Ödeme başarılıysa yapılacak işlemler burada olmalıdır.
          await purchaseProduct(productId, title, newTimingJokerValue);

        } catch (error) {
          console.error('Error updating user metadata:', error);
          Alert.alert('Failed to Purchase', 'You do not have enough Money in your account.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      Alert.alert('Purchased', 'You got 10 Fifty Lucky. Good game.', [
        { text: 'OK', onPress: async () => await addTicket() },
      ]);

    }

  }




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
                  onPress={fetchOfferings}
                >
                  <Text style={styles.cardButtonText}>Buy Now {price}/USD</Text>
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
    fontSize: windowWidth * 0.047,
    fontWeight: "bold",
  },
});

export default SaleCard