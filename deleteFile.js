const Responses = require('./Api_responses');
const S3 = require('./handler');

const bucket = process.env.bucketName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.fileName) {
        // failed without an fileName
        return Responses._400({ message: 'missing the fileName from the path' });
    }

    let fileName = event.pathParameters.fileName;

    const file = await S3.delete(fileName, bucket).catch(err => {
        console.log('error in S3 delete', err);
        return null;
    });

    if (!file) {
        return Responses._400({ message: 'Failed to delete data by filename' });
    }

    return Responses._200({ file });
};