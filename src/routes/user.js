const express = require('express');
const router = express.Router();
const UserApi = require('../api/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware.ValidaToken, UserApi.listarUsuarios);
router.get('/:id',authMiddleware.ValidaToken, UserApi.buscarPorId);
router.post('/', UserApi.criarUsuario);
router.put('/:id',authMiddleware.ValidaToken, UserApi.alterarUsuario);
router.delete('/:id',authMiddleware.ValidaToken, UserApi.deletarUsuario);

// verificar a autenticação

router.post('/login', UserApi.login);

// router.get('/', authMiddleware,(req, res) => {
//   res.send (`Autenticação verificada! ${req.user.id}`)
// });

module.exports = router;
