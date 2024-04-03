import { useState } from 'react';
import styles from "styles"
import { FontAwesome } from '@expo/vector-icons';
import TimeKeeping from './timekeeping';
import HistoryTime from './historyTime';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux"
import { View, Text, Alert } from "react-native"
import * as actions from 'utils/constants/redux-actions'
import { AIPT_TOKEN } from 'utils/constants/config';
const HomePage = () => {
  // const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AIPT_TOKEN);
      dispatch({type: actions.SET_PROFILE, payload: null})
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất.');
    }
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
      <Button  color={'#0a2946'}
                size="lg"
                radius={20} onPress={logout}>
              <Text style={styles.buttonText}>Đăng xuất</Text>
            </Button>
        {/* <Tab.Navigator>
          <Tab.Screen
            name="Trang chủ"
            options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
            component={TimeKeeping}
       
            />

          <Tab.Screen
            name="Lịch sử"
            options={{ tabBarIcon: () => <MaterialIcons name="event-note" size={24} color="black" /> }}
            component={HistoryTime}
          
            />
            
        </Tab.Navigator> */}
      </View >
    </View>
  )
}

export default HomePage