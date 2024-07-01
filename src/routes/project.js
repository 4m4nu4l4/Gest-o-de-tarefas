const express = require('express');
const router = express.Router();
const projectApi = require('../api/project');


router.get('/',authMiddleware, projectApi.listarProjetos);
router.get('/:id',authMiddleware, projectApi.buscarPorId);
router.post('/',authMiddleware, projectApi.criarProjeto);
router.put('/:id',authMiddleware, projectApi.alterarProjeto);
router.delete('/:id',authMiddleware, projectApi.deletarProjeto);

module.exports = router;

