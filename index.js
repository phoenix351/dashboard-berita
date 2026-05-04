var express = require('express');
var app = express();
var path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname)));

app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    })
);

app.use("/css", express.static(__dirname));
app.use("/data", express.static(__dirname));
app.use("/fonts", express.static(__dirname));
app.use("/icons", express.static(__dirname));
app.use("/js", express.static(__dirname));
app.use("/panduan_app_files", express.static(__dirname));

app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));

// Serve new frontend if it exists
const frontendDist = path.join(__dirname, 'frontend/dist');
if (require('fs').existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.join(frontendDist, 'index.html'));
    });
} else {
    // Legacy routes
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/index.html'));
    });
    
    app.get('/analisis', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/analisis.html'));
    });
    
    app.get('/unduh', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/unduh.html'));
    });
    app.get('/twitter', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/twitter.html'));
    });
    app.get('/panduan', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/panduan.html'));
    });
    app.get('/login',function(req,res){
        res.sendFile(path.join(__dirname + '/views/login.html'));
    });
    app.get('/twitter_live',function(req,res){
        res.sendFile(path.join(__dirname + '/keyword.json'));
    });
    app.get('/coba',function(req,res){
        res.sendFile(path.join(__dirname + '/views/nyoba.html'));
    });
}

// add other routes below


app.listen(process.env.PORT || 8080);