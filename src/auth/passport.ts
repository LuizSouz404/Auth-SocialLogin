import passport from 'passport';
import {Strategy as GoogleStrategy}  from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/auth/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
})
