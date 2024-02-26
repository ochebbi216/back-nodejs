const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

const Admin = module.exports = mongoose.model("Admin", schema);
module.exports.getUserById = function(id, callback){
  const query = {_id: id};
  Admin.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email};
  Admin.findOne(query, callback);
}


module.exports.addUser = function(newUser, callback){
          Admin.findOne({email: newUser.email}, (err, admin) => {
              if(admin) {
                  callback(new Error("Ce email est déjà registré."), admin);
              }
              else {
                  bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                          if(err) throw err;
                          newUser.password = hash;
                          newUser.save(callback);
                      });
                  });
              }
          })
      }
//     });
// }

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
  });
}