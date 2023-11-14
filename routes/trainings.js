const express = require('express')
const router = express.Router()
router.get("/", (req, res) => {
 res.status(200).json({ success: true, msg: "Show all courses" });
});
router.get("/:id", (req, res) => {
 res.status(200).json({ success: true, msg: `Get course ${req.params.id}` });
});
router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new course" });
});
router.put("/:id", (req, res) => {
 res.status(200).json({ success: true, msg: `Update course ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
 res.status(200).json({ success: true, msg: `Delete course ${req.params.id}` });
});

module.exports = router
