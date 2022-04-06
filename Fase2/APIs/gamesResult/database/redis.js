const redis = require('redis');
require('dotenv').config()

const client = redis.createClient({
    url: `redis://${process.env.REDIS_IP}:6379`
})

client.on('error', (err) => {
    console.log('Redis Client error ', err)
});

module.exports = client