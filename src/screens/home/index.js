import { useState } from 'react';
import styles from "styles"
import { FontAwesome } from '@expo/vector-icons';
import TimeKeeping from './timekeeping';
import HistoryTime from './historyTime';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const HomePage = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Tab.Navigator>
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
            
        </Tab.Navigator>
      </View >
    </View>
  )
}

export default HomePage