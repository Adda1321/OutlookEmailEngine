import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import 'isomorphic-fetch';
const OutlookStrategy = require('passport-outlook').Strategy;

import { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_CALLBACK_URL } from './config/azureConfig';

import User from './types/user';

//Routes import
import authRoutes from './routes/authRoutes';
import accountRoutes from './routes/accountRoutes'
import userRoutes from './routes/userRoutes'
import emailRoutes from './routes/emailRoutes'
import subscriptionRoutes from './routes/subscriptionRoutes'
import notificationRoutes from './routes/notificationRoutes'


const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());


// Passport session setup
passport.serializeUser((obj: any, done) => {
  done(null, obj as User);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj as User);
});

// Use the Outlook strategy within Passport
passport.use(new OutlookStrategy({
  clientID: OUTLOOK_CLIENT_ID,
  clientSecret: OUTLOOK_CLIENT_SECRET,
  callbackURL: OUTLOOK_CALLBACK_URL,
  passReqToCallback: true
}, (req: any, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
  const user: User = {
    id: profile.id,
    email: profile.emails[0].value,
    accessToken,
    refreshToken,
  };
  return done(null, user);
}));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', emailRoutes)
app.use('/', notificationRoutes)
app.use(accountRoutes)
app.use(subscriptionRoutes)


export default app