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

function getJSON () {
  var xhr = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhr.open('GET', 'https://wind-up-birds.org/puzzleboss/bin/pbrest.pl/puzzles/*', true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

