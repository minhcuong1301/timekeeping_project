import { useState } from 'react';
import styles from "styles"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ant-design/react-native';
import { actionLogin } from './actions';
import { AIPT_TOKEN } from "utils/constants/config"
import { useDispatch } from "react-redux"
import * as actions from 'utils/constants/redux-actions'

import {
  View, TextInput, Text, TouchableOpacity,
  Image, ActivityIndicator, Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {  
      const {data, status} = await actionLogin({username, password});
      
      if (status === 200) {
        dispatch({type: actions.SET_PROFILE, payload: data?.profile})
        AsyncStorage.setItem(AIPT_TOKEN, data?.token);
        navigation.navigate('home');
      }
      else {
        Alert.alert('', data?.message)
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {loading ?
          (<View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" color="#0000ff" />
          </View>) :

          (<View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/aipt-logo.png')}
                style={styles.icon}
              />
            </View>

            <View style={styles.body}>
              <View style={styles.username}>
                <Text >Email/SDT:</Text>

                <View style={styles.inputitem}>
                  <View style={styles.user} >
                    <FontAwesome name="user" size={18} color="black" />
                  </View>

                  <TextInput
                    style={styles.textinput}
                    placeholder='Nhập Email/SDT'
                    onChangeText={e => setUsername(e)}
                    value={username}
                  />
                </View>
              </View>

              <View style={styles.username}>
                <Text >Mật khẩu:</Text>

                <View style={styles.inputitem}>
                  <View style={styles.user} >
                    <Entypo name="lock" size={18} color="black" />
                  </View>

                  <TextInput
                    style={styles.textinput}
                    secureTextEntry={secureTextEntry}
                    placeholder='Mật khẩu'
                    autoCompleteType='password'
                    onChangeText={e => setPassword(e)}
                    value={password}

                  />

                  <TouchableOpacity onPress={toggleSecureEntry}
                    style={styles.password}>
                    <Entypo name={secureTextEntry ? 'eye-with-line' : 'eye'} size={18} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <Button style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </Button>
            </View>

            <View style={styles.footer}>
              <Text style={styles.left}>Copyright 2012 - 2024 ©</Text>
              <Text style={styles.right}>AIPT Groups</Text>
            </View>
          </View >)
        }
      </View>
    </View>
  )
}

export default LoginScreen