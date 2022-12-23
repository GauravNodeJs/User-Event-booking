const typeDefs = `#graphql
    enum Role{
      user,
      admin,
      manager
    }
    enum Booking{
      user,
      admin,
      manager
    }
    type User {
        firstName:String
        lastName:String
        email:String
        password:String
        role:String
    }
    type login{
      email:String
      password:String
      token:String
    }
    type updateUser{
      firstName:String
      lastName:String
      email:String
      password:String
    }
    type events{
      userId:String
      tittle:String
      descryption:String
      venue:String
      city:String
      state:String
    }
    type deleteEvent{
      payload:String
    }
    type booking{
      by:String
    }
    input userInput {
      firstName:String
      lastName:String
      email:String
      password:String
      role:[Role]  
      }
    input loginInput{
      email:String
      password:String
    }
    input userUpdateInput{
      firstName:String
      lastName:String
      email:String
      password:String
    }
    input getEventInput{
      _id:ID
    }
    input eventInput{
      _id:ID
      tittle:String
      descryption:String
      venue:String
      city:String
      state:String
    }
    input deleteEventInput{
      _id:ID
    }
    input bookingInput{
      eventId:ID
      userId:ID
      by:[Booking]
    }
    type Query {
        hello: String
        eventDelete(deleteEvent:deleteEventInput):deleteEvent
        getEvent:String
    }
    type Mutation{
      signUpUser(user:userInput):User
      userLogin(login:loginInput):login
      userUpdate(updateUser:userUpdateInput):updateUser
      addEvent(events:eventInput):events
      updateEvent(events:eventInput):events
      bookEvent(booking:bookingInput):booking
    }
  `;
export default typeDefs;
