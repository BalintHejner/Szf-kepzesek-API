const geocoder = require('../utils/geocoder')
const Course = require('../models/Course')
const Training = require('../models/Training')
const ErrorResponse = require('../utils/errorResponse')

// @desc   Get courses
// @route  GET /api/cours
// @route  GET /api/trainings/:trainingId/courses
// @access Public
exports.getCourses = async (req, res, next) => {
     try {
     let query
     if (req.params.trainingId) {
     query = Course.find({ training: req.params.trainingId })
     } else {
     query = Course.find().populate({
        path: 'training',
        select: '-_id name description'
     })
     }
     const courses = await query
     if (courses.length === 0) {
     return res
     .status(404)
     .json({ success: false, msg: `Not found ${req.params.trainingId} id` })
     }
     res
     .status(200)
     .json({ success: true, count: courses.length, data: courses })
     } catch (error) {
     next(error)
     }
    }

// @desc   Get single course
// @route  GET /api/courses/:id
// @access Public
exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate({
            path: 'training',
            select: 'name description',
        })

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
        }
        res.status(200).json({ success: true, data: course })
    } catch (error) {
        next(error)
    }
}

// @desc   Add course
// @route  POST /api/trainings/:trainingId/courses
// @access Private
exports.addCourse = async (req, res, next) => {
    try {
        req.body.training = req.params.trainingId

        const training = await Training.findById(req.params.trainingId)

        if (!training) {
            return next(new ErrorResponse(`No training with the id of ${req.params.trainingId}`, 404))
        }

        const course = await Course.create(req.body)

        res.status(200).json({ success: true, data: course })
    } catch (error) {
        next(error)
    }
}

// @desc   Update course
// @route  PUT /api/courses/:id
// @access Private
exports.updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id)

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({ success: true, data: course })
    } catch (error) {
        next(error)
    }
}

// @desc   Delete course
// @route  DELETE /api/courses/:id
// @access Private
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
        }

        await course.remove()

        res.status(200).json({ success: true, data: {} })
    } catch (error) {
        next(error)
    }
}
