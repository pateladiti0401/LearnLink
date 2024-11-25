const ngrok = require('@ngrok/ngrok');

(async function() {
    try {
        const url = await ngrok.connect({
            proto: 'http',
            addr: 8080, // Port to forward
            authtoken: process.env.NGROK_AUTHTOKEN, // Your ngrok auth token
            authtoken_from_env: true, // Optional, ensure it's a boolean or remove if unnecessary
        });
        console.log(`Ngrok tunnel created: ${url}`);
    } catch (err) {
        console.error(err);
    }
})();
