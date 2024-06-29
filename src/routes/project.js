const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');


router.get('/', projectController.listarProjetos);
router.get('/:id', projectController.buscarPorId);
router.post('/', projectController.criarProjeto);
router.put('/:id', projectController.alterarProjeto);
router.delete('/:id', projectController.deletarProjeto);

module.exports = router;

