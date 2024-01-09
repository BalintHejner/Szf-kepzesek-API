const express = require('express')
const {
    getTraining,
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining,
    getTrainingsInRadius,
    trainingPhotoUpload,
} = require('../controllers/trainings')

const advancedResults = require('../middlewares/advancedResults')

const courseRouter = require('./courses')
const Training = require('../models/Training')

const router = express.Router()

router.use('/:trainingId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getTrainingsInRadius)

router.route('/:id/photo').put(trainingPhotoUpload)

router.route('/').get(advancedResults(Training, 'courses'), getTrainings).post(createTraining)

router.route('/:id').get(getTraining).put(updateTraining).delete(deleteTraining)

module.exports = router
