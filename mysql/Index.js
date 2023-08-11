const express=require('express')
const router=express.Router()
const UserRoutes = require('./User')
const Listing = require('./Listing')
const AwsUpload = require('./AwsUpload')

router.get('/',(req, res) =>{
    res.send("Welcome to stack clone")
});

router.use('/user',UserRoutes);
router.use("/seller",Listing);
router.use('/aws',AwsUpload)

module.exports = router;