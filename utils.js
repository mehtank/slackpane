function setIframe(iframe, data, fromfield, tofield, fmt = (x)=>x ) {
    function search(puzz) {
        parser = document.createElement('a');
        parser.href = puzz[fromfield]
        return !parser.hostname.includes("ignore.ignore") && window.location.href.includes(parser.pathname);
    }
    puzzdata = data.filter(search);
    //console.log(puzzdata);
    if (puzzdata && puzzdata.length) {
      iframe.src = fmt(puzzdata[0][tofield]);
      return true;
    }
    return false;
}

function toggleSidebar(elem) {
    if (elem.hasAttribute('hidden')) {
        elem.removeAttribute('hidden');
    } else {
        elem.setAttribute('hidden', 'true');
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

function doResize(elem) {
    if (elem.hasAttribute('hidden'))
        document.getElementsByTagName("html")[0].style.width = "100%";
    else
        document.getElementsByTagName("html")[0].style.width = "calc(100% - " + elem.style.width + ")";
}

function handleResize(elem) {
    let observer = new MutationObserver(function(mutations) {
        doResize(elem);
    });
    observer.observe(elem, { attributes: true });
}

function addListener(which, fn) {
    function keyboardShortcutHandler (zEvent) {
        //--- On F4, Toggle our panel's visibility
        if (zEvent.which == which) {  
            fn() ;
            zEvent.preventDefault ();
            zEvent.stopPropagation ();
            return false;
        }
    }
    document.addEventListener('keydown', keyboardShortcutHandler);
}

function addIframe(divid, ifclass, width, visible, toggle=115, container=document.body) {
    var iframe = document.createElement('iframe');
    iframe.className = ifclass;

    var elem = document.createElement('div');
    elem.className = "spSidePanel";
    elem.id = divid;
    elem.style.width = width;
    if (!visible) elem.setAttribute('hidden', 'true');

    elem.appendChild(iframe);
    container.appendChild(elem);

    //-- Keyboard shortcut to show/hide our sidebar
    addListener(toggle, () => toggleSidebar(elem));
    handleResize(elem);
    doResize(elem);

    return {"div": elem, "iframe": iframe };
}
