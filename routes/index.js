var express = require('express');
var router = express.Router();
const users = require('../models/userDetails');
const { response } = require('../app');
const bcrypt = require('bcrypt')
const salt=10;

/* Create a first user */
router.post('/create-users', function(req, res,) {
  const userDetails=req.body
  bcrypt.hash(userDetails.password, salt, function(err, hash) {
    userDetails.password=hash
  users.create(userDetails).then(response =>{
    res.send(response)
  }).catch(err=>{
    res.send(err)
  })
});
});

/* validate a user */
router.post('/validate-users', function(req, res,) {
  const userDetails=req.body
  users.findOne({"userName":userDetails.userName}).then(data=>{
    console.log(data);
    bcrypt.compare(userDetails.password, data.password, function(err, result) {
      console.log(result);
      if(result==true){
        res.send("Valid User")
      // users.findById(req.params.id).then(response =>{
      //   res.send(response)
      // }).catch(err=>{
      //   res.send(err)
      // })
    }else{
      res.send("Invalid User")
    }
  }); 
  })  
});

/* get a first user */
router.get('/all-users', function(req, res,) {
  users.find(req.body).then(response =>{
    res.send(response)
  }).catch(err=>{
    res.send(err)
  })
});

/* update a first user */
router.put('/update-users/:id', function(req, res,) {
  users.findByIdAndUpdate(req.params.id,req.body).then(response =>{
    res.send(response)
  }).catch(err=>{
    res.send(err)
  })
});

/* delete a first user */
router.delete('/delete-users/:id', function(req, res,) {
  users.findByIdAndDelete(req.params.id,req.body).then(response =>{
    res.send(response)
  }).catch(err=>{
    res.send(err)
  })
});

/* find first user */
router.get('/get-user/:id', function(req, res,) {
  users.findById(req.params.id).then(response =>{
    res.send(response)
  }).catch(err=>{
    res.send(err)
  })
});

module.exports = router;
