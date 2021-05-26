const router = require("express").Router();

let Task = require("../models/task.model");

router.get("/", (req, res, next) => {
  Task.aggregate([
    {
      $group: {
        _id: "$collection_id",
        list: {
          $push: {
            id: "$_id",
            collection_id: "$collection_id",
            name: "$name",
            description: "$description",
            deadline: "$deadline",
            completed: "$completed",
          },
        },
      },
    },
  ])
    .then((task) => res.json(task))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {

  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch(next)
});

router.route("/:id").delete((req, res) => {
  console.log(`DELETE /${req.params.id}`)
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task Deleted."))
    .catch((err) => res.status(400).json({"Error: ": err.message}));
});

router.route("/").delete((req, res) => {
  console.log(`DELETE /`)
  Task.collection.remove();
});

router.route("/update/:id").put((req, res) => {
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
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
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

router.route("/add").post((req, res) => {
  console.log(`POST /add`)

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
