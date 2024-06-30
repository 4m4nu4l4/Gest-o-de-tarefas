const express = require('express');
const app = require('./app');
const sequelize = require('./config/database');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const taskRouter = require('./routes/task');


sequelize.db.sync({ force: false }).then(() => {
  // try {
  //   sequelize.database;
  // } catch (e) {
  //   console.log(`Não conectado no banco de dados: ${e}`); // Esse E dá uma mensagem personalizada caso o banco de erro
  // }
  console.log('Conectado ao banco de dados!');
});

// V1 está nas boas práticas dos padrões de apis 
app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/task', taskRouter);


const port = 3000; 
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
