const router = require('express').Router();

let List = require('../models/list.model');

router.get("/all", (req, res)=> {
    List.find()
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/add').post((req, res)=> {
    const name = req.body.name;
    const newList = new List({name});
    newList.save()
        .then(()=>res.json('List Added'))
        .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/').delete((req, res)=> {
    List.collection.remove();
})
module.exports = router;