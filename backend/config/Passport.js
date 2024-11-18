const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserModel");

 const googleAuthConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "YOUR_GOOGLE_CLIENT_ID",
        clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "student", 
            });
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

module.exports=googleAuthConfig;
