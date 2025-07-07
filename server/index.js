import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './model/user.js'

import {signupRoute,loginRoute,authcheckRoute,logoutRoute} from './routes/auth.js'
import {openaiRoute} from './routes/genPost.js'

const app = express();
app.set("trust proxy", 1);
const router = express.Router();
const PORT = process.env.PORT || 5000;
const ATLAS_DB = process.env.ATLAS_DB;

app.use(cors({
    origin: ['https://postverse-three.vercel.app'],
    credentials: true,
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: ATLAS_DB,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOption = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
     expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
     maxAge: 1000 * 60 * 60 * 24 * 3,
     httpOnly: true,
     sameSite: "none",
     secure: true
}

};

app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(PORT,()=>console.log("app is listening!"));

async function main(){
    await mongoose.connect(ATLAS_DB);
}
main().then(()=>console.log("db is connected!")).catch(err => console.log(err));



app.use("/", router);

router.post("/signup",signupRoute);

router.post("/login",loginRoute);

router.get("/authCheck",authcheckRoute);

router.get("/logout",logoutRoute);

router.post("/generate",openaiRoute);


export default router;