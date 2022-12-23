import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./user-resolver";
import eventResolvers from "./event-resolver";
import bookingResolver from "./booking-resolver";
const resolvers = mergeResolvers([
  userResolvers,
  eventResolvers,
  bookingResolver,
]);
export default resolvers;
