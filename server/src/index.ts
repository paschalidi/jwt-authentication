import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./UserResolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

(async () => {
  const app = express();
  app.get("/", (_, res) => res.send("hello"));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] })
  });

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => console.log("Listens at http://localhost:4000"));
})();
