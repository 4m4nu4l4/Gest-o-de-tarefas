const express = require('express');
const router = express.Router();
const UserApi = require('../api/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware, UserApi.listarUsuarios);
router.get('/:id',authMiddleware, UserApi.buscarPorId);
router.post('/', UserApi.criarUsuario);
router.put('/:id',authMiddleware, UserApi.alterarUsuario);
router.delete('/:id',authMiddleware, UserApi.deletarUsuario);
// verificar a autenticação
router.get('/', authMiddleware, UserApi.login);

router.post('/login', UserApi.login);

// router.get('/', authMiddleware,(req, res) => {
//   res.send (`Autenticação verificada! ${req.user.id}`)
// });

module.exports = router;
