
import userEvent from "../../services/event-service/user-event";
const eventResolvers = {
    Query: {
      hello: () => 'world',
      eventDelete:userEvent.getAllEvent
    },
    Mutation:{
      addEvent:userEvent.addEvent,
      updateEvent:userEvent.updateEvent
  }
}
  export default eventResolvers