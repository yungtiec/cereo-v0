const router = require("express").Router();
const { User, Guest } = require("../db/models");
const { isEmpty } = require("lodash");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", async (req, res, next) => {
  try {
    // don't pass guest id to client
    var me = req.user;
    if (isEmpty(req.user)) {
      const guest = await Guest.findOne({
        where: { sessionId: req.sessionID }
      });
      if (guest) {
        me = {
          name: guest.name,
          email: guest.email,
          isGuest: true
        };
        req.session.guestId = guest.id;
      }
    }
    res.json(me);
  } catch (err) {
    next(err);
  }
});

router.post("/guest", async (req, res, next) => {
  try {
    const guest = await Guest.create({
      ...req.body,
      sessionId: req.sessionID
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put("/onboard", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).then(user =>
      user.update({ onboard: true })
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.use("/google", require("./google"));
