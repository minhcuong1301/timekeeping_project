import * as actions from 'utils/constants/redux-actions'
import api from 'utils/services/api'

export const actionLogin = (data) => {
  return api({
    method: "POST",
    url: "/user-login",
    data
  })
}

export const actionGetUserProfileByToken = () => {
  return api({
    method: "GET",
    url: "/get-user-profile-by-token"
  })
}