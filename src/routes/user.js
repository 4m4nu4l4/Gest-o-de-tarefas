const express = require('express');
const router = express.Router();
const UserApi = require('../api/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', UserApi.listarUsuarios);
router.get('/:id', UserApi.buscarPorId);
router.post('/', UserApi.criarUsuario);
router.put('/:id', UserApi.alterarUsuario);
router.delete('/:id', UserApi.deletarUsuario);

router.post('/login', login);

// verificar a autenticação
router.get('/profile', authMiddleware,(req, res) => {
  res.send (`Autenticação verificada! ${req.user.id}`)
});

module.exports = router;
