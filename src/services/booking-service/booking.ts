import Authentication from "../../utils/middleware/authentication";
import booked from "../../models/booking";
import userEvent from "../../models/events";
import user from "../../models/user";
class BookingEvent {
  async booking(parent, args, context) {
    try {
      Authentication.tokenMiddleware(parent, args, context);
      const managerId = context.user._id;
      const eventId = args.booking.eventId;
      const userId=args.booking.userId

      const managerEvent = await userEvent.findById(eventId);
      if (context.user.role == "manager") {
        if (context.user._id != managerEvent.userId) {
          return new Error("not authorized");
        }
      }
      if (context.user.role == "admin") {
        return new Error("not authorized to admin");
      }
      const findUser= await user.findById(userId)
      console.log(findUser)
      if(findUser.role!= 'user'){
        return new Error("not authorized")
      }
      const bookedEvent = {
        managerId:managerId,
        userId: userId,
        eventId: eventId,
        by: args.booking.by[0],
      };
      const savedBooking = new booked(bookedEvent);
      savedBooking.save();
      return {
        by: savedBooking.by,
      };
    } catch (error) {
      return error;
    }
  }
}
export default new BookingEvent();
