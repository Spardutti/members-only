const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Usuario inexistente" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            //password match, log in!
            return done(null, user);
          }
          //wrong password
          else return done(null, false, { message: "Contraseña o usuario invalido" });
        });
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
