import { useEffect, useRef, useState } from 'react';
import styles from "styles"
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button, Radio } from '@ant-design/react-native';
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system';
import { actionTimeKeep } from './actions'
import dayjs from 'dayjs';
import Constants from 'expo-constants';
import {
  View, TextInput, Text, Image, Alert, ActivityIndicator
} from 'react-native';
const TimeKeeping = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [value, onChangeText] = useState("")
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [attendanceType, setAttendanceType] = useState(null)
  const cameraRef = useRef(null)

  const toggleAttendanceType = (type) => {
    if (attendanceType === type) {
      setAttendanceType(null);
    } else {
      setAttendanceType(type);
    }
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleTimeKeep = async () => {
    setLoading(true);
    if (image) {
      const now = dayjs().unix();

      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const values = {
        time_keeping: now,
        description: value,
        devide_name: Constants.deviceName,
        devide_id: Constants.manifest2.id,
        avatar: base64,
        type_keeping: attendanceType
      }
      try {


        const { data, status } = await actionTimeKeep(values);
        Alert.alert(data?.message)

        if (status === 200) {
          navigation.navigate('Lịch sử', { data });
          setImage(null)
        }
        else {
          console.log('');
        }

      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  }

  if (hasCameraPermission === false) {
    return <Text> Không có quyền truy cập</Text>
  }



  return (
    <>
      {loading ?

        (<View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#0000ff" />
        </View>) : (
          <View style={styles.timekeeping}>

            {!image ?
              <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
              >
                <Text style={{ color: "transparent" }}>aipt_2024mhmhjmhjmhjmhjmhjmhjhjmhjjhmhjhjmhjmhmjmhjcasssssssssssssmjh</Text>

                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}>

                  <Entypo name="retweet" size={40} color="black" onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back)
                  }} />
                </View>
              </Camera> :

              <Image source={{ uri: image }} style={{ width: "100%", height: "70%" }} />
            }

            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButtonGroup}>

                <Text onPress={() => toggleAttendanceType(0)}>
                  {attendanceType === 0 ? "●" : "○"} Công tác
                </Text>
                <Text onPress={() => toggleAttendanceType(1)}>
                  {attendanceType === 1 ? "●" : "○"} Nghỉ phép
                </Text>
                <Text onPress={() => toggleAttendanceType(2)}>
                  {attendanceType === 2 ? "●" : "○"} Đến muộn
                </Text>
              </View>
            </View>

            <View style={styles.textarea}>
              <TextInput
                placeholder='Ghi chú(nếu có)'
                onChangeText={text => onChangeText(text)}
                value={value}

              />
            </View>

            {image ?
              <View style={styles.operator}>
                <Ionicons name="arrow-back-circle-sharp" size={70} color="black" onPress={() => setImage(null)} />
                <MaterialCommunityIcons name="send-circle" size={70} color="black" onPress={handleTimeKeep} />
              </View> :

              <Button style={styles.button} onPress={takePicture}>
                <Text style={styles.buttonText} >Chấm công</Text>
              </Button>
            }
          </View>
        )}

    </>

  )
}

export default TimeKeeping