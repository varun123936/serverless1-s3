const chai = require('chai');
const chaiHttp = require('chai-http');
const AWSMock = require('aws-sdk-mock');
const readMe = require('../handler');
chai.use(chaiHttp);
const expect = chai.expect;

AWS.mock("S3", "getObject", function(parmas, callback) {
    callback(null, {
        Body: Buffer.from(require("fs").readFileSync("file.json"))
    })
})