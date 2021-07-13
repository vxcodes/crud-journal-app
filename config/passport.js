const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/post');
// passport. use <-- wjat we use to plugin login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb){
    // a user has attempted a login
    // does this user already exist in our own database?
    // if they don't we create them
    User.findOne({googleId: profile.id}, function(err, user){
        if(err) return cb(err);
        if(user){
            return cb(null, user)
        }else {
            const newUser= new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            newUser.save(function(err){
                if(err) return cb(err);
                return cb(null, newUser);
            })
        }
    })

}))
// passport.serializeUser <-- gets called one time when user logs in to create a session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
// passport.deserializeUser <-- gets called with each request
// then decodes the cookie and looks up the user in session storage and creates req.user for user information
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        done(err, user);
    });
})
