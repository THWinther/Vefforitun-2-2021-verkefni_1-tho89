import express from 'express';
import fs from 'fs';

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
  fs.readFile('./videos.json', (err, data) => {
    if (err) {
      throw err;
    }
    const content = JSON.parse(data);
    res.render('index',
      {
        title: 'Fræðslumyndbandaleigan',
        videoData: content,
      });
  });
});

const hostname = '127.0.0.1';
const port = 3000;

//Þetta var besta leiðinn sem ég fann að vista fall í app.locals
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Þetta var besta leiðinn sem ég fann að vista fall í app.locals
app.locals.createDate = function (date) {
  const then = Math.floor(new Date().getTime() / 1000) - Math.floor(date / 1000);

  if (then < 86400) {
    if (then / 3600 < 2) return '1 dat since release';
    return `${Math.floor(then / 3600)} hours since release`;
  } // hours
  if (then < 604800) {
    if (then / 86400 < 2) return '1 day since release';
    return `${Math.floor(then / 86400)} days since release`;
  } // day
  if (then < 2592000) {
    if (then / 604800 < 2) return '1 week since release';
    return `${Math.floor(then / 604800)} weeks since release`;
  } // week
  if (then < 31536000) {
    if (then / 2592000 < 2) return '1 month since release';
    return `${Math.floor(then / 2592000)} months since release`;
  } // months

  if (then / 31536000 < 2) return '1 year since release';
  return `${Math.floor(then / 31536000)} years since release`;
  // years
};

app.locals.createTimeStamp = function (time) {
  const sec = time % 60;
  const min = Math.floor(time / 60);

  if (min > 0) {
    if (sec < 10) return `${min}:0${sec}`;
    return `${min}:${sec}`;
  }
  if (sec < 10) return `0:0${sec}`;
  return `0:${sec}`;
};
