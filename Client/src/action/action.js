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