const { Op } = require("sequelize");
const { Task } = require("../models");

class TaskController {
  static async create(req, res, next) {
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.create(input);

      res.status(201).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const { classId } = req.query;

      let opt = { where: {} };
      if (classId) {
        opt.where.classId = classId;
      }

      const tasks = await Task.findAll(opt);

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      if (!task) {
        throw { name: "TaskNotFound", id };
      }

      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      await Task.destroy({ where: { id } });

      res.status(200).json({ message: `Deleted task with ID ${id}` });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    try {
      const { name, description, question, soundUrl, classId } = req.body;
      const input = { name, description, question, soundUrl, classId };

      const result = await Task.update(input, {
        where: { id },
        returning: true,
      });

      res
        .status(200)
        .json({ result: result[1][0], message: `Task with ID ${id} Updated` });
    } catch (err) {
      console.log("rito:", err.name);
      next(err);
    }
  }
}

module.exports = TaskController;
