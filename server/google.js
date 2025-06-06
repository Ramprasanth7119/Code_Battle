require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;


const app = express();

app.use(
    session({
        secret : "secret",
        resave : false,
        "saveUninitialized" : true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new googleStrategy({
        clientID :process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : "http://localhost:3000/auth/google/callback",  
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("Google profile", profile);
        done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) =>{
    done(null, user);
})

app.get("/",(req,res)=>{
    res.send("<a href='/auth/google'>Login with google</a>")
})

app.get("/auth/google", passport.authenticate("google",{
    scope : ["profile", "email"]
}))

app.get("/auth/google/callback", passport.authenticate("google",{
    failureRedirect : "/",
}),
);

app.get("/profile", (req,res)=>{
    res.send(`<h1>Welcome ${req.user.displayName}</h1><a href='/logout'>Logout</a>`)
})

app.get("/logout", (req,res)=>{
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})