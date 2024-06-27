const express = require('express');
const app = express();
const sequelize = require('./config/database');
const routes = require('./src/routes');

sequelize.sync({ force: false }).then(() => {
  console.log('Conectado ao banco de dados!');
});

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
