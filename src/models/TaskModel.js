const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Completed"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().iso().required(),
    status: Joi.string().valid("To-Do", "In Progress", "Completed").required(),
    userId: Joi.string(),
    // .pattern(/^[0-9a-fA-F]{24}$/)
  });

  return schema.validate(task);
}
module.exports = {
  Task,
  validateTask,
};
