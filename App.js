import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionGetUserProfileByToken } from "./src/screens/login/actions"
import { AIPT_TOKEN } from "./src/utils/constants/config"
import * as actions from 'utils/constants/redux-actions'
import { Provider } from "react-redux"
import LoginScreen from "./src/screens/login"
import HomeScreen from "./src/screens/home"
import { useEffect, useState } from "react"
import store from "./src/app-redux/store"
import { useDispatch } from "react-redux"
import { ActivityIndicator, Alert } from "react-native"
import { useSelector } from "react-redux"
import { View, Text } from "react-native"
import { isEmpty } from "utils/helps"
import { NavigationContainer } from '@react-navigation/native';
import styles from "styles"
const Screens = () => {
  // redux
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state?.profile)
  const [spinning, setSpinning] = useState(false)

  const handleGetProfile = async () => {
    setSpinning(true)

    try {
      const token = await AsyncStorage.getItem(AIPT_TOKEN);

      if (token) {
        const { data, status } = await actionGetUserProfileByToken();

        if (status === 200) {
          dispatch({ type: actions.SET_PROFILE, payload: data })
        } 
        
        else {
          Alert.alert('', data?.message)
          AsyncStorage.removeItem(AIPT_TOKEN)
        }
      } 
    } catch (error) {
      console.log(error);
    }

    setSpinning(false)
  }

  useEffect(() => {
    handleGetProfile()
  }, [])


  return (
    spinning ?
          (<View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" color="#0000ff" />
          </View>):

    <View style={styles.page}>
      {!isEmpty(userProfile) ?
          <HomeScreen/> :<LoginScreen/>
      }
    </View>
      
  )
}

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer>

      </NavigationContainer> */}
      <Screens />
    </Provider>
  )
}

export default App

