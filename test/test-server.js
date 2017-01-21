global.DATABASE_URL = 'mongodb://localhost/allaboard-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Employee = require('../models/employees');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Employees', function() {
    before(function(done) {
        server.runServer(function() {
            Employee.create({
                first: 'workerbee',
                last: 'bumble',
                email: 'workerbee@bee.com'
            }, function() {
                done();
            });
        });
    });

    after(function(done) {
        Employee.remove(function() {
            done();
        });
    });

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/employees')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('first');
                done();
            });
    });
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/employees')
            .send({
                'first': 'banana',
                'last': 'sundae',
                'email': 'yum@dessert.com'
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.first.should.be.a('string');
                res.body.last.should.be.a('string');
                done();
            });
    });

    it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .get('/employees')
            .end(function(err, res) {
                var _id = res.body[0]._id
                chai.request(app)
                .delete('/employees/'+_id)
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('message');
                done();
            })
            })
    })


        
 
});