export function download({ data, filename, mimetype }) {
    let file = new Blob([data], {type: mimetype});
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export function downloadJson({ data, filename }) {
    return download({ data: data, filename: filename, mimetype: 'application/json' })
}