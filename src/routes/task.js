const express = require('express');
const router = express.Router();
const taskApi = require('../api/task');


router.get('/',authMiddleware, taskApi.listarAtivs);
router.get('/:id',authMiddleware, taskApi.buscarPorId);
router.post('/',authMiddleware, taskApi.criarAtiv);
router.put('/:id',authMiddleware, taskApi.alterarAtiv);
router.delete('/:id',authMiddleware, taskApi.deletarAtiv);

module.exports = router;

