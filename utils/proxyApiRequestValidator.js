const Ajv = require('ajv');

let ajv = new Ajv({
    coerceTypes: true
});

module.exports.validateRequestBody = (requestBody) => {
    let proxyApiRequestBodySchema = () => {
        return {
          "type": "object",
          "properties": {
            "clientId": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "headers": {
              "type": "object"
            },
            "requestType": {
                "type": "string"
            },
            "requestBody": {
                "type": "string"
            }
          },
          "required": ["url", "requestType"]
        };
    }

    let isValid = ajv.validate(proxyApiRequestBodySchema(), requestBody);
    if (isValid && !requestBody.url.startsWith('https')) {
        isValid = false;
        ajv.errors = [{}];
        ajv.errors[0].dataPath = '';
        ajv.errors[0].message = 'Https requests only are allowed';
    }

    return {
        isValidRequest: isValid,
        ajvErrors: ajv.errors
    }
}
