const request = require('request');

describe('get messages status', ()=> {
    it(`should return 200 OK`, (done) => {
       request.get('http://localhost:3000/api/v1/messages', (err,res) => {
        expect(res.statusCode).toEqual(200);
        done()
       })
    })
});
describe('get messages length', ()=> {
    it(`should return a list not empty`, (done) => {
       request.get('http://localhost:3000/api/v1/messages', (err,res) => {
        expect(JSON.parse(res.body).length).toBeGreaterThan(0);
        done()
       })
    })
});
describe("get messages from user", () => {
    it(`should return 200 OK`, (done) => {
        request.get('http://localhost:3000/api/v1/messages/Thiago', (err,res) => {
         expect(res.statusCode).toEqual(200);
         done()
        })
     })
     it(`should return the name Thiago`, (done) => {
        request.get('http://localhost:3000/api/v1/messages/Thiago', (err,res) => {
         expect(JSON.parse(res.body)[0].name).toEqual('Thiago');
         done()
        })
     })
});