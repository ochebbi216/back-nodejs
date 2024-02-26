const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const User = require("../models/user");
const config = require("../config/database");
const Admin = require("../models/Admin");
// module.exports = function(passport){
//     let opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
//     //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = config.secret;
//     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//         User.getUserById(jwt_payload._id, (err, user) => {
//             if(err) {
//                 return done(err, false);
//             }
//             if(user) {
//                 return done(null, user);
//             }
//             else {
//                 return done(null, false);
//             }
//         });
//     }));
// }

module.exports = function(passportadmin){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passportadmin.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Admin.getUserById(jwt_payload._id, (err, admin) => {
            if(err) {
                return done(err, false);
            }
            if(admin) {
                return done(null, admin);
            }
            else {
                return done(null, false);
            }
        });
    }));
}