const router = require('express').Router();
const models = require("../config/models");

router.post('/auth/login', async (req, res) => {
    try {
        const user = await models.User.findOne({ 
            where: { 
                emailAddress: req.body.emailAddress, 
                password: req.body.password
            } 
        });
        
        if (user === null) {
            return res.status(404).json("NOT FOUND")
        }
    
        return res.status(200).json("OK")
    } catch (error) {
        return res.status(500)
    }
    
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