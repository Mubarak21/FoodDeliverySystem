const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user')

router.post('/register',(req,res,next)=> {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then(result =>{
            res.status(200).json({
                message: "User Created",
                createdUser: {
                    name: result.name,
                    email: result.email,
                    password: result.password
                }
            })
        })
        .catch(next)

})

router.get('/',(req,res,next)=> {
    User.find()
                .exec()
                .select('name email')
                .then(result => {
                   
                    res.status(200).json({
                        message: "Users Present",
                        result
                    })
                })
                .catch(next)
})

router.delete('/',(req,res,next)=> {
    User.deleteOne()
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "Users Deleted",
                        result
                    })
                })
                .catch(next)
})


router.get('/:userId',(req,res,next)=>{
    const id = req.params.userId
    User.findById(id)
                .exec()
                .select('name email')
                .then(result=> {
                    if(result){
                        res.status(201).json(result)
                    }else{
                        res.status(404).json({
                            message : "User not Found"
                        })
                    }
                    })
                    .catch(next)
                })
                


router.patch('/:userId',async (req,res,next)=>{
   const {userId:id} = req.params;
   const updateOps = req.body


   try{
    await User.updateOne({_id: id}, {$set:updateOps});
    res.status(200).json({
        message: 'User updated'
    })
   }catch(err){
    res.status(500).json({err})
   }
})























































module.exports = router;
