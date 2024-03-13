import api from 'utils/services/api'

export const actionGetHistory = () => {
  return api({
    method: "GET",
    url: "/get-list-keeping-time",
    
  })
}