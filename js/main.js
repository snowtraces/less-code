let jsList = [
    './js/util/function.js',
    './js/util/event-hub.js',
    './js/util/saveData.js',
    './js/3rdparty/jszip.min.js',

    './js/entity.js',
    './js/config.js',
    
    './js/module/home.js',
    './js/module/left.js',
    './js/module/right.js',
]

let developModel = true;

let cssList = [
    './css/main.css',
]

let version = developModel ? new Date().getTime() : '1.1.1';

function loadScript(url) {
    let script = document.createElement('script');
    script.src = `${url}?version=${version}`;
    let body = document.querySelector('body');
    body.append(script);
    
    return script;
}
function loadCss(url) {
    let link = document.createElement('link');
    link.rel = 'stylesheet'
    link.href = `${url}?version=${version}`;
    let head = document.querySelector('head');
    head.append(link);

    return link;
}

function syncLoad(urlList, loadFunction) {
    let len = urlList.length;
    if (len === 0) {
        return
    }
    let el = loadFunction(urlList[0]);
    el.onload = () => {
        urlList.shift()
        syncLoad(urlList, loadFunction)
    }
}

window.onload = function () {
    syncLoad(cssList, loadCss)
    syncLoad(jsList, loadScript)
}
