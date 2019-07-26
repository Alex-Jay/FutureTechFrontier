"use strict";

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const chai      = require('chai');
const config    = require('../config/database');
//const expect    = chai.expect;

// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const testSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Create a new collection called 'Name'
const User = mongoose.model('users', testSchema);

describe('Database Tests', function () {
    //Before starting the test, create a sandboxed database connection
    //Once a connection is established invoke done()
    before(function (done) {
        mongoose.connect(config.database, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });

    describe('Test Write Database', function () {
        //Save User to database
        it('Should register new user to database', function (done) {
            var testUser = User({
                name: 'Billy Taylor',
                email: 'b.taylor@gmail.com',
                username: 'btaylor',
                password: 'test!password'
            });

            testUser.save(done);
        });

        it('Should retrieve data from test database', function (done) {
            //Look up the 'Billy' object previously saved.
            User.find({ username: 'btaylor' }, (err, username) => {
                if (err) { throw err; }
                if (username.length === 0) { throw new Error('No data!'); }
                done();
            });
        });
    });

    //After all tests are finished drop database and close connection
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });
});