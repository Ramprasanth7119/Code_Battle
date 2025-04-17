const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
   // Redirect from backend after successful Google auth
res.redirect(`http://localhost:5173/oauth2/redirect?token=${yourGeneratedJWT}`);

  }
);

module.exports = router;
