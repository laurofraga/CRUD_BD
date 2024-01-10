const express = require('express');
const bibliotecaRouter = require('./router/biblioteca.router.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/biblioteca', bibliotecaRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

