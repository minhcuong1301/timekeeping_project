import { REACT_APP_SERVER_BASE_URL, AIPT_TOKEN } from "utils/constants/config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

const api = async (options) => {
  const config = {
    baseURL: REACT_APP_SERVER_BASE_URL,
    ...options,
    headers: {
      ...options?.headers
    }
  }

  const token = await AsyncStorage.getItem(AIPT_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return await axios.request(config)
    .then((res) => res)
    .catch((error) => {
      return error?.response || error
    })
}

export default api