const https = require('https');
const fs = require('fs');
const mathDojoSpace = 'node_modules/@math-dojo';

try {
    fs.mkdirSync(`./${mathDojoSpace}`);
} catch (e) {
    if (!e.message.includes('file already exists')) {
        throw e;
    }
}


downloadAndSaveToNodeModules({
    url: 'https://connect.facebook.net/en_US/sdk.js',
    fileName: 'facebook_sdk.js'
})

function downloadAndSaveToNodeModules({
    url,
    fileName
}) {
    https.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/x-javascript/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/x-javascript but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                return fs.writeFileSync(`./${mathDojoSpace}/${fileName}`, rawData)
            } catch (e) {
                if (!e.message.includes('file already exists')) {
                    throw e;
                }
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}
