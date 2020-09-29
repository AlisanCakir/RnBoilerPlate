const AuthReducer = (state, action) => {
  const data = action.payload || {};

  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: data.token,
        user: data.user,
        isAuthenticated: !!data.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isAuthenticated: !!data.token,
        token: data.token,
        user: data.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return {...state};
  }
};
export default AuthReducer;
