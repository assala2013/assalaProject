const express = require('express');
const bodyParser = require('body-Parser');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//import connexion to mongodb and mysql databases
var { mongoose } = require('../db/config');

//import mongoos models
var { User } = require('../Models/user');

router.use(bodyParser.json());
//web service subscribe

router.post('/subscribe', (req, res) => {
    var body = _.pick(req.body, ['firstname', 'lastname', 'email', 'tel', 'password']);
    var user = new User(body);

    user.save().then(() => {
        res.status(200).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//web service info
router.get('/info/:token', (req, res) => {
    let token = req.params.token
    User.findOne({ 'tokens.token': token }).then((user) => {
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.status(200).send(user);
    }).catch((e) => {
        res.status(400).send();
    });


});

//web service login
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var email = body.email;
    var password = body.password;
    /*uUser houa el model mte3na */
    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(400).send('email not found');
        }/*t9aren bin l mot de passe loul wel pwd theni  */
        bcrypt.compare(password, user.password, (err, re) => { /*err : en cas derreur w lo5ra en cas de success */
            if (re) {
                var access = 'auth';
                var token = jwt.sign({ /*sign te5ou 2 parametre : el loula houma les parametres li bech ye5ouhom el token  
                    el token nest7a9ouh ki n7eb nab3ath ll backend : houa li bech yraja3 l backend(token) el token fih l id de l utilisateur 
                    ba3teli ya3mel redirection ll les deux tables li 3anna 
                    donc  
                
                    wel parametre theni  */
                    _id: user._id.toHexString(), access
                }, 'secret').toString();
                user.tokens.push({ access, token });
                user.save().then(() => {
                    res.send({token});
                });
            } else {
                res.status(400).send('password incorrect');
            }
        });
        }).catch((e) => {
            res.status(400).send(e);
        });
    
});


//web service logout
router.post('/logout', (req, res) => {

    
    let token = req.body.token;

    console.log(token);
    
    User.findOneAndUpdate({ 'tokens.token': token }, { tokens: '' }).then((user) => {
        if (!user) {
            return res.status(404).send('user not found');
        }

        res.status(200).send({ user });

    }).catch((e) => {
        res.status(400).send(e);
    });

});

router.get('/', (Request, Response) => {

    Response.send('3asslemaaaaaaa to user Controlleeeeeeeeeeer');


});
module.exports = router;