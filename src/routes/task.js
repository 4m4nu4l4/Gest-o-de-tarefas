const express = require('express');
const router = express.Router();
const taskApi = require('../api/task');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware.ValidaToken, taskApi.listarAtivs);
router.get('/:id',authMiddleware.ValidaToken, taskApi.buscarPorId);
router.post('/',authMiddleware.ValidaToken, taskApi.criarAtiv);
router.put('/:id',authMiddleware.ValidaToken, taskApi.alterarAtiv);
router.delete('/:id',authMiddleware.ValidaToken, taskApi.deletarAtiv);

module.exports = router;

