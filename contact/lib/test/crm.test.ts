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

   it('it should Post a contact', (done) => {
    let contact = {
        firstName: "Lambok",
        lastName: "Simamora",
        email: "lamboktulus1379@gmail.com",
        company: "Gra",
        phone: "082274140481"
    };
    ch.request(server)
    .post('/contact')
    .send(contact)
    .end((err :any, res : any) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('firstName');
      res.body.should.have.property('lastName');
      res.body.should.have.property('email');
      res.body.should.have.property('company');
      res.body.should.have.property('phone');
      done();

        });
      });
});

/**
 * Test the /GET/:id route
 */

describe('/GET/:id contact', () => {
  it('it should GET a book by the given id', (done) => {
     let contact = new Contact({
        firstName: "Lambok",
        lastName: "Simamora",
        email: "lamboktulus1379@gmail.com",
        company: "Gra",
        phone: "082274140481"
    });

    contact.save((err: any, contact: any) => {
      ch.request(server)
      .get('/contact/' + contact.id)
      .send(contact)
      .end((err:any, res:any) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('company');
        res.body.should.have.property('phone');
        res.body.should.have.property('_id').eql(contact.id);
        done();
      })
    });
  })
})

/**
 * Test the /PUT/:id route
 */

 describe('/PUT/:id contact', () => {
   it('it should UPDATE a contact given the id', (done) => {
     let contact = new Contact({
        firstName: "Lambok",
        lastName: "Simamora",
        email: "lamboktulus1379@gmail.com",
        company: "Gra",
        phone: "082274140481"
    });

    contact.save((err:any, book:any) => {
      ch.request(server)
      .put('/contact/' + contact.id)
      .send({
        firstName: "Lambok",
        lastName: "Simamora",
        email: "lamboktulus1379@gmail.com",
        company: "SERA",
        phone: "082274140481"
      })
      .end((err:any, res:any) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('company').eql("SERA");
        done();
      });
    });
   })
 });

 /**
  * Test the /DELETE/:id route
  */
 describe('/DELETE:id book', () => {
   it("it should DELETE a contact give the id", (done) => {
      let contact = new Contact({
        firstName: "Lambok",
        lastName: "Simamora",
        email: "lamboktulus1379@gmail.com",
        company: "Gra",
        phone: "082274140481"
      });
      contact.save((err:any, contact:any) => {
        ch.request(server)
        .delete('/contact/' + contact.id)
        .end((err:any, res :any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql("Contact successfully deleted");
          done();
        });
      })
   })
 })
});
