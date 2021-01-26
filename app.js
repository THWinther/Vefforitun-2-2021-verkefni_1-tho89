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

function readVideoDataMiddleware(req,res,next){
  fs.readFile('./videos.json', (err, data) => {
    if (err) {
      throw err;
    }
    res.locals.videoData = JSON.parse(data);
    next();
  });
}




app.use(express.static(publicURL.substring(1, publicURL.length)));

app.get('/',[readVideoDataMiddleware],(req, res) => {
    res.render('index',
      {title: 'Fræðslumyndbandaleigan'});
});


app.get('/video/:id', (req, res) =>{

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
    if (then / 3600 < 2) return 'Fyrir klukkutíma síðan';
    return `Fyrir ${Math.floor(then / 3600)} klukkutímum síðan`;
  } // hours
  if (then < 604800) {
    if (then / 86400 < 2) return 'Fyrir degi síðan';
    return `Fyrir ${Math.floor(then / 86400)} dögum síðan`;
  } // day
  if (then < 2592000) {
    if (then / 604800 < 2) return 'Fyrir viku síðan';
    return `Fyrir ${Math.floor(then / 604800)} vikum síðan`;
  } // week
  if (then < 31536000) {
    if (then / 2592000 < 2) return 'Fyrir mánuði síðan';
    return `Fyrir ${Math.floor(then / 2592000)} mánuðum síðan`;
  } // months

  if (then / 31536000 < 2) return 'Fyrir ári síðan';
  return `Fyrir ${Math.floor(then / 31536000)} árum síðan`;
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
