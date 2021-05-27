const router = require("express").Router();
let GroupTasksBy = require("../common/GroupTasks");
let Task = require("../models/task.model");

// Get all tasks
router.get("/", (req, res, next) => {

  Task.find()
    .then(tasks => {
      console.log(tasks)
      console.log(GroupTasksBy(tasks, 'collection_id'))
      res.json(GroupTasksBy(tasks, 'collection_id'))
    })
    .catch(next)
});

// Create new task
router.route("/").post((req, res) => {

  const newTask = new Task({
    collection_id: req.body.collection_id,
    name: req.body.name,
    description: req.body.description,
    deadline: Date.parse(req.body.deadline),
    completed: false,
  });

  newTask
    .save()
    .then(task => res.json(task))
    .catch((err) => res.status(400).json(err));
});

// Get task by id
router.route("/:id").get((req, res, next) => {

  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch(next)
});

// Delete all tasks
router.route("/").delete((req, res, next) => {

  Task.deleteMany({})
    .then(() => res.json({message: 'Successfully deleted all tasks'}))
    .catch(next)
});

// Delete task by id
router.route("/:id").delete((req, res, next) => {

  Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => res.json(deletedTask))
    .catch(next);
});

// Update task by id
router.route("/update/:id").put((req, res, next) => {

  Task.findByIdAndUpdate(req.params.id)
    .then((task) => {
      task.collection_id = req.body.collection_id;
      task.name = req.body.name;
      task.description = req.body.description;
      task.completed = req.body.completed;
      task.deadline = Date.parse(req.body.deadline);

      task.save()
        .then(task => res.json(task))
        .catch(err => res.status(400).json(err));
    })
    .catch(next);
});

// Complete task by id
router.route("/complete/:id").put((req, res, next) => {

  Task.findByIdAndUpdate({_id: req.params.id}, {completed: true})
    .then((task) => res.json(task))
    .catch(next)
});

// Open task by id
router.route("/open/:id").put((req, res, next) => {

  Task.findByIdAndUpdate({_id: req.params.id}, {completed: false})
    .then((task) => res.json(task))
    .catch(next)
});

module.exports = router;
