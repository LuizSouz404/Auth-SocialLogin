import passport from 'passport';
import {Strategy as TwitterStrategy}  from 'passport-twitter';

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID as string,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET as string,
    callbackURL: "/oauth/twitter/callback"
  },

  function(token, tokenSecret, profile, done) {
      done(null, profile);
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
})
