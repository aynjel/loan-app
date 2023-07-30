const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const User = require("../database/schema/user");

const githubStrategy = () => {
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile);
                const user = await User.findOne({ oauthId: profile.id });
                if (user) {
                    return done(null, user);
                }

                const newUser = new User({
                    name: profile.displayName ? profile.displayName : profile.username,
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

module.exports = githubStrategy;