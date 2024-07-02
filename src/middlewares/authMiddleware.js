const jwt = require('jsonwebtoken');
const SECRET_KEY = 'abacaxi'

class Autenticacao {

  async ValidaToken (req, res, next) {
    console.log(req);
    const token = req.headers.Authorization; //pega o Authorization como parâmetro
  
    if (!token) {
      return res.status(401).send({ error: 'Token não fornecido' });
    }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => { // callback 
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
  
  }
}
module.exports = new Autenticacao();