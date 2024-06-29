const express = require('express');
const router = express.Router();
const UserApi = require('../api/user');

router.get('/', UserApi.listarUsuarios);
router.get('/:id', UserApi.buscarPorId);
router.post('/', UserApi.criarUsuario);
router.put('/:id', UserApi.alterarUsuario);
router.delete('/:id', UserApi.deletarUsuario);

module.exports = router;
