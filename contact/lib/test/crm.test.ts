import { ContactSchema } from "../models/crmModel";

let mongoose = require("mongoose");

let ch = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = ch.should();

ch.use(chaiHttp);

const Contact = mongoose.model('Contact', ContactSchema);

describe('Contacts', () => {
    beforeEach((done) => { 
      
        Contact.deleteOne ({}, () => {
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

});