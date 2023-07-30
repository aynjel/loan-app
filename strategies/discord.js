const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const User = require("../database/schema/user");

const discordStrategy = () => {
    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile);
                const user = await User.findOne({ oauthId: profile.id });
                if (user) {
                    return done(null, user);
                }

                const newUser = new User({
                    name: profile.global_name,
                    email: profile.email,
                    oauthId: profile.id,
                    oauthProvider: profile.provider,
                    oauthImage: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false);
            }
        }
    ));
}

module.exports = discordStrategy;