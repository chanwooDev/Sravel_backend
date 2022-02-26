const path = require('path')
const alias = require('better-module-alias')(path.join(__dirname,'/..'));  // $ == backend/src
const express = require('express');
const app = express();
const loaders = require('./loaders');

async function startServer() {
    await loaders({expressApp:app});    
    app.listen(8000, function(){
        console.log("start!! express server on port 8000");
    });
}

startServer();