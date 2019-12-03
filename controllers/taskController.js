const Task = require('../models/taskModel');

module.exports.list = (req, res) => {
  Task.find({}, (err, result) => {
    if(err) return console.log(err);
    res.render('tasks-list.html', {
      tasks: result
    });
  });
}

module.exports.add = (req, res) => {
  if(!req.body) res.sendStatus(404);
  let {name, description, completed} = req.body;
  new Task({
    name: name,
    description: description,
    completed: completed
  })
  .save()
  .then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
}

module.exports.form = (req, res) => {
  res.render('tasks-add.html');
}