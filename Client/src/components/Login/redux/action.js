export const userLogin = (payload) => {
  return {
    type: "login",
    payload: payload,
  };
};
export const userLogout = () => {
  return {
    type: "logout",
  };
};
