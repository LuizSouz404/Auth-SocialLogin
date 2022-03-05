import { Router } from "express";
import passport from "passport";
import { isLoggedIn } from "../middleware/isLogged";

const router = Router();

router.get('/login/failed', (request, response) => {
  return response.status(401).json({
    success: false,
    message: "Failure login"
  });
});

router.get('/login/success', isLoggedIn, (request, response) => {
  return response.status(200).json({
    success: true,
    message: "Successful login",
    user: request.user
  });
});

router.get('/logout', (request, response) => {
  request.logout();
  return response.redirect(process.env.CLIENT_URL as string);
})

router.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));

router.get('/google/callback', passport.authenticate( 'google', {
   successRedirect: '/auth/login/success',
   failureRedirect: '/auth/login/failed'
}));

export { router };
