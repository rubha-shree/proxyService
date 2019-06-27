const express = require('express');
const router = express.Router();
const httpRequest = require('request');
const rp = require('request-promise');

const validator = require('../utils/proxyApiRequestValidator');
const utils = require('../utils/utils');

router.post('/request', async (request, response) => {
    let validatorResponse = validator.validateRequestBody(request.body);

    console.log("Input validation Started");
    if (!validatorResponse.isValidRequest) {
        console.error('Input Validation failed:' + JSON.stringify(validatorResponse.ajvErrors));
        let errorMessage = validatorResponse.ajvErrors[0].dataPath + ' ' + validatorResponse.ajvErrors[0].message;
        response.status(400).send({
            message: errorMessage
        });
        return;
    }

    console.log("Input validation success");
    let options = utils.constructRequestOptions(request.body);
    try {
        console.log("Requesting: ", request.body.url);
        let urlHitResponse = await rp(options);
        if (urlHitResponse && response.headersSent) {
            return;
        }
        response.send(urlHitResponse);
    } catch(error) {
        if (error && response.headersSent) {
            return;
        }
        let statusCode = error.statusCode ? error.statusCode : (error.code ? error.code : 500);
        let message = error.message ? error.message : 'Internal Server Error'
        response.status(statusCode).send({
            message: message
        });
    }
    
});

module.exports = router;