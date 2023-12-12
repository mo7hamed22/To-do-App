// src/controllers/taskController.js
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");
const { ValidateId } = require("../utils/validateId");
// Get ALL Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.Task.find({
      userId: req.user?._id || "615d1c601dcab5e56d6eb28f",
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    // To Check Correct Id
    if (ValidateId(req.params.id) === false) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    const task = await Task.Task.findOne({
      _id: req.params.id,
      userId: req.user?._id || "615d1c601dcab5e56d6eb28f",
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    userId: req.user?._id || "615d1c601dcab5e56d6eb28f",
  };
  const { error } = Task.validateTask(task);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const newTask = new Task.Task(task);

    // Save the new task to the database
    const savedTask = await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (ValidateId(req.params.id) === false) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    const task = await Task.Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user?._id || "615d1c601dcab5e56d6eb28f",
      },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    if (ValidateId(req.params.id) === false) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    const task = await Task.Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?._id || "615d1c601dcab5e56d6eb28f",
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
