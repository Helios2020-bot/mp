module.exports = (app) => {
    const restaurant = require('../controllers/restaurant.controller')

    var router = require('express').Router()




    // Retrieve all Tutorials
    router.get('/', restaurant.findAllRestaurants)
    router.get('/findDish/:id', restaurant.findDish)
    router.get('/rating',restaurant.findRatings)

    app.use('/api/restaurants', router)
  }
