import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionGetUserProfileByToken } from "./src/screens/login/actions"
import { NavigationContainer } from '@react-navigation/native';
import { AIPT_TOKEN } from "./src/utils/constants/config"
import * as actions from 'utils/constants/redux-actions'
import { Provider } from "react-redux"
import LoginScreen from "./src/screens/login"
import HomeScreen from "./src/screens/home"
import { useEffect } from "react"
import store from "./src/app-redux/store"
import { useDispatch } from "react-redux"
import { Alert } from "react-native"

const Stack = createNativeStackNavigator()

const FirstScreen = ({ navigation }) => {
  // redux
  const dispatch = useDispatch();

  const handleFirstNavigate = async () => {
    try {
      const token = await AsyncStorage.getItem(AIPT_TOKEN);

      if (token) {
        const { data, status } = await actionGetUserProfileByToken();

        if (status === 200) {
          dispatch({ type: actions.SET_PROFILE, payload: data })
          navigation.navigate('home')
        } 
        
        else {
          Alert.alert('', data?.message)
          navigation.navigate('home')
        }
      } 
      else {
        navigation.navigate('login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFirstNavigate()
  }, [])
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

