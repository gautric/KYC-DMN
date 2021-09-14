const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || "9000";
const KYC_DMN_PROXY = process.env.KYC_DMN_PROXY || "http://localhost:8080";

app.use(express.static(path.join(__dirname, '/dist')));

app.use(
  '/api',
  createProxyMiddleware({
    target: KYC_DMN_PROXY,
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
