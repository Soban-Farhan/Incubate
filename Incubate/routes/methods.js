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
            return res.status(404).json({ status: "NOT FOUND" })
        }
    
        return res.status(200).json({ status: "OK", userID: user.userID })
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/auth/register', async (req, res) => {
    try {
        await models.User.count({
            where: { emailAddress: req.body.emailAddress }
        })
        .then( async (count) => {
            if (count === 0) {
                await models.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress,
                    password: req.body.password
                })

                return res.status(200).json({ status: "OK" })
            } else {
                return res.status(409).json({ status: "FOUND" })
            }
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    } catch (error) {
        return res.status(500).json(err)
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