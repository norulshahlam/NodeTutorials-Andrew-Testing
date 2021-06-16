const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

/*
3. a) GET /tasks?completed=true

4. b) GET /tasks?limit=10&skip=10

5. c) GET /tasks?sortBy=createdAt:desc
    createdAt: 1 > show oldest first
    createdAt: -1 > show newest first

6.  d) GET /tasks?sortBy=completed:true
    completed: 1 > show incompleted tasks first
    completed: -1 > show completed tasks first
*/
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  // a) show only by completion
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  // c)sort by created at
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  // d) sort by completed task
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === true ? 1 : -1;
  }
  console.log(sort);

  try {
    await req.user
      .populate({
        path: "tasks",
        //3
        match,
        //4
        options: {
          // b)
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

/* old query - replaced by above
get all tasks - of logged user
router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
}); */

//add task (of logged user)
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get 1 task by id (of logged user)
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send("No task found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update 1 task (of logged user)
router.patch("/tasks/:id", auth, async (req, res) => {
  //
  const updates = Object.keys(req.body);
  const allowedUpdate = ["description", "completed"];
  const isValid = updates.every((update) => allowedUpdate.includes(update));

  if (!isValid) {
    return res.status(400).send({ Error: "No existing fields" });
  }

  const _id = req.params.id;
  const owner = req.user._id;
  try {
    //3. updated to ensure task belongs to logged in user
    const task = await Task.findOne({ _id, owner });
    // const task = await Task.findById(id);
    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send({ Error: "ID not found" });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete 1 task (of logged user)
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;
  try {
    const task = await Task.findByIdAndDelete({ _id, owner });

    if (!task) {
      return res.status(404).send({ Error: "ID not found" });
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
