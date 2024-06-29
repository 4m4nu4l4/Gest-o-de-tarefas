const express = require('express');
const router = express.Router();
const taskApi = require('../api/task');


router.get('/', taskApi.listarAtivs);
router.get('/:id', taskApi.buscarPorId);
router.post('/', taskApi.criarAtiv);
router.put('/:id', taskApi.alterarAtiv);
router.delete('/:id', taskApi.deletarAtiv);

module.exports = router;

