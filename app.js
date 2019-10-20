const http = require('http');
const https = require('https');
const fs = require('fs');
const socketio = require('socket.io');
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT_HTTP= 80;
const PORT_HTTPS= 443;

// /////  서버용 인증서   ////////////////////////////////////////////////////////
// const OPTIONS = {
//   key: fs.readFileSync('/etc/letsencrypt/live/www.unitedin.kr/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/www.unitedin.kr/cert.pem')
// };/////////////////////////////////////////////////////////////////////////

///  테스트용 로컬 인증서  ////////////////////////////////////////////
const OPTIONS = {                                             ///
  key: fs.readFileSync(__dirname + '/openSSLcert/file.pem'),  ///
  cert: fs.readFileSync(__dirname + '/openSSLcert/file.crt')  ///
};///////////////////////////////////////////////////////////////

/////  웹서버를 생성합니다.   ///////////////////////////
const app = express();
const server = http.createServer(app);
const serverSSL = https.createServer(OPTIONS,app);

// ////////  create mysql connection  /////////
// var client = mysql.createConnection({    ///
//   host: '192.168.1.200',                 ///
//   user: 'youngun',                       ///
//   password: 'nice5734',                  ///
//   database: 'LOCATION'                   ///
// });/////////////////////////////////////////

/////   http => https 리디렉션 //////////////////////////////////////////
app.use(function(request, response, next){
  if(request.secure){
    next();
  }else{
    response.redirect("https://" + request.headers.host + request.url);
    console.log('in else');
  }
});

//app.use(express.static(__dirname + '/public'));   //public 디렉토리를 path로 설정해놓음


/////  GET 요청에 대한 라우팅  ////////////////////////////////////////////
app.get('/', (req,res)=>{
  fs.readFile('main.html', function (err,data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);    // http 문서를가져와 그대로 응답할 경우 사용
    //res.send(data); //data가 문자열이면: html, 배열이나 객체면: json 형태로 응답.
    //res.json(data); // data 를 json 형태로 응답.
  });
});

app.get('/login', (req,res)=>{
  fs.readFile('public/login.html', function (err,data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);    // http 문서를가져와 그대로 응답할 경우 사용
    //res.send(data); //data가 문자열이면: html, 배열이나 객체면: json 형태로 응답.
    //res.json(data); // data 를 json 형태로 응답.
  });
});

/////  post 요청에 대한 라우팅  ////////////////////////////////////////////
app.post('/login', (req,res)=>{
  fs.readFile('public/testHtml.html', function (err,data) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);    // http 문서를가져와 그대로 응답할 경우 사용
    //res.send(data); //data가 문자열이면: html, 배열이나 객체면: json 형태로 응답.
    //res.json(data); // data 를 json 형태로 응답.
  });
});

serverSSL.listen(443, function () {
    console.log('https Server is running at https://localhost', PORT_HTTPS);
});
