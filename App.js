import "expo-dev-client"
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import 'react-native-url-polyfill/auto';
import  {UserProvider} from "./src/context/UserContext"


import { AppRouter} from "./src/navigation"

export default function App() {
  return (

    <UserProvider>
    <AppRouter />
    </UserProvider>

  );
}


