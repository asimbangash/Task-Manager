const express = require("express");
const router = express.Router();
const {getAllTasks,createTask,getTasks,deleteTask,updateTask} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTasks).delete(deleteTask).patch(updateTask);
module.exports = router;