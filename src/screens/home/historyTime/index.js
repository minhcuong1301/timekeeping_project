import { useState, useEffect } from 'react';
import styles from "styles"
import { Text, Alert, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ant-design/react-native';
import { AIPT_TOKEN,DATETIME_FORMAT } from "utils/constants/config"
import { actionGetHistory } from './actions';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
const HistoryTime = ({ route  ,navigation}) => {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const handleGetHistory = async () => {
    setLoading(true);

    try {
      const { data, status } = await actionGetHistory();

      if (status === 200) {
        setResult(data?.list_keeping_time)

      }
      else {
        Alert.alert('', data?.message)
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

 
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AIPT_TOKEN);
      
      navigation.navigate('login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất.');
    }
  };

  const renderItem = ({ item }) => (

    <Text style={styles.flat}> {item.status === 1 ? 'Giờ vào' : 'Giờ ra'} : {  moment(item.time_keeping * 1000).format(DATETIME_FORMAT)} </Text>
  );

  
  useEffect(() => {
    handleGetHistory()
  }, [route.params])

  return (
    <View style={styles.timekeeping}>
      {loading ?
        (<View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#0000ff" />
        </View>) :

        (
          <>
          <View >
             <FlatList
            data={result}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.resultTimeKeep}
          />
            <Button style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Đăng xuất</Text>
            </Button>
          </View>
          
          </>

        )
      }
    </View>



  )
}

export default HistoryTime