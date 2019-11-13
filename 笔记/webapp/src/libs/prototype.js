export const getScript = (url, callback) => {
    let BASE_URL = '';
    if (url.indexOf('http') === -1 && process.env.NODE_ENV === 'production') {
        BASE_URL = '/m';
    }
    let head = document.getElementsByTagName("head")[0];
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = BASE_URL + url;
    if (typeof callback == "function") {
        script.onload = script.onreadystatechange = function () {
            if (
                !this.readyState ||
                this.readyState === "loaded" ||
                this.readyState === "complete"
            ) {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

export const removeScript = (url) => {
    // let scriptEle = query.
}