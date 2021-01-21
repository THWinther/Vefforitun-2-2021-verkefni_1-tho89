import express from 'express';

const app = express();
const host = '127.0.0.1';
const port = 3000;
const url = import.meta.url;

//Reyna
app.use((req, res) => {
  res.send('Hello World!');
});

app.listen(port, host, () => {
  console.log(
    `Server @ http://${host}:${port}/`,
  );
});
