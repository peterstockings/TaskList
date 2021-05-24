const router = require('express').Router();

let Task = require('../models/task.model');

router.get("/all", (req, res)=> {
    Task.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/add').post((req, res)=> {
    const name = req.body.name;
    const description = req.body.description;
    const deadline = Date.parse(req.body.deadline);
    const completed = false;
    const newTask = new Task({name, description, deadline, completed});
    newTask.save()
        .then(()=>res.json('Task Added'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res)=> {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res)=> {
    Task.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Task Deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').put((req, res)=> {
    Task.findByIdAndUpdate(req.params.id)
        .then(task => {
            task.name = req.body.name;
            task.description = req.body.description;
            task.completed = req.body.completed;
            task.save()
                .then(()=>res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;