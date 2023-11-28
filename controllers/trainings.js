const Training = require("../models/Training");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find();
    res
      .status(200)
      .json({ success: true, count: trainings.length, data: trainings });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}; // @desc   Get single training
// @route  GET /api/trainings/:id
// @access Public
exports.getTraining = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    res.status(200).json({ success: true, data: training });
  } catch (error) {
    next(new ErrorResponse(`(${req.params.id}): Ezzel az ID-val nem létezik kurzus!`, 404));
  }
}; // @desc Create new training
// @route  POST /api/trainings
// @access Private
exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json({ success: true, data: training });
  } catch (error) {
    next(new ErrorResponse("Kérem adjon meg adatokat!", 404))
  }
};
// @desc   Update training
// @route  PUT /api/trainings/:id
// @access Private
exports.updateTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // A frissített adatokat kapjuk vissza
      runValidators: true, // Ellenőrizze a frissített adatokat a modell
    });
    if (!training) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    res.status(200).json({ success: true, data: training });
  } catch (error) {
    if (!req.body) {
      next(new ErrorResponse("Kérem adjon meg adatokat!", 404))
    } else {
      next(new ErrorResponse(`(${req.params.id}): Ezzel az ID-val nem létezik kurzus!`, 404))

    }
  }
}; // @desc   Delete training
// @route  DELETE /api/trainings/:id
// @access Private
exports.deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(new ErrorResponse(`(${req.params.id}): Ezzel az ID-val nem létezik kurzus!`, 404))
  }
};
