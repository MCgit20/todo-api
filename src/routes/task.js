const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await TaskModel.getAll();
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description || typeof description !== 'string' || description.length > 1000) {
      return res.status(400).json({ error: 'Description invalide ou trop longue' });
    }
    const newTask = await TaskModel.create(description);
    res.status(201).json(newTask);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await TaskModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Tâche non trouvée' });
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await TaskModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tâche non trouvée' });
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;