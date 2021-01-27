import express from 'express';
import fs from 'fs';
import { createTimeStamp, createDate } from './src/videos.js';

let viewsPath = new URL('./views', import.meta.url).pathname;
let publicURL = new URL('./public', import.meta.url).pathname;

// URL bætti alltaf við auka / í byrjun þetta eyðir því
viewsPath = viewsPath.substr(1, viewsPath.length);
publicURL = publicURL.substring(1, publicURL.length);

const app = express();

// Þetta verður aðgengilegt gegnum `local.bar` í template
app.locals.importantize = (str) => (`${str}!`);

app.set('view engine', 'ejs');
app.set('views', viewsPath);

function readVideoDataMiddleware(req, res, next) {
  fs.readFile('./videos.json', (err, data) => {
    if (err) {
      throw err;
    }
    res.locals.videoData = JSON.parse(data);
    next();
  });
}

app.use(express.static(publicURL));

app.get('/', [readVideoDataMiddleware], (req, res) => {
  res.render('index',
    { title: 'Fræðslumyndbandaleigan' });
});

app.get('/video/videos/:name', (req, res) => {
  const { name } = req.params;
  if (name.includes('.png')) {
    res.sendFile(`${publicURL}/videos/${name}`, { headers: { 'Content-Type': 'image/png' } });
  } else if (name.includes('.mp4')) {
    res.sendFile(`${publicURL}/videos/${name}`, { headers: { 'Content-Type': 'video/mp4' } });
  } else res.status(404).send('404 Unsupported file type requested');
});

// passa uppá að rétt dir er notað til að skila css, er 100% viss að það er til betri lausn
app.get('/video/styles.css', (req, res) => {
  res.sendFile(`${publicURL}/styles.css`, { headers: { 'Content-Type': 'text/css' } });
});

app.get('/video/:id', [readVideoDataMiddleware], (req, res) => {
  const { id } = req.params;
  if (id - 1 >= res.locals.videoData.videos.length) {
    res.status(404).send('404 Invalid video id');
  } else {
    const { title } = res.locals.videoData.videos[id - 1];
    res.render('video', {
      id,
      title,
    });
  }
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Þetta var besta leiðinn sem ég fann að vista fall í app.locals
app.locals.createDate = createDate;

app.locals.createTimeStamp = createTimeStamp;
