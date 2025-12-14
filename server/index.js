import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./model/user.js";

import {
  signupRoute,
  loginRoute,
  authcheckRoute,
  logoutRoute,
} from "./routes/auth.js";
import { openaiRoute } from "./routes/genPost.js";

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_DB = process.env.ATLAS_DB;


app.set("trust proxy", 1);


app.use(
  cors({
    origin: [
      "https://postverse-three.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const store = MongoStore.create({
  mongoUrl: ATLAS_DB,
  mongoOptions: {
    tlsAllowInvalidCertificates: true,
  },
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("SESSION STORE ERROR:", err);
});


app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/signup", signupRoute);
app.post("/login", loginRoute);
app.get("/authCheck", authcheckRoute);
app.get("/logout", logoutRoute);
app.post("/generate", openaiRoute);


async function connectDB() {
  try {
    await mongoose.connect(ATLAS_DB, {
      tlsAllowInvalidCertificates: true,
    });
    console.log("DB is connected!");
  } catch (err) {
    console.error("DB CONNECTION ERROR:", err);
    process.exit(1);
  }
}

connectDB();

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});

