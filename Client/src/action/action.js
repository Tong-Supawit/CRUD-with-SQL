export const userLoaded = (dataRespone) => ({
  type : "USER_LOADED",
  payload : {
    username : dataRespone.username,
    role : dataRespone.role
  }
})
export const loginSubmit = (dataRespone) => ({
  type : "SUCCESS",
  payload : {
    username : dataRespone.username,
    role : dataRespone.role
  }
})
export const logoutSubmit = () => ({
  type : "LOGOUT",
})