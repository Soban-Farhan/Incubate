const router = require('express').Router();
const models = require("../config/models");
var sha256 = require('js-sha256');


router.post('/auth/login', async (req, res) => {
    // const user = await models.User.findOne({ 
    //     where: { 
    //         emailAddress: req.body.email, 
    //         password: req.body.password
    //     } 
    // });
    return res.json({ "status": req.body });
    
    // if (user === null) {
    //     res.status(400).send({ email: "" })
    // }

    // res.status(200).send({ status: "User" })
})


// Database Related
router.get('/create', async (req, res) => {
    await models.createAll()
    res.json({ status: "All models were synchronized successfully."})
})

router.get('/delete', async (req, res) => {
    await models.deleteAll()
    res.json({ status: "All tables dropped!"})
})

module.exports = router