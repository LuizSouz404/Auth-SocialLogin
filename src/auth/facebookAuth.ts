import passport from 'passport';
import { Strategy as FacebookStrategy }  from 'passport-facebook';

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    callbackURL: "/auth/facebook/callback"
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
