const express = require('express');
const router = express.Router();
const projectApi = require('../api/project');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware.ValidaToken, projectApi.listarProjetos);
router.get('/:id',authMiddleware.ValidaToken, projectApi.buscarPorId);
router.post('/',authMiddleware.ValidaToken, projectApi.criarProjeto);
router.put('/:id',authMiddleware.ValidaToken, projectApi.alterarProjeto);
router.delete('/:id',authMiddleware.ValidaToken, projectApi.deletarProjeto);

module.exports = router;

