import user from "../../models/user";
import jwt from "jsonwebtoken";
import Authentication from "../../utils/middleware/authentication";
import bcrypt from 'bcrypt'
class UserService {
  async signUpUser(parent, args) {
    try {
      const extUser = await user.findOne({ email: args.user.email });
      if (extUser) {
        throw new Error("user already exist");
      }
      const test = {
        firstName: args.user.firstName,
        lastName: args.user.lastName,
        email: args.user.email,
        password: args.user.password,
        role: args.user.role[0],
        createdAt: Date.now(),
      };
      const newUser = new user(test);
      const userCreated = await newUser.save();
      return {
        firstName: userCreated.firstName,
        lastName: userCreated.lastName,
        email: userCreated.email,
        password: userCreated.password,
        role: userCreated.role[0],
      };
    } catch (err) {
      return err;
    }
  }
  async login(parent, args) {
    try {
      const userLogin = await user.findOne({ email: args.login.email });
      console.log(userLogin);
      if (!userLogin) {
        return new Error("invalid crdentials");
      }
      const validPassword = await bcrypt.compare(
        args.login.password,
        userLogin.password
      );
      if (!validPassword) {
        throw new Error('Invalid Credentials ')
      }
      const token = jwt.sign(
        { _id: userLogin._id, role: userLogin.role },
        "newkey"
      );
      console.log(token);
      return {
        email: userLogin.email,
        token: token,
      };
    } catch (err) {
      return err;
    }
  }
  async updateUser(parent, args, context) {
    try {
      Authentication.tokenMiddleware(parent, args, context);
      const extUser = await user.findOne({ _id: context.user._id });
      if (extUser.email == args.updateUser.email) {
        return new Error("email already exist");
      }
      console.log(args);
      const upadatingUser = await user.findOneAndUpdate(
        { _id: context.user._id },
        args.updateUser,
        { new: true }
      );
      return {
        firstName: upadatingUser.firstName,
        lastName: upadatingUser.lastName,
        email: upadatingUser.email,
      };
    } catch (err) {
      return new Error("invalid signature");
    }
  }
}
export default new UserService();
