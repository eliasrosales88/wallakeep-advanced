export const getAuth = state => state.auth.authenticated;

export const isUserRegistered = state => {
  const auth = getAuth(state);
  

  return auth;
};