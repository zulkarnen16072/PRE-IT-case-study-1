require('dotenv').config('../config')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const host = process.env.PGHOST;
const port = process.env.PORT;

const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes);


app.use((req, res) => {
   
    res.status(404).json({
        errors: {
            code: 404,
            message: 'page not found', 
            detail: `page ${req.url} not found`
        },
        links: {
            base: 'http://localhost:3000'
        }
    })
})



app.listen(process.env.PORT, () => {
    console.info(`sedang berjalan pada ${host}:${port}~`)
})