const Task = require('../models/taskModel');

module.exports.list = (req, res) => {
  Task.find({}, (err, result) => {
    if(err) return console.log(err);
    res.render('page/tasks/list.html', {
      pageTitle: "Tasks",
      tasks: result
    });
  });
}

module.exports.create = (req, res) => {
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