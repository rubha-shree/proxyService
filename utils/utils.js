module.exports.constructRequestOptions = (body) => {
    if(body.requestType.toLowerCase() === 'get')
        return constructGetRequestOptions(body);

    return constructNonGetRequestOptions(body);
}

let constructGetRequestOptions = (body) => {
    return {
        uri: body.url,
        headers: body.headers,
        json: true
    };
}

let constructNonGetRequestOptions = (body) => {
    let options;
    try {
        options = {
            method: body.requestType,
            uri: body.url,
            headers: body.headers,
            body: JSON.parse(body.requestBody),
            json: true 
        }
    } catch (error) {
        options = {
            method: body.requestType,
            uri: body.url,
            headers: body.headers,
            body: body.requestBody,
            json: true 
        }
    }
    return options;
}