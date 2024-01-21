import React, { useState, useEffect ,useMemo } from 'react'
import { decode } from 'he';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert,AppState,BackHandler  } from 'react-native'
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';


import { supabase } from '../services';
import { useUser } from '../context/UserContext';

const windowWidth = Dimensions.get("window").height
const windowHeight = Dimensions.get('window').width;
// Düzgün bir padding değeri hesapla
const paddingValue = windowWidth * 0.05; // Ekran genişliğinin %5'i kadar bir padding değeri

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1147",
        justifyContent: "center", // Ana eksen etrafında merkez hizalama
        alignItems: "center", // 
    },
    quizCard: {
        flex: 1,

        justifyContent: "center", // Ana eksen etrafında merkez hizalama
        alignItems: "center", // 
        height: windowWidth - 50,
        margin: paddingValue,

    },
    quantityQuestion: {
        color: "#FEFEFE",
        fontSize: 12,

    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%', // Occupy the full width
        marginBottom: 25

      },
    
      timerText: {
        color: 'white',
        fontSize: 15,
      },
    quiz: {
        color: "#FEFEFE",
        fontSize: windowHeight * 0.05,
        marginTop: 7,
        fontWeight: "normal",
        marginBottom: 20
    },
    quizPicsCard: {

    },
    quizPics: {
        height: 210,
        width: 320,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 17
    },
    answersCard: {
        margin: 10,

    },
    answerButton: {
        backgroundColor: "#361E70",
        borderRadius: 8,
        margin: 6,

    },
    answer: {
        padding: 10,
        color: "#FEFEFE",
        fontSize: windowHeight * 0.037,
        marginTop: 7,
        fontWeight: "bold",
        letterSpacing: 1, // Harf aralığını değiştirebilirsiniz, piksel cinsinden
    },
    buttonGroup: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "flex-start", // Align buttons to the right
        alignItems: "center", // Center the buttons vertically
        paddingHorizontal: paddingValue, // Add horizontal padding
        paddingBottom: 20, // Add some bottom padding for space
        backgroundColor: "#1F1147", // Opsiyonel: Buton grubunun arkaplan rengini ayarlayabilirsiniz
    },
    jokerButton: {
        margin: 10,

        width: 150,
        height: 50,
        paddingHorizontal: 20, // Sığması için yatay padding ekleyin
        justifyContent: "center", // Text ve icon içeriğini yatayda merkezle
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        backgroundColor: "#6949FD",
    },
    buttonText: {
        color: "white",
        fontSize:  windowWidth * 0.027,
        marginLeft: 5, // Icon ve text arasında boşluk bırakmak için
    },
});

function QuizCard({ navigation }) {

    const { user } = useUser();
    const { goBack } = useNavigation();

    const [totalEarnedBTC, setTotalEarnedBTC] = useState(0); // Toplam BTC tutarını tutacak state

    // Soru state
    const [questionCount, setQuestionCount] = useState(1)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    // cevap state
    const [trueAnswer, setTrueAnswer] = useState(0)
    const [wrongAnswer, setWrongAnswer] = useState(0)

    // zaman state
    const [timer, setTimer] = useState(10); // Timer value in seconds
 

    const [extendedTimer, setExtendedTimer] = useState(0);
    const [timingJoker, setTimingJoker] = useState(user?.timingJoker)
  

    const [jokerCount, setJokerCount] = useState(user?.fiftyPercentJoker); // Assuming the user starts with 3 jokers
    const [jokerUsed, setJokerUsed] = useState(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState()



    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple');
            const data = await response.json();
    
            if (response.ok) {
                const formattedQuestions = data.results.map((questionItem) => {
                    return {
                        soru: questionItem.question,
                        dogru_cevap: questionItem.correct_answer,
                        secenekler: [...questionItem.incorrect_answers, questionItem.correct_answer],
                    };
                });
    
                // Shuffle the formatted questions
                const shuffledArray = formattedQuestions.sort(() => Math.random() - 0.5);
                setShuffledQuestions(shuffledArray);
                setCurrentQuestionIndex(0); // Set initial question index
            } else {
                console.error('Failed to fetch questions');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
    
    // Inside useEffect, call fetchQuestions() to retrieve and set the questions

    const goBackToPreviousScreen = () => {
        navigation.goBack();
        navigation.navigate('Score', {
            trueAnswer: 0,
            wrongAnswer: 10,
            totalEarnedBTC: -0.8
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                goBackToPreviousScreen();
                return true; // Event'in sonlanmasını engellemek için true döndürülür
            };

            // Geri düğmesine basıldığında çalışacak olay
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Component unmount olduğunda event listener'ı kaldırma
            return () => backHandler.remove();
        }, [])
    );
  


    useEffect(() => {
        // Shuffle the questions when the component mounts
        fetchQuestions();
    }, []);

    useEffect(() => {
        // Update the correct answer index whenever a new question is displayed
        if (currentQuestion) {
            setCorrectAnswerIndex(currentQuestion.secenekler.indexOf(currentQuestion.dogru_cevap));
        }
    }, [currentQuestion]);

    // Function to handle the button press and extend the timer
    const handleExtendTimer = () => {
        if (timingJoker > 0) {
            setTimer((prev) => prev + 10);
            setExtendedTimer((prev) => prev + 1);

            const newTimingJoker = timingJoker - 1
            const addTicket = async () => {
                try {
                  const { data, error } = await supabase.auth.updateUser({
                    data: { timingJoker: newTimingJoker }
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
      

            setTimingJoker(timingJoker - 1)
            addTicket()
        }
        else {
            Alert.alert("Time Joker", "You don't have a Time Joker, you can get a Time Joker by watching an ad or buying one.", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }

    };



  



    const generateRandomNumber = () => {
        const randomNumber = Math.random() * (0.0009 - 0.00009) + 0.00009;
        return randomNumber.toFixed(7);
    };

   
    
    
    useEffect(() => {
        // Start the timer when the component mounts or when the question changes
        const interval = setInterval(() => {
            if (AppState.currentState === 'active') {
                setTimer((prev) => {
                    if (prev === 0) {
                        // If the timer reaches 0, move to the next question or navigate if it's the last question
                        if (questionCount === 10) {
                            // Navigate to the score screen
                            navigation.navigate('Score', {
                                trueAnswer: trueAnswer,
                                wrongAnswer: wrongAnswer,
                                totalEarnedBTC: totalEarnedBTC
                            });
                        } else {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                            setQuestionCount(questionCount + 1);
                            handleNextQuestion();
                            return 10; // Reset the timer to 10 seconds for the next question
                        }
                    } else {
                        return prev - 1;
                    }
                });
            }
        }, 1000);
    
        // Clean up the interval when the component unmounts or when the question changes
        return () => clearInterval(interval);
    }, [currentQuestionIndex]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'inactive' || nextAppState === 'background') {
                navigation.navigate('Score', {
                    trueAnswer: 0,
                    wrongAnswer: 10,
                    totalEarnedBTC: 0.2
                });
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);




    useEffect(() => {
        // Reset the timer and mark the current timer as expired when a new question is displayed
        setJokerUsed(false)
        setTimer(10)
    }, [currentQuestionIndex]);

    const handleNextQuestion = () => {
        // Move to the next question
        const randomBTC = generateRandomNumber();
        // Yanlış cevap!
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Wrong Answer!',
            text2: `${randomBTC} Sol Deleted👋`,
            visibilityTime: 2000,
        });
        setWrongAnswer(true + 1)
        // Toplam kazanılan BTC'yi güncelle
        setTotalEarnedBTC((prev) => prev - parseFloat(randomBTC));
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionCount(questionCount + 1);
    };







    const handleAnswer = (selectedOptionIndex) => {

        const correctAnswerIndex = currentQuestion && currentQuestion.secenekler.indexOf(currentQuestion.dogru_cevap);
        const randomBTC = generateRandomNumber();
        // Eğer 10. soruya gelindi ise skor sayfasına yönlendir
        if (questionCount === 10) {
            navigation.navigate('Score', {
                trueAnswer: trueAnswer,
                wrongAnswer: wrongAnswer,
                totalEarnedBTC: totalEarnedBTC
            });
        }


        if (correctAnswerIndex === selectedOptionIndex) {
            // Doğru cevap!
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Correct Answer!',
                text2: `${randomBTC} SOL Added 👋`,
                visibilityTime: 2000, // Toast mesajının ekranda kalma süresi (ms cinsinden)
            });
            setTrueAnswer(trueAnswer + 1)
            // Toplam kazanılan BTC'yi güncelle
            setTotalEarnedBTC((prev) => prev + parseFloat(randomBTC));
        }
        else {
            // Yanlış cevap!
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Wrong Answer!',
                text2: `${randomBTC} SOL Deleted 😢`,
                visibilityTime: 2000,
            });
            setWrongAnswer(true + 1)
            // Toplam kazanılan BTC'yi güncelle
            setTotalEarnedBTC((prev) => prev - parseFloat(randomBTC));
        }


        // Sonraki soruya geç
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionCount(questionCount + 1);
    };

    const handleJoker = () => {
        if (!jokerUsed && jokerCount > 0) {
            // Diğer şıklardan doğru cevabı hariç 2 şıkkı rastgele seç
            const otherOptions = currentQuestion.secenekler.filter((_, index) => index !== correctAnswerIndex);
            const randomIndices = [];
            while (randomIndices.length < 2) {
                const randomIndex = Math.floor(Math.random() * otherOptions.length);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }

            // Seçilen 2 şıkkı silerek yeni şıkları oluştur
            const updatedOptions = currentQuestion.secenekler.filter((_, index) => !randomIndices.includes(index));

            // Güncellenmiş şıkları ve doğru cevabı ekleyerek yeni soru objesini oluştur
            const updatedQuestion = {
                ...currentQuestion,
                secenekler: updatedOptions,
            };

            // Güncellenmiş soruyu state array'indeki ilgili index'e at
            const updatedShuffledQuestions = [...shuffledQuestions];
            updatedShuffledQuestions[currentQuestionIndex] = updatedQuestion;
            setShuffledQuestions(updatedShuffledQuestions);

            const newFiftyPercent = jokerCount -1
            const addTicket = async () => {
                try {
                  const { data, error } = await supabase.auth.updateUser({
                    data: { fiftyPercentJoker: newFiftyPercent }
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

            // Joker kullanımını bir azalt
            setJokerUsed(true);
            setJokerCount(jokerCount - 1);
            addTicket()
        }
        else {
            Alert.alert("Fifty Lucky", "If you don't have a 50% Chance Joker, you can get a 50% Chance Joker by watching an ad or buying one.", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    };

    const currentQuestion = shuffledQuestions[currentQuestionIndex];



    return (
        <View style={styles.container}>
            <Toast />
            <View style={styles.quizCard}>
                {/* Timer display in the top-right corner */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{timer}s</Text>
                </View>
                <Text style={styles.quantityQuestion}>
                    {questionCount}/10
                </Text>
                <View>
                    <Text style={styles.quiz}>
                    {currentQuestion && currentQuestion.soru ? decode(currentQuestion.soru) : "Question Loading..."}
                    </Text>
                    <View style={styles.quizPicsCard}>
                        {  /*   <Image source={{ uri: "https://loremflickr.com/320/240" }} style={styles.quizPics} /> */}
                    </View>
                    <View style={styles.answersCard}>
                        {currentQuestion && currentQuestion.secenekler.map((secenek, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.answerButton}
                                onPress={() => handleAnswer(index)}
                            >
                                <Text style={styles.answer}>{decode(secenek)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
                <View style={styles.buttonGroup}>
                    {/* Timer extension button */}
                    <TouchableOpacity onPress={handleExtendTimer} style={styles.jokerButton} >
                        <Text style={styles.buttonText}><Entypo name="back-in-time" size={27} color="white" /> {timingJoker}</Text>
                    </TouchableOpacity>

                    {/* Button to use the 50/50 Joker */}
                    <TouchableOpacity onPress={handleJoker} style={styles.jokerButton}>
                        <Text style={styles.buttonText}><MaterialCommunityIcons name="clover" size={27} color="white" /> {jokerCount} </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    )
}

export default QuizCard