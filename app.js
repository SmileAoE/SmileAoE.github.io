function openAHK() {
    window.open("https://www.autohotkey.com", '_blank').focus();
}

function saveScript() {
    saveFile("https://raw.githubusercontent.com/SmileAoE/aoeii_aio/main/Installer.ahk");
}

function saveFile(url) {
    // Get file name from url.
    var filename = "AoE II Manager AIO Installer.ahk";
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.open('GET', url);
    xhr.send();
}