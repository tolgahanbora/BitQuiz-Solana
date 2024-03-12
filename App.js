import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {StyleSheet, SafeAreaView} from 'react-native';
import 'react-native-url-polyfill/auto';
import  {UserProvider} from "./src/context/UserContext"


import { AppRouter} from "./src/navigation"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default function App() {
  return (

    <UserProvider>
       <SafeAreaView style={styles.container}>
    <AppRouter />
    </SafeAreaView>
    </UserProvider>

  );
}


