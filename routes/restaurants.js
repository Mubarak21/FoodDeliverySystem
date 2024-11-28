const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Restaurant = require('../models/restaurant')

router.post('/RestUp',(req,res,next)=> {
    
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        serving: req.body.serving,
        location: req.body.location,
    })

    restaurant.save()
                .then(result => {
                    res.status(200).json({
                        message: "Restaurant has been Created",
                        createdRestaurant:{
                            name: result.name,
                            serving: result.serving,
                            location: result.location,
                        }
                        })
                    })
                    .catch(next)
    })
                
router.get('/',(req,res,next) => {
    Restaurant.find()
                .select('name serving location menu')
                .then(result =>{
                    res.status(200).json({
                        message: "Restaurant Available",
                        result
                    })

                })
                .catch(next)
}) 
router.get('/:restaurantId',(req,res,next)=>{
    const id = req.params.restaurantId
    Restaurant.findById(id)
                .select('name serving location menu')
                .then(result => {
                    if(result){
                        res.status(201).json(result)
                    }else{
                        res.status(404).json({
                            message : "Restaurant Not Found"
                        })
                    }
                })
                .catch(next)
})


router.patch('/:restaurantId',async (req,res,next)=>{
    const {restaurantId:id} = req.params;
    const updateOps = req.body
 
 
    try{
     await Restaurant.updateOne({_id: id}, {$set:updateOps});
     res.status(200).json({
         message: 'User updated'
     })
    }catch(err){
     res.status(500).json({err})
    }
 })
router.patch('/:Id/Menu/menuId',(req,res,next)=>{
    const restaurantId = req.params.id
    const menuId = req.body.id
    const updateOps = req.body
    try{
        Restaurant.updateOne({restaurantId:restaurantId, menuId: menuId},{$set:updateOps});
        res.status(200).json({
            message: "The Food has been Updated"
        })
    }catch(err){
        res.status(500).json({err})
    }
})

router.delete('/:RestaurantId',(req,res,next)=>{
    const id = req.params.RestaurantId;
    Restaurant.deleteOne()
                .then(result => {
                    if(result){
                        res.status(201).json({
                            message: "Restaurant has been deleted"
                        })
                    }else {
                        res.status(404).json({
                            message: "Restaurant Not Found"
                        })

                    }
                    })
                    .catch(next)
                })
            

router.post('/:Id/Menu', async (req, res, next) => {
    const restaurantId = req.params.Id; // Get the restaurant ID from URL
    const { name, price } = req.body; // Get menu item details from request body

    try {
        // Find the restaurant
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Create the new menu item
        const newMenuItem = { _id: new mongoose.Types.ObjectId(), name, price };

        // Add the new item to the menu
        restaurant.menu.push(newMenuItem);

        // Save the updated restaurant
        const updatedRestaurant = await restaurant.save();

        // Respond with all menu items and the new one
        res.status(201).json({
            message: "Menu item added successfully",
            addedMenuItem: newMenuItem,
            allMenuItems: updatedRestaurant.menu
        });
    } catch (err) {
        next(err); // Handle errors
    }
});

router.get('/:Id/Menu', async (req, res, next) => {
    const restaurantId = req.params.Id; // Match the parameter name

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Return the full menu with detailed information
        res.status(200).json({
            message: "Menu retrieved successfully",
            menu: restaurant.menu // This contains the full menu items
        });
    } catch (err) {
        next(err); // Handle errors
    }
});


router.delete('/:Id/Menu/:menuId', (req, res, next) => {
    const restaurantId = req.params.Id; // Get the restaurant ID
    const menuId = req.params.menuId;  // Get the menu item ID

    Restaurant.updateOne(
        { _id: restaurantId },                // Find the restaurant by ID
        { $pull: { menu: { _id: menuId } } }  // Pull the menu item with the given ID
    )
    .exec()
    .then(result => {
        if (result.modifiedCount > 0) {
            res.status(200).json({
                message: "Successfully Deleted Menu Item"
            });
        } else {
            res.status(404).json({
                message: "Menu Item Not Found or Already Deleted"
            });
        }
    })
    .catch(next);
});


module.exports = router;
