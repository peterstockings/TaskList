const router = require("express").Router();

let Task = require("../models/task.model");

// Get all tasks
router.get("/", (req, res, next) => {
  Task.find()
  .then(tasks => res.json(tasks))
  .catch(next)
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

//Delete task by id
router.route("/:id").delete((req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => res.json(deletedTask))
    .catch(next);
});

router.route("/update/:id").put((req, res, next) => {
  console.log(`PUT /update/${req.params.id}`)

  Task.findByIdAndUpdate(req.params.id)
    .then((task) => {
      task.collection_id = req.body.collection_id;
      task.name = req.body.name;
      task.description = req.body.description;
      task.completed = req.body.completed;
      task.deadline = Date.parse(req.body.deadline);
      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch(next);
    })
    .catch(next);
});

router.route("/complete/:id").put((req, res) => {
  console.log(`PUT /complete/${req.params.id}`)

  Task.findByIdAndUpdate(req.params.id)
    .then((task) => {
      task.collection_id = req.body.collection_id;
      task.name = req.body.name;
      task.description = req.body.description;
      task.completed = true;
      task.deadline = Date.parse(req.body.deadline);
      task
        .save()
        .then(() => res.json("Task Completed!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const collection_id = req.body.collection_id;
  const name = req.body.name;
  const description = req.body.description;
  const deadline = Date.parse(req.body.deadline);
  const completed = false;
  const newTask = new Task({
    collection_id,
    name,
    description,
    deadline,
    completed,
  });
  newTask
    .save()
    .then(() => res.json("Task Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
