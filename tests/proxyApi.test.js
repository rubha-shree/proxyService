const expect = require('expect');
const chai = require('chai');
const chai_http = require('chai-http');
const app = require('../index');
const nock = require('nock');

chai.use(chai_http);

describe('Test suite for validating proxy api', () => {
    it('should send 400 (Bad request) response if the body is empty/null/undefined', (done) => {
        chai.request(app)
            .post('/api/request')         
            .send({})
            .end((err, res) => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(" should have required property 'url'");
                done();
            });
    });

    it('should send 400 (Bad request) response if the body parameters data types are not as expected ', (done) => {
        chai.request(app)
            .post('/api/request')         
            .send({
                "url": "https://jsonplaceholder.typicode.com/posts/1",
                "headers": {
                    "Content-type": "application/json; charset=UTF-8"
                },
                "requestType": "PUT",
                "requestBody": {"id":1,"title":"foo"}
            })
            .end((err, res) => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(".requestBody should be string");
                done();
            });
    });

    it('should send 400 (Bad request) response if the body http url is sent ', (done) => {
        chai.request(app)
            .post('/api/request')         
            .send({
                "url": "http://jsonplaceholder.typicode.com/posts",
                "headers": {
                    "Content-type": "application/json; charset=UTF-8"
                },
                "requestType": "POST",
                "requestBody": "{\"id\":1,\"title\":\"foo\",\"body\":\"bar\",\"userId\":1}"
            })
            .end((err, res) => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(" Https requests only are allowed");
                done();
            });
    });

    it('should be able to get the response from the URL', (done) => {
        nock('https://jsonplaceholder.typicode.com')
            .post('/posts', {"id":1,"title":"foo","body":"bar","userId":1})
            .reply(200, {
                "id": 101,
                "title": "foo",
                "body": "bar",
                "userId": 1
            });

        chai.request(app)
            .post('/api/request')         
            .send({
                "url": "https://jsonplaceholder.typicode.com/posts",
                "headers": {
                    "Content-type": "application/json; charset=UTF-8"
                },
                "requestType": "POST",
                "requestBody": "{\"id\":1,\"title\":\"foo\",\"body\":\"bar\",\"userId\":1}"
            })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toEqual({
                    "id": 101,
                    "title": "foo",
                    "body": "bar",
                    "userId": 1
                });
                done();
            });
    });
});