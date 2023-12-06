var script = 'https://raw.githubusercontent.com/SmileAoE/aoeii_aio/main/AoE%20II%20Manager%20AIO.ahk'
var storedText;

fetch(script)
    .then(function (response) {
        response.text().then(function (text) {
            storedText = text;
            done();
        });
    });

function done() {
    document.getElementById('script').textContent = storedText;
}