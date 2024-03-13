import api from 'utils/services/api'

export const actionTimeKeep = (data) => {
  return api({
    method: "POST",
    url: "/create-keeping-time",
    data
  })
}