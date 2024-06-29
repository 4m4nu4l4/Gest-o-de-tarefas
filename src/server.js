const express = require('express');
const app = require('./app');
const sequelize = require('./config/database');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const taskRouter = require('./routes/task');

sequelize.sync({ force: false }).then(() => {
  console.log('Conectado ao banco de dados!');
});

app.use('api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
