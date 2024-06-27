'use strict'
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const config = require("./config");

const app = express()

const corsOptions = {
    origin: 'https://simple-store-cms.vercel.app',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));


app.use('/api', require('./routes/postRoute'))


app.listen(config.port,()=>{
    console.log(`Server up and runing at ${config.url}`)
})



