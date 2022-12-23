import userEvent from "../../models/events";
import Authentication from "../../utils/middleware/authentication";
import response from "../../utils/common-message/response";
import user from "../../models/user";
class UserEvent {
  findById() {
    throw new Error("Method not implemented.");
  }
  async addEvent(parent, args, context) {
    try {
      Authentication.tokenMiddleware(parent, args, context);
      console.log(context.user);
      if (context.user.role != "manager") {
        return new Error("you cannot create event");
      }
      const idUser = context.user._id;
      let attribute = {
        userId: idUser,
        tittle: args.events.tittle,
        descryption: args.events.descryption,
        venue: args.events.venue,
        city: args.events.city,
        state: args.events.state,
        createdAt: Date.now(),
      };
      const event = await new userEvent(attribute);
      event.save();
      return {
        tittle: args.events.tittle,
        descryption: args.events.descryption,
        venue: args.events.venue,
        city: args.events.city,
        state: args.events.state,
      };
    } catch (err) {
      return new Error("something went wrong");
    }
  }
  async updateEvent(parent, args) {
    try {
      const updatingEvent = await userEvent.findByIdAndUpdate(
        { _id: args.events._id },
        args.events
      );
      return {
        tittle: args.events.tittle,
        descryption: args.events.descryption,
        venue: args.events.venue,
        city: args.events.city,
        state: args.events.state,
      };
    } catch (error) {
      return error;
    }
  }
  async deleteEvent(parent, args, context) {
    try {
      Authentication.tokenMiddleware(parent, args, context);

      if (context.user.role == "user") {
        return new Error("you are not authorized");
      }
      console.log(context.user);
      const findingUser = await userEvent.findOne({
        _id: args.deleteEvent._id,
      });
      console.log(findingUser);
      if (context.user.role == "manager") {
        if (context.user._id != findingUser.userId) {
          return new Error("not authorized");
        }
      }
      userEvent.findByIdAndRemove({ _id: args.deleteEvent._id }).then(() => {
        console.log("working");
        return {
          payload: response.SUCCESS,
        };
      });
    } catch (error) {
      return error;
    }
  }
  getAllEvent(parent ,args ,context){
    const allEvent= userEvent.find()
    console.log(allEvent)
  }

}
export default new UserEvent();
