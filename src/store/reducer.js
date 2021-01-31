import { CHANGE_USERINF } from "./constants";
const initialState = {
  userInfo: null,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERINF:
      return { ...state, userInfo: action.inf };
    default:
      return state;
  }
}
export default reducer;
