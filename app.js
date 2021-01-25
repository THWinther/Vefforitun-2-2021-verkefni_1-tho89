import express from 'express';

let viewsPath = new URL('./views', import.meta.url).pathname;
const publicURL = new URL('./public', import.meta.url).pathname;
const app = express();

// Þetta verður aðgengilegt gegnum `local.bar` í template
app.locals.importantize = (str) => (`${str}!`);

// URL bætti alltaf við auka / í byrjun þetta eyðir því
viewsPath = viewsPath.substr(1, viewsPath.length);
app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(publicURL.substring(1, publicURL.length)));

app.get('/', (req, res) => {
  // `title` verður aðgengilegt sem breyta í template
  res.render('index', { title: 'Forsíða' });
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
