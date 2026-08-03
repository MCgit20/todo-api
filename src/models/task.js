const { v4: uuidv4 } = require('uuid');

let tasks = [];

class TaskModel {
  static getAll() {
    return tasks;
  }

  static getById(id) {
    return tasks.find(t => t.id === id);
  }

  static create(description) {
    const newTask = {
      id: uuidv4(),
      description,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static update(id, data) {
    const task = this.getById(id);
    if (!task) return null;

    if (data.description !== undefined) task.description = data.description;
    if (data.status !== undefined) task.status = data.status;
    task.updatedAt = new Date();

    return task;
  }

  static delete(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}

module.exports = TaskModel;