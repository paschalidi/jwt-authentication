import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./UserResolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser = require("cookie-parser");
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./utils/auth";
import cors from "cors";

(async () => {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true // <-- REQUIRED backend setting
  };
  const app = express();

  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.get("/", (_, res) => res.send("hello"));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (e) {
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    res.cookie("jid", createRefreshToken(user), { httpOnly: true });

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => console.log("Listens at http://localhost:4000"));
})();
