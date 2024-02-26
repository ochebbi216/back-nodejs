

const express = require("express");
const router = express.Router();

const jwt = require ("jsonwebtoken");
const Admin = require("../models/Admin");
const config = require("../config/database");



exports.update= (req, res) => {
    const { id } = req.params;
    const { body } = req;
    Admin.findOneAndUpdate({ _id: id }, body)
        .then((success) => {
            res.send(success)
            console.log(`admin ${id} est modifié :) `, success);
        })
        .catch((error) => {
            res.send(error)
        })
}


exports.findAll = (req, res) => {
    Admin.find()
        .then((success) => {
            res.send(success)
        })
        .catch((error) => {
            console.log(error);
            res.send(error)
        })
};
exports.findById = (req, res) => {
    const { id } = req.params;
    Admin.findById({ _id: id })
        .then((success) => {
            console.log(`le admin ${id} est :`, success);
            res.send(success)
        })
        .catch((error) => {
            console.log(error);
            res.send(error)
        })
}

exports.register = async (req, res) => {
    let newUser = new Admin({
        nom: req.body.nom,
        email: req.body.email,
        telephone: req.body.telephone,
        password: req.body.password,
    });

    Admin.addUser(newUser, (err, data)=> {
        if(err){
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true, msg: "Admin are registered now."});
        }
    });
};
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.getUserByEmail(email, (err, admin) => {
        if(err) throw err;
        if(!admin){
            return res.json({success: false, msg: "Compte non trouvé "});
        }
        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(admin.toJSON(), config.secret, {
                    expiresIn: '1d',
                });
                res.json({
                    success: true,
                    token: token,
                    admin: {
                        id: admin._id,
                        nom: admin.nom,
                        telephone: admin.telephone,
                        email: admin.email,
                      
                    }
                });
            }
            else {
                return res.json({success: false, msg: "Mot de passe érroné."});
            }
        });
    });
};
