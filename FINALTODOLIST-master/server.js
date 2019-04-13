const express=require("express");
const bodyParser=require('body-parser');
const cors=require('cors');

const port=3000;
const routes=express();
routes.use(cors())
routes.use(bodyParser.json())

const user = require('./controllers/userController')
const todo = require('./controllers/todoController')

routes.use('/todo',todo);
routes.use('/user',user);


routes.get('/',(req,res)=>{
        res.send('hello from noussa')
})

routes.listen(port,()=>{
    console.log(`server standard port ${port}`)
})
