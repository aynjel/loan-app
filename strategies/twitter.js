const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../database/schema/user");

const twitterStrategy = () => {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_ID,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                // const user = await User.findOne({ oauthId: profile.id });
                // if (user) {
                //     return done(null, user);
                // }

                // const newUser = new User({
                //     name: profile.displayName,
                //     email: profile.emails[0].value,
                //     oauthId: profile.id,
                //     oauthProvider: profile.provider,
                //     oauthImage: profile.photos[0].value
                // });

                // await newUser.save();
                // return done(null, newUser);
            } catch (error) {
                return done(error, false);
            }
        }
    ));
}

module.exports = twitterStrategy;