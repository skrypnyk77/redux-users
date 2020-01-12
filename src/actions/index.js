import users from "../users.json";
export const GET_USER_LIST = "GET_USER_LIST";

export const actionChangeStore = {
  type: GET_USER_LIST,
  payload: users
};
