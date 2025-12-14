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

/* =====================
   TRUST PROXY
===================== */
app.set("trust proxy", 1);

/* =====================
   CORS
===================== */
app.use(
  cors({
    origin: [
      "https://postverse-three.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* =====================
   BODY PARSER
===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   SESSION STORE
===================== */
const store = MongoStore.create({
  mongoUrl: ATLAS_DB,
  mongoOptions: {
    tlsAllowInvalidCertificates: true, // ✅ ONLY THIS
  },
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("SESSION STORE ERROR:", err);
});

/* =====================
   SESSION CONFIG
===================== */
app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, // ✅ IMPORTANT
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);

/* =====================
   PASSPORT
===================== */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* =====================
   ROUTES
===================== */
app.post("/signup", signupRoute);
app.post("/login", loginRoute);
app.get("/authCheck", authcheckRoute);
app.get("/logout", logoutRoute);
app.post("/generate", openaiRoute);

/* =====================
   DATABASE CONNECT
===================== */
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

/* =====================
   START SERVER
===================== */
app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});

