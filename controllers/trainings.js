const Training = require("../models/Training");

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
    const training = await Training.findById("5d713995b721c3bb38c1f5d0");
    if (!training) {
      return res.status(400).json({ success: false, msg: "Not found" });
    }
    res.status(200).json({ success: true, data: training });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}; // @desc   Create new training
// @route  POST /api/trainings
// @access Private
exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json({ success: true, data: training });
  } catch (error) {
    res.status(400).json({ success: false });
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
    res.status(400).json({ success: false });
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
    res.status(400).json({ success: false });
  }
};
