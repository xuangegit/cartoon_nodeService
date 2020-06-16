const express = require('express');
const app = express()
app.use(express.static('public/uploads'));
var cors = require('cors')
var userRouter = require('./routes/user.js');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRouter);
app.listen(2000,function(){
    console.log('2000端口的web服务启动了');
})