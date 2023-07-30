const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../database/schema/user");

const googleStrategy = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile);
                const user = await User.findOne({ oauthId: profile.id });
                if (user) {
                    return done(null, user);
                }

                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    oauthId: profile.id,
                    oauthProvider: profile.provider,
                    oauthImage: profile.photos[0].value
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false);
            }
        }
    ));
}

module.exports = googleStrategy;