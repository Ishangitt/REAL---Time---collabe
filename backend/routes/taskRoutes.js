const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  editTask,
  removeTask,
} = require("../controllers/taskController");

router.get("/:roomId", getTasks);
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", removeTask);

module.exports = router;
