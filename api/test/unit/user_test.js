const assert = require('assert');
const User = require("../../models/user.js")
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

describe("User Crud records testing", ()=> {

    before((done) => {
        mongoose.connect('mongodb://localhost:27017/codewithme',{ useNewUrlParser: true, useCreateIndex: true, } );
        mongoose.connection
          .once('open', () => { done(); })
          .on('error', (error) => {
            console.warn('Warning', error);
          });
      });
    let frankie = new User({username:"frankie", password: "hello", skills:["java"]})


    it('class method findOneAndDelete', (done) => {
        User.findOneAndDelete({username: 'frankie' })
          .then(() => User.findOne({ username: 'frankie' }))
          .then((user) => {
            assert(user === null);
            done();
          });
      });
    
      it("creating a record for users", (done)=> {

        frankie.save().then(()=>{
            assert(!frankie.isNew);
            done();
        });
        // if true then the record was created 
    });

      

    it("reads by username", (done)=>{
        User.find({ username: "frankie" }).then(result => {
            assert(result[0].username === "frankie");
            
            done();
        })
    });

})