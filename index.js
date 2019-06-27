const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const proxyApi = require('./routes/proxyApi')

const port = process.env.PORT || 3000;
const app = express();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
  message: "Too many requests, please try again after a minute"
});
 
//  apply to all requests
app.use(limiter);

//Adding body parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
    response.setTimeout(5000, () => {
        response.status(504).send('Server Timed Out');
    });
    next();
})
app.use('/api', proxyApi);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;