const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task');

// GET /api/tasks : lister toutes les tâches
router.get('/', (req, res) => {
  res.json(TaskModel.getAll());
});

// GET /api/tasks/:id : voir une tâche
router.get('/:id', (req, res) => {
  const task = TaskModel.getById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(task);
});

// POST /api/tasks : créer une tâche (avec validation basique de taille/format)
router.post('/', (req, res) => {
  const { description } = req.body;
  
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'La description est requise et doit être une chaîne' });
  }

  // Sécurité : Refuser les chaînes trop longues (ex: > 1000 caractères)
  if (description.length > 1000) {
    return res.status(400).json({ error: 'Description trop longue (max 1000 caractères)' });
  }

  const newTask = TaskModel.create(description);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id : modifier une tâche
router.put('/:id', (req, res) => {
  const updated = TaskModel.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(updated);
});

// DELETE /api/tasks/:id : supprimer une tâche
router.delete('/:id', (req, res) => {
  const deleted = TaskModel.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.status(204).send();
});

module.exports = router;