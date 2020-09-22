const path = require('path');
const express = require('express');
const createProxyMiddleware  = require('http-proxy-middleware');
const app = express();
const port = 9000;


app.use(express.static(path.join(__dirname, '/dist')));

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    },
  })
);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
