let keys = [];
let fileNames = [];
function handleFiles(e) {
    keys = [];
    fileNames = [];
    document.getElementById("downloader").innerHTML = "";
    document.getElementById("downloader").append(`Loading...`);
    readFile(e.files, 0);


}

function readFile(files, cur) {
    var fr = new FileReader();
    fr.onload = function () {
        keys.push(fr.result)
        fileNames.push(files[cur].name)
        if (cur < files.length - 1) {
            readFile(files, cur + 1);
        } else {
            sendRequest(keys);
        }
    }
    fr.readAsText(files[cur]);

}

function sendRequest(keys) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "cssText": keys
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/MinifyCss", requestOptions)
        .then(response => response.text())
        .then(result => {
            var arry = JSON.parse(result);
            for (let i = 0; i < arry.length; i++) {
                download(fileNames[i], arry[i]);
            }
            filename = [];
            keys = [];
        })
        .catch(error => console.log('error', error));

    function download(filename, text) {
        document.getElementById("downloader").innerHTML = "";
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.text = filename;
        document.getElementById("downloader").appendChild(element);
    }
}