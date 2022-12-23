import Authentication from "../../utils/middleware/authentication";
import booked from "../../models/booking";
import userEvent from "../../models/events";
class BookingEvent {
  async booking(parent, args, context) {
    try {
      Authentication.tokenMiddleware(parent, args, context);
      const userId = context.user._id;
      const eventId = args.booking._id;
      const managerEvent = await userEvent.findById(eventId);
      if (context.user.role == "manager") {
        if (context.user._id != managerEvent.userId) {
          return new Error("not authorized");
        }
      }
      if (context.user.role == "admin") {
        return new Error("not authorized to admin");
      }
      // if(context.user.role!='user'){
      //     return new Error("not authorised")
      // }
      const bookedEvent = {
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
