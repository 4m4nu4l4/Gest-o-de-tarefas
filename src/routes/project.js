const express = require('express');
const router = express.Router();
const projectApi = require('../api/project');


router.get('/', projectApi.listarProjetos);
router.get('/:id', projectApi.buscarPorId);
router.post('/', projectApi.criarProjeto);
router.put('/:id', projectApi.alterarProjeto);
router.delete('/:id', projectApi.deletarProjeto);

module.exports = router;

