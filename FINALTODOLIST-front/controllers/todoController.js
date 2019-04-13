//import libs
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

//import connection to MongoDB and MySQL databases
var { mongoose } = require('../db/config');

//import Mongoose models
var { Todo } = require('../models/todo');

const router = express.Router();

router.use(bodyParser.json());



router.post('/addTodo', (req, res) => {

    var todo = new Todo({
        text: req.body.text,
        _creator: req.body._userId
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.post('/todoList/:userid', (req, res) => {

    Todo.find({
        _creator: req.params.userid
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });

});

router.delete('/deleteTodo/:id', (req, res) => {
    var id = req.params.id;

    Todo.findOneAndRemove({
        _id: id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});



router.patch('/updateTodo/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);


    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } 

    Todo.findOneAndUpdate({ 
        _id:req.params.id
         }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

router.post('/todoDetails/:id', (req, res) => {
    var id = req.params.id;

    

    Todo.findOne({
        _id: id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.get('/', (req, res) => {
    res.send('From todo route')
})

module.exports = router;