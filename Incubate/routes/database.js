const router = require('express').Router();
const models = require("../config/models");

router.get('/create', async (req, res) => {
    await models.createAll()
    res.json({ status: "All models were synchronized successfully."})
})

router.get('/delete', async (req, res) => {
    await models.deleteAll()
    res.json({ status: "All tables dropped!"})
})

module.exports = router