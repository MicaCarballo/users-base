const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const {findUserById} = require('../users/users.controllers');
const passport = require('passport');
const jwtSecret = require('../../config').api.jwtSecret;


const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme("jwt"), //? Authorization JWT token
    secretOrKey: jwtSecret,
  };
  passport.use(
    new jwtStrategy(options, async (tokenDecoded, done) => {
      //? done(error, tokenDecoded)
      try {
        const user = await findUserById(tokenDecoded.id);
        if (!user) {
          return done(null, false); //? No existe un error, pero tampoco existe el usuario
        }
        return done(null, tokenDecoded); //? No existe un error, pero si un usuario
      } catch (error) {
        return done(error, false); //? Si existe un error, pero no un usuario
      }
    })
  );

module.exports = passport;