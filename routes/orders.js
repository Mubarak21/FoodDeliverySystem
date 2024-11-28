const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order')



router.post('/orderMeal',(req,res,next)=>{
    const {meal,user,restaurant,driver,orderStatus} = req.body;
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        meal: meal,
        user: user,
        restaurant: restaurant,
        orderStatus: orderStatus,
        driver: driver
    })
    order
    .save()
    .then(result=>{
        driver.available = false;
        res.status(201).json({
            message: 'Order created',
            createdOrder: {
                _id: result._id,
                mealId: result.meal,
                userId: result.user,
                restaurantId: result.restaurant,
                driver: result.driver,
                orderStatus: result.orderStatus
            }
        })
    } )
    .catch(next)
})
router.put('/',(req,res,next)=>{
    Order.find()
                        .save()
                        .then(result =>{
                            if(result){
                                res.status(200).json({
                                    message: "The order has been assigned a driver",
                                    result,
                                    driverId
                                })
                            }else{
                                res.status(404).json({
                                    message : "The order hasnt been assigned a Driver Yet"
                                })
                            }
                        })
                        .catch(next)
})

router.get('/',(req,res,next)=> {
    Order.find()
            .exec()
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)

})



router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId
    Order.findById(id)
                .exec()
                .then(result => {
                    if(result){
                        res.status(201).json({
                            message: "Order Found",
                            result
                        })
                    }else{
                        res.status(404).json({
                            message: "Order Not Found"
                        })
                    }
                })
                .catch(next)
})




router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId
    Order.deleteOne()
                .exec()
                .then(result=>{
                    if(result){
                        res.status(201).json({
                            message: 'Order deleted'
                        })
                    }else{
                        res.status(404).json({
                            message: "Order not Found"
                        })
                    }
                })
                .catch(next)
})
module.exports = router;
