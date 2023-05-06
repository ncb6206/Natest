const passport = require("passport");
const local = require("./local");
const { user } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // 정보를 복구해서 req.user안에 넣음
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
