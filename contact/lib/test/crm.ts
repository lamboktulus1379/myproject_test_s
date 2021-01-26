let mongoose = require("mongoose");
let Crm = require("../models/crmModel");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe('Contacts', () => {
    beforeEach((done) => { 
        Crm.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET contact', () => {
      it('it should GET all the contacts', (done) => {
        chai.request(server)
            .get('/contact')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});