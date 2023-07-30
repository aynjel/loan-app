const passportConfig = (passport) => {
    passport.serializeUser((user, done) => {
        console.log("serializeUser");
        process.nextTick(() => {
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        });
    });

    passport.deserializeUser((user, done) => {
        console.log("deserializeUser");
        process.nextTick(() => {
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        });
    })
}

module.exports = passportConfig;
