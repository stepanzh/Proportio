function load_recipe(url, action)
{
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.text();
        })
        .then((json_body) => action(json_body))
        .catch((error) => console.log(error));
}

// Makes browser to download `data` with `filename` of `mimetype`
function download(data, filename, mimetype)
{
    let file = new Blob([data], {type: mimetype});
    if (window.navigator.msSaveOrOpenBlob)  // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else
    { // Others
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

function setup_command_download(dom_element)
{
    let link_for_download = new URL(dom_element.dataset.href, document.baseURI).href;
    dom_element.onclick = () => {
        load_recipe(
            link_for_download,
            (recipe_body) => download(recipe_body, "Recipe.json", "application/json")
        );
    };
}

function main()
{
    let download_elements = document.getElementsByClassName("command-download");
    for (let i in download_elements)
    {
        let element = download_elements[i];
        setup_command_download(element);
    }
}

document.addEventListener("DOMContentLoaded", main);
