/*
* Author: Johnathan Lee
* Author: Jonathan Julian
* updated: 8.8.2019
* Function -- router for Login/register requests.
*/

const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
var app = express();

router.use(express.json());
app.use(cookieParser);

const models = require('../models');

router.use(function(req, res, next) {
    // let cookieName = req.cookies.cookieName;
    // if(!cookieName) {
    //   let newCookie = Math.random().toString();
    //   res.cookie('cookieName', newCookie);
    // }
    // console.log("cooke: " + cookieName);
    next();
})

router.post('/', (req, res, next) => {
    models.users.findOne({
        where: {
            USER_EMAIL: req.body.userEmail
        }
    }).then(user =>  {
        var userJson;
        if (!user.comparePassword(req.body.password) || user === null) {
            res.status(401).json({ token: null, errorMessage: 'failed!' })
        } else {
            // set cookie for user
            userJson = JSON.stringify({"userEmail" : user.userEmail,"firstName" : user.firstName,"lastName" : user.lastName,"RoleRoleId" : user.RoleRoleId});
            console.log("logged in as: ", JSON.parse(userJson));
            res.cookie("user", userJson );
        }

        res.status(204).send(userJson);
    });
});

module.exports = router;