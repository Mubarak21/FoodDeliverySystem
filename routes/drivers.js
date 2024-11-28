const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Driver = require('../models/driver')


router.post('/register',(req,res,next)=> {
    const newDriver = new Driver({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
    });
    newDriver.save()
        .then(result =>{
            res.status(201).json({
                message: "Driver Created",
                createdDriver: {
                    _id:result._id,
                    name: result.name,
                    email: result.email,
                }
            })
        })
        .catch(next)

})
 router.put('/:id',async(req,res,next)=>{
    const driverId = req.params.id
    const orderId = req.body.order


    try{
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({message: "Invalid Order Id"})
        }
        const driver = await Driver.findById(driverId);
        if(!driver){
            return res.status(404).json({message: "Driver not Found"})
        }
        driver.order = new mongoose.Types.ObjectId(orderId)
        const updatedDriver =  await driver.save()
        res.status(200).json({
            message: "Driver Updated",
            driver: updatedDriver
        })
    }catch(err){
        next(err)
    }
}) 


router.get('/',(req,res,next)=>{
    Driver.find()
            .then(result => {
                res.status(200).json({
                    message: 'All the Drivers Available',
                    result
                })
            })
            .catch(next)
})
router.get('/:driverId',(req,res,next)=>{
    const id = req.params.driverId;
    Driver.findById(id)
                .select('_id name email order')
                .then(result => {
                    if(result){
                        res.status(200).json(result)
                    }else{
                        res.status(404).json({
                            message: 'The Driver with the given ID was not found'
                        })
                    }
                })
                .catch(next)
})

router.patch('/:driverId',async (req,res,next)=>{
    const {driverId:id} = req.params;
    const updateOps = req.body
 
 
    try{
     await Driver.updateOne({_id: id}, {$set:updateOps});
     res.status(200).json({
         message: 'User updated'
     })
    }catch(err){
     res.status(500).json({err})
    }
 })

router.delete('/:DriverId',(req,res,next)=>{
    const id = req.params.DriverId;
    Driver.deleteOne()
                .exec()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message : "The Driver Has Been Deleted"
                    })
                })
                .catch(next)
})

module.exports = router;
