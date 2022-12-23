import BookingEvent from "../../services/booking-service/booking"
const bookingResolver = {
    Query: {
      hello: () => 'world'
    },
    Mutation:{
      bookEvent:BookingEvent.booking
  }
}
  export default bookingResolver