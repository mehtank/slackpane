function setIframe(iframe, data, fromfield, tofield, fmt = (x)=>x ) {
    function search(puzz) {
        parser = document.createElement('a');
        parser.href = puzz[fromfield]
        return !parser.hostname.includes("ignore.ignore") && window.location.href.includes(parser.pathname);
    }
    puzzdata = data.filter(search);
    console.log(puzzdata);
    iframe.src = fmt(puzzdata[0][tofield]);
}

function toggleSidebar(elem) {
    if (elem.hasAttribute('hidden')) {
        elem.removeAttribute('hidden');
        document.getElementsByTagName("html")[0].style.width = "calc(100% - " + elem.style.width + ")";
    } else {
        elem.setAttribute('hidden', 'true');
        document.getElementsByTagName("html")[0].style.width = "100%";
    }
}

function getJSON(fn) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://wind-up-birds.org/puzzleboss/bin/pbrest.pl/puzzles/*', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) 
            fn(JSON.parse(request.responseText));
        else 
            console.log("We reached our target server, but it returned an error.");
    };
    request.onerror = function() {
        console.log("There was a connection error of some sort");
    };
    request.send();
}
