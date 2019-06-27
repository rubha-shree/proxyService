Proxy Service

It is a service that acts like a typical proxy to replay an HTTPS request to specified URL and returns back the response.

Parameters Accepted:
    - ClientID
    - URL -required
    - Headers (JSON object) 
    - HTTP Request Type -required
    - Request Body (String)

Run service using docker:
    Pre-requisites:
        - Install postman
        - Install Docker from https://docs.docker.com/install/
        - Clone the code from https://github.com/rubha-shree/proxyService
    
    Steps to run the application:
        - Build the docker image using the command:  docker build -t proxyservice:latest -t proxyservice:latest .
        - Run the application using the command: docker run -p 3000:3000 proxyservice:latest
        - The application would be started and it will be running in http://localhost:3000

Example:

Request: 
    POST: http://localhost:3000/api/request
    BODY: {
            "url": "https://jsonplaceholder.typicode.com/posts",
            "headers": {
                "Content-type": "application/json; charset=UTF-8"
            },
            "requestType": "POST",
            "requestBody": "{\"id\":1,\"title\":\"foo\",\"body\":\"bar\",\"userId\":1}"
        }

Response:
    {
        "id": 101,
        "title": "foo",
        "body": "bar",
        "userId": 1
    }