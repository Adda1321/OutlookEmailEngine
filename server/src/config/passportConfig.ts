import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { Request } from 'express';
import { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_CALLBACK_URL } from './azureConfig';
import User from '../types/user';

// Serialize user
passport.serializeUser((obj: User, done) => {
  done(null, obj);
});

// Deserialize user
passport.deserializeUser((obj: User, done) => {
  done(null, obj);
});

// Configure Outlook Strategy
passport.use(new OAuth2Strategy({
  clientID: OUTLOOK_CLIENT_ID,
  clientSecret: OUTLOOK_CLIENT_SECRET,
  callbackURL: OUTLOOK_CALLBACK_URL,
  passReqToCallback: true,
  scope: ['https://outlook.office.com/Mail.Read']
}, (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
  const user: User = {
    id: profile.id,
    email: profile.emails[0].value,
    accessToken,
    refreshToken,
  };
  return done(null, user);
}));

// Export the configured passport
export default passport;
