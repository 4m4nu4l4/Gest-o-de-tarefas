const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.listarUsuarios);
router.get('/:id', userController.buscarPorId);
router.post('/', userController.criarUsuario);
router.put('/:id', userController.alterarUsuario);
router.delete('/:id', userController.deletarUsuario);

module.exports = router;
