const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const config = require('./config/key')
const {User} = require('./models/User');
//application/-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB connected...'))
  .catch(err=> console.log(err))

app.get('/', (req, res) => {res.send('Hello World!')})

app.post('/register',(req,res)=>{
  const user = new User(req.body);
  user.save((err,doc)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})