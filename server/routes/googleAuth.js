const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect(`http://localhost:5173/profile?name=${req.user.displayName}`);
  }
);

module.exports = router;
