const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');


router.get('/', taskController.listarAtivs);
router.get('/:id', taskController.buscarPorId);
router.post('/', taskController.criarAtiv);
router.put('/:id', taskController.alterarAtiv);
router.delete('/:id', taskController.deletarAtiv);

module.exports = router;

