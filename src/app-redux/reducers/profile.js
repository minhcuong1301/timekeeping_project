import * as actions from "utils/constants/redux-actions";

const initState = {}

const profile = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_PROFILE:
      return action.payload
    default:
      return state
  }
}

export default profile