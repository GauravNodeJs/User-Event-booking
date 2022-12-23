
import userService from "../../services/user-service/user-service";
const userResolvers = {
    Query: {
      hello: () => 'world'
    },
    Mutation:{
       signUpUser:userService.signUpUser,
       userLogin:userService.login,
       userUpdate:userService.updateUser
  }
}
  export default userResolvers