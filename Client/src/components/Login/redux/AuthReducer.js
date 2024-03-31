const intialState = JSON.parse(localStorage.getItem("userDetails")) || {
  name: "",
  token: "",
  isAuth: false,
  role: "",
};

const AuthReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "login": {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          isAuth: true,
          name: payload.name,
          token: payload.token,
          role: payload.role,
        })
      );

      return {
        ...state,
        isAuth: true,
        name: payload.name,
        token: payload.token,
        role: payload.role,
      };
    }

    case "logout": {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          isAuth: false,
          name: "",
          token: "",
          role: "",
        })
      );

      return {
        ...state,
        isAuth: false,
        name: "",
        token: "",
        role: "",
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
