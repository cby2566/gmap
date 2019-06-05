 const proxy = require('http-proxy-middleware');
const express = require('express');

let app = express();

app.use(express.static('./'))

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  //   跨域请求CORS中的预请求
  if (req.method == "OPTIONS") {
    res.send(200); //让options请求快速返回
  } else {
    next();
  }
});
app.use('/gmap', proxy({
  'target': "http://18.162.147.230:8080",
  " changeOrigin": true,
  // 'ws': true,
  "pathRewrite": {
    "^/gmap": ""
  }
}));

// app.use('/newlogin', proxy({
//   "target": "http://192.168.1.37:8080",
//   "changeOrigin": true,
//   // 'ws': true,
//   "pathRewrite": {
//     "^/newlogin": ""
//   }
// }));
app.listen(8080, function () {
  console.log('Server running on httplocalhost8080');
});