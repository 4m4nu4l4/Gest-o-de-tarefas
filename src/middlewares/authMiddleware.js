const jwt = require('jsonwebtoken');
const SECRET_KEY = 'abacaxi'

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); //pega o Authorization como parâmetro

  if (!token) {
    throw new Error('Token inválido')

};

jwt.verify(token, SECRET_KEY, (e, decoded) => {
  if (e) {
    return res.status(401).send({ error: 'Token inválido' });
  }
  req.userId = decoded.id;
  next();
});

}

module.exports = authMiddleware;