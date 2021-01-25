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
        videoData: content
      });
  });
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


app.locals.createDate = function(date) {
  var now = new Date().getTime();

  now/=1000;
  date/=1000;
  date = now-date;

  if(date < 86400){
    if(date/3600<2) return "1 dat since reslese"
    return Math.floor(date/3600)+" hours since reslese";
  } //hours
  else if(date < 604800){
    if(date/86400<2) return "1 day since reslese"
    return Math.floor(date/86400)+" days since reslese";
  } //day
  else if(date < 2592000){
    if(date/604800<2) "1 week since reslese"
    return Math.floor(date/604800)+" weeks since reslese";
  } //week
  else if(date <31536000){
    if(date/2592000 < 2) return "1 month since reslese"
    return Math.floor(date/2592000)+" months since reslese";
  } //months
  else{
    if(date/31536000<2) return "1 year since reslese"
    return Math.floor(date/31536000)+" years since reslese"
  } //years
}

app.locals.createTimeStamp = function(time){
  let sec = time%60;
  let min = Math.floor(time/60);

  if(min>0){
    if (sec<10) return min+":0"+sec;
    return min+":"+sec;
  }
  else if (sec<10) return "0:0"+sec;
  else return "0:"+sec;
}
