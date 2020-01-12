import users from "../users.json";

const initState = {
  userList: users
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "GET_USER_LIST":
      return { ...state, userList: action.payload };

    default:
      return state;
  }
}
