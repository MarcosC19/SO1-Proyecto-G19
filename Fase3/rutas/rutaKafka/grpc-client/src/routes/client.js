const express = require('express')
const router = express.Router()
const client = require('../helpers/client-grpc') // importing the grpc client

router.get('/', (req, res) => {
    return res.json({ 'response': 'Server running' })
})

router.post('/gameid/:id/players/:players', (req, res) => {
    const { id, players } = req.params;

    client.Playing({ gameId: id, players: players }, function (err, response) {
        if (err){
            res.status(400).json({'status': err})
        }

        let result = {
            "mensaje": response.gameName
        }

        res.status(200).json(result);
    });
})

module.exports = router