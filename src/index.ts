import mongoose from "mongoose";
import { ApolloServer} from '@apollo/server';
import express from "express";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import typeDefs from "./graphql/user-schema";
import resolvers from "./graphql/resolvers/index";
mongoose.connect('mongodb://localhost:27017/User-Events').then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log("connection error")
})

const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.authorization }),
  listen: { port: 4000 },
});