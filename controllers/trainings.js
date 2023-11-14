// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all trainings", hello: req.hello });
}; // @desc   Get single training
// @route  GET /api/trainings/:id
// @access Public
exports.getTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get training ${req.params.id}` });
}; // @desc   Create new training
// @route  POST /api/trainings
// @access Private
exports.createTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new training" });
}; // @desc   Update training
// @route  PUT /api/trainings/:id
// @access Private
exports.updateTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update training ${req.params.id}` });
}; // @desc   Delete training
// @route  DELETE /api/trainings/:id
// @access Private
exports.deleteTraining = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete training ${req.params.id}` });
};
// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all trainings", hello: req.hello });
};
