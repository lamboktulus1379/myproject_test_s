let mongoose = require("mongoose");

let ch = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = ch.should();

ch.use(chaiHttp);

const Contact = require('../models/crmModel');

describe('Contacts', () => {
    beforeEach((done) => { 
      
        Contact.deleteMany({}, () => {
           done();
        });
    });
    
/*
  * Test the /GET route
  */
  describe('/GET contact', () => {
      it('it should GET all the contacts', (done) => {
        ch.request(server)
            .get('/contact')
            .end((err :any, res : any) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /**
   * Test the /POST Route
   */
  describe('/POST Contact', () => {
    it('it should not POST a contact without first name field', (done) => {
let contact = {
      lastName: "Simamora",
      email: "lamboktulus1379@gmail.com",
      areaNumber: "14000",
      department: "IT",
      id: "1",
      contactNumber: "082274140481"
};
ch.request(server)
.post('/contact')
.send(contact)
.end((err :any, res : any) => {
  res.should.have.status(200);
  res.body.should.be.a('object');
  res.body.should.have.property('errors');
  res.body.errors.should.have.property('firstName');
  done();

    });
  });
});
});
