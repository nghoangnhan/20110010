const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const session = require("express-sesssion");

const PORT = 5000;

const app = express();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile: " + profile.name);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

app.use(helmet());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    keys: [config.CLIENT_ID, config.COOKIE_KEY_2],
  })
);

function checkLogIn(req, res, next) {
  console.log("Current user: " + req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "You must log in" });
  }
  next();
}

app.get(
  "auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  }),
  (req, res) => {}
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google call us back");
  }
);

app.get("/secret", checkLogIn, (req, res) => {
  return res.send("Your personal secrect if 42");
});

app.get("/failure", (req, res) => {
  return res.send("Fail to log in");
});

app.use("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readdirSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
